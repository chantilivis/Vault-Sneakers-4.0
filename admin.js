// aviso rápido na tela
function mostrarAviso(mensagem) {
  let toast = document.getElementById("toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toast";
    toast.className = "toast";
    document.body.appendChild(toast);
  }
  toast.textContent = mensagem;
  toast.classList.add("show");
  clearTimeout(mostrarAviso._timer);
  mostrarAviso._timer = setTimeout(() => toast.classList.remove("show"), 2500);
}

// mensagens (mesma chave que o site da loja usa para salvar)
const CHAVE_RECLAMACOES = "vault-reclamacoes-v1";

function escaparHTML(valor) {
  return String(valor ?? "").replace(/[&<>"']/g, caractere => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[caractere]);
}

function carregarReclamacoes() {
  try {
    const dados = JSON.parse(localStorage.getItem(CHAVE_RECLAMACOES));
    return Array.isArray(dados) ? dados : [];
  } catch (erro) {
    return [];
  }
}

function salvarReclamacoes(reclamacoes) {
  try {
    localStorage.setItem(CHAVE_RECLAMACOES, JSON.stringify(reclamacoes));
    return true;
  } catch (erro) {
    mostrarAviso("Não foi possível salvar. Verifique o armazenamento do navegador.");
    return false;
  }
}

function formatarData(data) {
  if (!data) return "—";

  const dataConvertida = new Date(data);
  if (Number.isNaN(dataConvertida.getTime())) return "—";

  return dataConvertida.toLocaleString("pt-BR", {
    dateStyle: "short",
    timeStyle: "short"
  });
}

function formatarDuracao(minutos) {
  const total = Math.max(0, Math.round(minutos));
  const horas = Math.floor(total / 60);
  const minutosRestantes = total % 60;

  if (horas === 0) return `${minutosRestantes} min`;
  if (minutosRestantes === 0) return `${horas}h`;
  return `${horas}h ${minutosRestantes}min`;
}

function atualizarPainelReclamacoes() {
  const lista = document.getElementById("lista-reclamacoes");
  if (!lista) return;

  const reclamacoes = carregarReclamacoes();

  const total = reclamacoes.length;
  const pendentes = reclamacoes.filter(r => !r.primeiraRespostaEm).length;
  const andamento = reclamacoes.filter(r => r.status === "Em andamento").length;
  const resolvidas = reclamacoes.filter(r => r.status === "Resolvida").length;
  const naoResolvidas = reclamacoes.filter(r => r.status !== "Resolvida").length;
  const respondidas = reclamacoes.filter(r => Boolean(r.primeiraRespostaEm)).length;

  const taxaResposta = total ? Math.round((respondidas / total) * 100) : 0;

  const temposResposta = reclamacoes
    .filter(r => r.criadaEm && r.primeiraRespostaEm)
    .map(r => new Date(r.primeiraRespostaEm) - new Date(r.criadaEm))
    .filter(ms => Number.isFinite(ms) && ms >= 0);

  const tempoMedio = temposResposta.length
    ? formatarDuracao(
        temposResposta.reduce((soma, ms) => soma + ms, 0) /
        temposResposta.length / 60000
      )
    : "—";

  const avaliacoes = reclamacoes
    .map(r => Number(r.avaliacao))
    .filter(nota => Number.isFinite(nota) && nota >= 1 && nota <= 5);

  const avaliacaoMedia = avaliacoes.length
    ? `${(avaliacoes.reduce((soma, nota) => soma + nota, 0) / avaliacoes.length).toLocaleString("pt-BR", {
        minimumFractionDigits: 1,
        maximumFractionDigits: 1
      })} / 5`
    : "—";

  const indicadores = {
    "indicador-total": total,
    "indicador-pendentes": pendentes,
    "indicador-andamento": andamento,
    "indicador-resolvidas": resolvidas,
    "indicador-nao-resolvidas": naoResolvidas,
    "indicador-taxa-resposta": `${taxaResposta}%`,
    "indicador-tempo-medio": tempoMedio,
    "indicador-avaliacao": avaliacaoMedia
  };

  Object.entries(indicadores).forEach(([id, valor]) => {
    const elemento = document.getElementById(id);
    if (elemento) elemento.textContent = valor;
  });

  const contador = document.getElementById("contador-reclamacoes");
  if (contador) {
    contador.textContent = `${total} ${total === 1 ? "registro" : "registros"}`;
  }

  if (total === 0) {
    lista.innerHTML = `
      <div class="reclamacoes-vazio">
        <p>Nenhuma reclamação registrada ainda.</p>
      </div>
    `;
    return;
  }

  // mais recentes primeiro
  reclamacoes.sort((a, b) => new Date(b.criadaEm) - new Date(a.criadaEm));

  lista.innerHTML = reclamacoes.map(r => {
    const status = ["Pendente", "Em andamento", "Resolvida"].includes(r.status)
      ? r.status
      : "Pendente";

    const classeStatus = status === "Resolvida"
      ? "status-resolvida"
      : status === "Em andamento"
        ? "status-andamento"
        : "";

    const respostaHTML = r.resposta ? `
      <div class="reclamacao-resposta">
        <strong>Resposta registrada pela loja</strong>
        <p>${escaparHTML(r.resposta)}</p>
        <small class="reclamacao-meta">
          Primeira resposta: ${escaparHTML(formatarData(r.primeiraRespostaEm))}
        </small>
      </div>
    ` : "";

    const avaliacaoAtual = Number(r.avaliacao) || 0;

    return `
      <article class="reclamacao-card" data-id="${escaparHTML(r.id)}">
        <div class="reclamacao-topo">
          <div>
            <h4>${escaparHTML(r.nome)}</h4>
            <div class="reclamacao-meta">
              <div>${escaparHTML(r.email)}</div>
              <div>Recebida em: ${escaparHTML(formatarData(r.criadaEm))}</div>
            </div>
          </div>
          <span class="reclamacao-status ${classeStatus}">
            ${escaparHTML(status)}
          </span>
        </div>

        <div class="reclamacao-assunto">
          ${escaparHTML(r.assunto)}
        </div>

        <p class="reclamacao-mensagem">${escaparHTML(r.mensagem)}</p>

        ${respostaHTML}

        ${avaliacaoAtual >= 1 && avaliacaoAtual <= 5 ? `
          <div class="reclamacao-avaliacao">
            Avaliação registrada: ${avaliacaoAtual}/5
          </div>
        ` : ""}

        <div class="reclamacao-admin">
          <label for="status-${escaparHTML(r.id)}">Status da reclamação</label>
          <select id="status-${escaparHTML(r.id)}" data-acao="status">
            <option value="Pendente" ${status === "Pendente" ? "selected" : ""}>Pendente</option>
            <option value="Em andamento" ${status === "Em andamento" ? "selected" : ""}>Em andamento</option>
            <option value="Resolvida" ${status === "Resolvida" ? "selected" : ""}>Resolvida</option>
          </select>

          <label for="resposta-${escaparHTML(r.id)}">Resposta da loja</label>
          <textarea
            id="resposta-${escaparHTML(r.id)}"
            data-resposta
            rows="3"
            maxlength="2000"
            placeholder="Digite a resposta para o cliente...">${escaparHTML(r.resposta || "")}</textarea>

          <button type="button" data-acao="responder">
            ${r.resposta ? "Atualizar resposta" : "Registrar resposta"}
          </button>

          <button type="button" data-acao="excluir" class="btn-excluir-reclamacao">
            Excluir reclamação
          </button>

          <label for="avaliacao-${escaparHTML(r.id)}">
            Avaliação do cliente (se informada)
          </label>
          <select id="avaliacao-${escaparHTML(r.id)}" data-acao="avaliacao">
            <option value="0" ${avaliacaoAtual === 0 ? "selected" : ""}>Sem avaliação</option>
            <option value="1" ${avaliacaoAtual === 1 ? "selected" : ""}>1 — Muito ruim</option>
            <option value="2" ${avaliacaoAtual === 2 ? "selected" : ""}>2 — Ruim</option>
            <option value="3" ${avaliacaoAtual === 3 ? "selected" : ""}>3 — Regular</option>
            <option value="4" ${avaliacaoAtual === 4 ? "selected" : ""}>4 — Boa</option>
            <option value="5" ${avaliacaoAtual === 5 ? "selected" : ""}>5 — Excelente</option>
          </select>
        </div>
      </article>
    `;
  }).join("");
}

// ligações do painel
function iniciarPainel() {
  const lista = document.getElementById("lista-reclamacoes");

  atualizarPainelReclamacoes();

  // ações do painel: excluir, responder, status e avaliação
  if (lista) {
    lista.addEventListener("click", evento => {
      const botaoExcluir = evento.target.closest('button[data-acao="excluir"]');

      if (botaoExcluir) {
        const cartao = botaoExcluir.closest(".reclamacao-card");
        if (!cartao) return;

        const id = cartao.dataset.id;

        if (!confirm("Tem certeza de que deseja excluir esta reclamação? Essa ação não pode ser desfeita.")) {
          return;
        }

        const reclamacoes = carregarReclamacoes();
        const atualizadas = reclamacoes.filter(r => r.id !== id);

        if (atualizadas.length === reclamacoes.length) return;
        if (!salvarReclamacoes(atualizadas)) return;

        atualizarPainelReclamacoes();
        mostrarAviso("Reclamação excluída.");
        return;
      }

      const botao = evento.target.closest('button[data-acao="responder"]');
      if (!botao) return;

      const cartao = botao.closest(".reclamacao-card");
      if (!cartao) return;

      const id = cartao.dataset.id;
      const campoResposta = cartao.querySelector("[data-resposta]");
      const textoResposta = campoResposta?.value.trim();

      if (!textoResposta) {
        mostrarAviso("Digite uma resposta antes de registrá-la.");
        campoResposta?.focus();
        return;
      }

      const reclamacoes = carregarReclamacoes();
      const reclamacao = reclamacoes.find(r => r.id === id);
      if (!reclamacao) return;

      reclamacao.resposta = textoResposta;

      // só a primeira resposta conta para o tempo
      if (!reclamacao.primeiraRespostaEm) {
        reclamacao.primeiraRespostaEm = new Date().toISOString();
      }

      if (!salvarReclamacoes(reclamacoes)) return;

      atualizarPainelReclamacoes();
      mostrarAviso("Resposta registrada no painel local.");
    });

    lista.addEventListener("change", evento => {
      const campo = evento.target.closest("select[data-acao]");
      if (!campo) return;

      const cartao = campo.closest(".reclamacao-card");
      if (!cartao) return;

      const id = cartao.dataset.id;
      const reclamacoes = carregarReclamacoes();
      const reclamacao = reclamacoes.find(r => r.id === id);
      if (!reclamacao) return;

      if (campo.dataset.acao === "status") {
        reclamacao.status = campo.value;
      } else if (campo.dataset.acao === "avaliacao") {
        reclamacao.avaliacao = Number(campo.value) || 0;
      } else {
        return;
      }

      if (!salvarReclamacoes(reclamacoes)) return;

      atualizarPainelReclamacoes();
      mostrarAviso("Informações da reclamação atualizadas.");
    });
  }
}

// se chegar mensagem nova em outra aba, o painel atualiza sozinho
window.addEventListener("storage", evento => {
  if (evento.key === CHAVE_RECLAMACOES) atualizarPainelReclamacoes();
});

document.addEventListener("DOMContentLoaded", iniciarPainel);
// imagens

// monta a lista de fotos: img/prefixo-1.jpeg, img/prefixo-2.jpeg...
function gerarImagens(prefixo, quantidade, extensao = "jpeg") {
  return Array.from({ length: quantidade }, (_, i) => `img/${prefixo}-${i + 1}.${extensao}`);
}

// imagem que aparece quando a foto não carrega
const IMG_RESERVA =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400">' +
    '<rect width="100%" height="100%" fill="#eee"/>' +
    '<text x="50%" y="50%" text-anchor="middle" fill="#999" font-family="Arial" font-size="20">Sem imagem</text>' +
    '</svg>'
  );
window.IMG_RESERVA = IMG_RESERVA;

// loja
const VALOR_FRETE = 29.90;
const CHAVE_CARRINHO = "vault-carrinho-v2";

// contato (configuração)
const CONTATO = {
  email: "contato@vaultsneakers.com",  // para onde vai o e-mail
  whatsapp: "",                         // só números com DDI+DDD, ex.: "5511999999999" (vazio esconde o botão)
  endpoint: ""                          // link do Formspree/Getform (opcional)
};

// carrossel (configuração)
// nomes iguais aos de DADOS_PRODUTOS
const CARROSSEL_NOMES = [
  "Air force 1 low panda",          // Air Force (preto e branco)
  "Nike Air Jordan 4 Bred",         // Jordan (vermelho e preto)
  "Nike Air Max 95 Neon",           // Air Max (neon)
  "Nike Dunk Low Varsity Green"     // Dunk (verde)
];
const CARROSSEL_INTERVALO = 4000; // tempo entre as trocas (ms)

// produtos (os preços são calculados aqui)
const DESCRICOES = {
  "Air Force": "O ícone do basquete que virou clássico das ruas: visual limpo, construção em couro e amortecimento Air para o dia todo.",
  "Jordan": "Herança do basquete em um design inconfundível. Conforto, estilo e a atitude Jordan em cada passo.",
  "Air Max": "Amortecimento Air visível e visual marcante, feito para quem quer conforto e presença em qualquer ocasião.",
  "Dunk": "Nascido nas quadras e adotado pela cultura de rua: silhueta clássica e combinações de cores que chamam atenção.",
  "Casual": "Estilo versátil para o dia a dia, combinando com qualquer look e confortável do começo ao fim do dia.",
  "Shox": "Amortecimento com molas no calcanhar e visual futurista, direto do início dos anos 2000."
};

function criarProduto(id, dados) {
  const { nome, categoria, prefixo, qtd, preco, desconto, extensao = "jpeg", imagens } = dados;

  const temDesconto = desconto > 0;
  const precoDe = temDesconto ? Math.round(preco / (1 - desconto / 100) / 10) * 10 - 0.10 : 0;
  const precoPix = temDesconto ? Math.floor(preco * (1 - desconto / 100) * 100) / 100 : 0;
  const parcela = preco / 10;
  const br = (v) => "R$ " + v.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return {
    id,
    nome,
    marca: "Nike",
    categoria,
    logoMarca: "NIKE",
    desconto: temDesconto ? `${desconto}% OFF` : "",
    freteGratis: dados.freteGratis === true,
    precoPorNum: preco,
    precoPor: br(preco),
    precoPix: temDesconto ? `${br(precoPix)} no PIX` : "",
    precoDe: temDesconto ? br(precoDe) : "",
    parcelas: `ou 10x de ${br(parcela)} sem juros`,
    descricao: dados.descricao || DESCRICOES[categoria] || "",
    imagens: imagens || gerarImagens(prefixo, qtd, extensao)
  };
}

// catálogo
// prefixo = nome da foto sem o "-número.jpeg"
const DADOS_PRODUTOS = [
  // air force 1
  { nome: "Air force 1 low panda", freteGratis: true, categoria: "Air Force", prefixo: "Air-force-1-low-panda", qtd: 8, preco: 799.90, desconto: 20,
    descricao: "O brilho continua vivo no Nike Air force 1 low panda, o ícone do basquete que dá um toque moderno naquilo que você conhece bem." },
  { nome: "Nike Air Force 1 Low Blue White", categoria: "Air Force", prefixo: "Air-force-1-blue-white", qtd: 8, preco: 799.90, desconto: 0,
    // a foto nº 1 tem o nome "Air-force-1 blue-&-white-1.jpeg" (com espaço e &)
    imagens: ["img/Air-force-1 blue-&-white-1.jpeg", ...gerarImagens("Air-force-1-blue-white", 8).slice(1)] },
  { nome: "Nike Air Force 1 Low Triple Black", categoria: "Air Force", prefixo: "Air-force-1-triple-black", qtd: 8, preco: 799.90, desconto: 0 },
  { nome: "Nike Air Force 1 Low Triple White", categoria: "Air Force", prefixo: "Air-force-1-triple-white", qtd: 8, preco: 799.90, desconto: 10 },
  { nome: "Nike Air Force 1 Low WB", categoria: "Air Force", prefixo: "Air-force-1-wb", qtd: 8, preco: 799.90, desconto: 0 },
  { nome: "Nike Air Force 1 Low White Grey", categoria: "Air Force", prefixo: "Air-force-1-white-grey", qtd: 8, preco: 799.90, desconto: 0 },

  // jordan 4
  { nome: "Nike Air Jordan 4 Black Cat", freteGratis: true, categoria: "Jordan", prefixo: "Air-Jordan-4-Black-Cat", qtd: 6, preco: 1499.90, desconto: 10 },
  { nome: "Nike Air Jordan 4 Bred", categoria: "Jordan", prefixo: "Air-Jordan-4-bred", qtd: 6, preco: 1499.90, desconto: 10 },
  { nome: "Nike Air Jordan 4 Midnight Navy", categoria: "Jordan", prefixo: "Air-Jordan-4-Midnight-Navy", qtd: 6, preco: 1499.90, desconto: 0 },
  { nome: "Nike Air Jordan 4 Military Black", categoria: "Jordan", prefixo: "Air-Jordan-4-Military-Black", qtd: 6, preco: 1499.90, desconto: 0 },
  { nome: "Nike Air Jordan 4 Taupe Haze", categoria: "Jordan", prefixo: "Air-Jordan-4-Taupe-Haze", qtd: 6, preco: 1499.90, desconto: 0 },
  { nome: "Nike Air Jordan 4 University Blue", categoria: "Jordan", prefixo: "Air-Jordan-4-University-Blue", qtd: 6, preco: 1499.90, desconto: 0 },

  // air max 95
  { nome: "Nike Air Max 95 Big Bubble Comet Red", categoria: "Air Max", prefixo: "Air-Max-95-Big-Bubble-Comet-Red", qtd: 8, preco: 999.90, desconto: 0 },
  { nome: "Nike Air Max 95 Neon", freteGratis: true, categoria: "Air Max", prefixo: "Air-Max-95-Neon", qtd: 8, preco: 999.90, desconto: 20 },
  { nome: "Nike Air Max 95 Pink Foam", categoria: "Air Max", prefixo: "Air-Max-95-Pink-Foam", qtd: 8, preco: 999.90, desconto: 20 },
  { nome: "Nike Air Max 95 Triple White", categoria: "Air Max", prefixo: "Air-Max-95-Triple-White", qtd: 8, preco: 999.90, desconto: 0 },

  // air max dn
  { nome: "Nike Air Max Dn Medium Violet", categoria: "Air Max", prefixo: "Air-Max-Dn-Medium-Violet", qtd: 8, preco: 1199.90, desconto: 0 },
  { nome: "Nike Air Max Dn NRG Marrom", categoria: "Air Max", prefixo: "Air-Max-Dn-NRG-Marrom", qtd: 8, preco: 1199.90, desconto: 0 },
  { nome: "Nike Air Max Dn Photon Dust White", categoria: "Air Max", prefixo: "Air-Max-Dn-Photon-Dust-White", qtd: 8, preco: 1199.90, desconto: 0 },
  { nome: "Nike Air Max Dn Roam Black", categoria: "Air Max", prefixo: "Air-Max-Dn-Roam-Black", qtd: 8, preco: 1199.90, desconto: 10 },
  { nome: "Nike Air Max Dn Triple White", categoria: "Air Max", prefixo: "Air-Max-Dn-Triple-White", qtd: 8, preco: 1199.90, desconto: 0 },
  { nome: "Nike Air Max Dn University Blue", categoria: "Air Max", prefixo: "Air-Max-Dn-University-Blue", qtd: 8, preco: 1199.90, desconto: 0 },

  // air max plus tn
  { nome: "Nike Air Max Plus TN Hyper Pink Volt", categoria: "Air Max", prefixo: "Air-max-plus-Tn-Hyper-PinkVolt", qtd: 8, preco: 1099.90, desconto: 0 },
  { nome: "Nike Air Max Plus TN Tough Red Black", categoria: "Air Max", prefixo: "Air-Max-Plus-Tn-Tough-RedBlack", qtd: 8, preco: 1099.90, desconto: 0 },
  { nome: "Nike Air Max Plus TN Triple Black", categoria: "Air Max", prefixo: "Air-Max-Plus-Tn-Triple-Black", qtd: 6, preco: 1099.90, desconto: 0 },
  { nome: "Nike Air Max Plus TN Triple White", categoria: "Air Max", prefixo: "Air-Max-Plus-Tn-Triple-White", qtd: 6, preco: 1099.90, desconto: 0 },
  { nome: "Nike Air Max Plus TN White Blue Crystal", categoria: "Air Max", prefixo: "Air-max-plus-Tn-White-Blue-Crystal", qtd: 8, preco: 1099.90, desconto: 0 },

  // dunk low
  { nome: "Nike Dunk Low Blue White", categoria: "Dunk", prefixo: "Dunk-Low-Blue-white", qtd: 8, preco: 899.90, desconto: 0 },
  { nome: "Nike Dunk Low Burgundy Crush", categoria: "Dunk", prefixo: "Dunk-Low-Burgundy-Crush", qtd: 8, preco: 899.90, desconto: 0 },
  { nome: "Nike Dunk Low Grey Fog", categoria: "Dunk", prefixo: "Dunk-Low-Grey-Fog", qtd: 8, preco: 899.90, desconto: 0 },
  { nome: "Nike Dunk Low Panda", freteGratis: true, categoria: "Dunk", prefixo: "Dunk-Low-panda", qtd: 8, preco: 899.90, desconto: 20 },
  { nome: "Nike Dunk Low Syracuse", categoria: "Dunk", prefixo: "Dunk-Low-Syracuse", qtd: 8, preco: 899.90, desconto: 0 },
  { nome: "Nike Dunk Low Varsity Green", categoria: "Dunk", prefixo: "Dunk-Low-Varsity-Green", qtd: 8, preco: 899.90, desconto: 0 },

  // air max excee
  { nome: "Nike Air Max Excee White Grey", categoria: "Casual", prefixo: "Nike-Air-Max-Excee-White-Grey", qtd: 6, preco: 599.90, desconto: 0 },

  // court vision
  { nome: "Nike Court Vision Low", freteGratis: true, categoria: "Casual", prefixo: "Nike-Court-Vision-Low-White", qtd: 6, preco: 499.90, desconto: 10,
    descricao: "Combina o estilo de ataque do basquete dos anos 80 com a cultura acelerada do jogo atual." },
  { nome: "Nike Court Vision Alta Black White", categoria: "Casual", prefixo: "Nike-Court-Vision-Alta-Black-White", qtd: 6, preco: 549.90, desconto: 0 },
  { nome: "Nike Court Vision Alta Triple White", categoria: "Casual", prefixo: "Nike-Court-Vision-Alta-Triple-White", qtd: 6, preco: 549.90, desconto: 0 },

  // shox r4
  { nome: "Nike Shox R4 Black Pinksicle", categoria: "Shox", prefixo: "Nike-Shox-R4-Black-Pinksicle", qtd: 6, preco: 899.90, desconto: 10 },
  { nome: "Nike Shox R4 Blue Lagoon", categoria: "Shox", prefixo: "Nike-shox-R4-Blue-Lagoon", qtd: 6, preco: 899.90, desconto: 0 },
  { nome: "Nike Shox R4 Phantom Picante Red", categoria: "Shox", prefixo: "Nike-Shox-R4-Phantom-Picante-Red", qtd: 6, preco: 899.90, desconto: 0 },
  { nome: "Nike Shox R4 White Metallic", categoria: "Shox", prefixo: "Nike-Shox-R4-White-Metallic", qtd: 6, preco: 899.90, desconto: 0 }

  // pendentes (nomes cortados no print; cole o nome completo e descomente)
  // { nome: "Nike Air Max 95 Big Bubble Laser Paisley", categoria: "Air Max", prefixo: "Air-Max-95-Big-Bubble-Laser-Paisley-Gr...", qtd: 8, preco: 999.90, desconto: 0 },
  // { nome: "Nike Air Max 95 Big Bubble SE Obsidian", categoria: "Air Max", prefixo: "Air-Max-95-Big-Bubble-SE-Obsidian-W...", qtd: 8, preco: 999.90, desconto: 0 },
  // { nome: "Nike Air Max Plus TN Black Light Smoke Grey", categoria: "Air Max", prefixo: "Air-Max-Plus-Tn-Black-Light-Smoke-Gre...", qtd: 8, preco: 1099.90, desconto: 0 },
];

const produtos = DADOS_PRODUTOS.map((dados, i) => criarProduto(i + 1, dados));

// estado
let carrinho = [];
let tamanhoSelecionado = null;
let contadorItemCarrinho = 0;
let filtroAtual = "todos";
let termoBusca = "";

// utilitários
function formatarPreco(valor) {
  return "R$ " + valor.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

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

// navegação entre páginas
function mudarPagina(idSecao) {
  const secaoAlvo = document.getElementById(idSecao);
  if (!secaoAlvo) return;
  document.querySelectorAll(".page-section").forEach(sec => sec.classList.remove("active"));
  secaoAlvo.classList.add("active");
  window.scrollTo(0, 0);
}

// filtros
function gerarFiltros() {
  const container = document.querySelector(".filters");
  if (!container) return;

  const categorias = [...new Set(produtos.map(p => p.categoria))];
  const nomes = ["Todos", "Nike", ...categorias];

  container.innerHTML = nomes.map((nome, i) => {
    const valor = nome === "Todos" ? "todos" : nome;
    return `<button class="filter-btn${i === 0 ? " active" : ""}" data-filtro="${valor}">${nome}</button>`;
  }).join("");

  container.querySelectorAll(".filter-btn").forEach(btn => {
    btn.addEventListener("click", () => filtrarProdutos(btn.dataset.filtro, btn));
  });
}

// lista de produtos
function renderizarProdutos(lista) {
  const grid = document.getElementById("grid-produtos");
  if (!grid) return;

  if (lista.length === 0) {
    grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 2rem;">Nenhum produto encontrado.</p>';
    return;
  }

  grid.innerHTML = lista.map(prod => {
    const tagDesconto = prod.desconto ? `<span class="tag-off">${prod.desconto}</span>` : "";
    const tagFrete = prod.freteGratis ? `<span class="tag-frete">FRETE GRÁTIS</span>` : "";
    const precoDeHTML = prod.precoDe ? `<span class="price-old">${prod.precoDe}</span>` : "";
    const precoPixHTML = prod.precoPix ? `<span class="price-promo">${prod.precoPix}</span>` : "";

    return `
      <div class="product-card" onclick="abrirDetalhes(${prod.id})">
        <div class="card-top">
          <div class="brand-badge">${prod.logoMarca}</div>
          <div class="top-tags">
            ${tagDesconto}
            ${tagFrete}
          </div>
          <img src="${encodeURI(prod.imagens[0])}" alt="${prod.nome}" loading="lazy" onerror="this.onerror=null; this.src=IMG_RESERVA;">
        </div>
        <div class="product-info-box">
          <h3 class="product-title-text">${prod.nome}</h3>
          <div class="price-row">
            <span class="price-main">${prod.precoPor}</span>
            ${precoDeHTML}
            ${precoPixHTML}
          </div>
          <div class="price-installments">${prod.parcelas}</div>
        </div>
      </div>
    `;
  }).join("");
}

// busca + filtro
function aplicarFiltros() {
  const termo = termoBusca.toLowerCase().trim();
  const filtro = filtroAtual.toLowerCase();

  const resultado = produtos.filter(p => {
    const passaFiltro =
      filtro === "todos" ||
      p.categoria.toLowerCase() === filtro ||
      p.marca.toLowerCase() === filtro;

    const passaBusca =
      termo === "" ||
      p.nome.toLowerCase().includes(termo) ||
      p.marca.toLowerCase().includes(termo) ||
      p.categoria.toLowerCase().includes(termo);

    return passaFiltro && passaBusca;
  });

  renderizarProdutos(resultado);
}

function buscarProduto(termo) {
  termoBusca = termo || "";
  aplicarFiltros();
  if (termoBusca.trim() !== "") mudarPagina("home");
}

function filtrarProdutos(filtro, elementoBotao) {
  document.querySelectorAll(".filter-btn").forEach(btn => btn.classList.remove("active"));
  if (elementoBotao) elementoBotao.classList.add("active");
  filtroAtual = filtro;
  aplicarFiltros();
}

// detalhes do produto
function abrirDetalhes(id) {
  const prod = produtos.find(p => p.id === id);
  if (!prod) return;

  tamanhoSelecionado = null;
  const container = document.getElementById("detalhes-conteudo");
  if (!container) return;

  // se a foto não existir, a miniatura some
  const thumbsHTML = prod.imagens.map((img, index) =>
    `<img src="${encodeURI(img)}" data-src="${encodeURI(img)}" class="${index === 0 ? "active-thumb" : ""}" onclick="trocarFotoPrincipal(this)" onerror="this.remove()" alt="Foto ${index + 1} de ${prod.nome}">`
  ).join("");

  const tamanhosHTML = ["37", "38", "39", "40", "41", "42"].map(t =>
    `<button class="size-btn" onclick="selecionarTamanho(this, '${t}')">${t}</button>`
  ).join("");

  container.innerHTML = `
    <div>
      <img id="foto-principal" class="gallery-main" src="${encodeURI(prod.imagens[0])}" alt="${prod.nome}" onerror="this.onerror=null; this.src=IMG_RESERVA;">
      <div class="gallery-thumbs">
        ${thumbsHTML}
      </div>
    </div>
    <div class="product-details-info">
      <span class="detail-tag">${prod.marca} • ${prod.categoria}</span>
      <h2>${prod.nome}</h2>
      <div class="detail-price-row">
        <strong class="detail-price">${prod.precoPor}</strong>
        ${prod.precoDe ? `<span class="detail-old">${prod.precoDe}</span>` : ""}
      </div>
      ${prod.precoPix ? `<p class="detail-pix">${prod.precoPix}</p>` : ""}
      <p class="detail-installments">${prod.parcelas}</p>
      <p class="detail-desc">${prod.descricao}</p>

      <div class="sizes-container">
        <label>Selecione o Tamanho:</label>
        <div class="sizes-grid">
          ${tamanhosHTML}
        </div>
      </div>

      <button class="btn-buy" onclick="adicionarAoCarrinho(${prod.id})">Adicionar à Sacola</button>
    </div>
  `;

  mudarPagina("detalhes");
}

function trocarFotoPrincipal(elementoThumb) {
  const fotoPrincipal = document.getElementById("foto-principal");
  if (fotoPrincipal) fotoPrincipal.src = elementoThumb.dataset.src;
  document.querySelectorAll(".gallery-thumbs img").forEach(img => img.classList.remove("active-thumb"));
  elementoThumb.classList.add("active-thumb");
}

function selecionarTamanho(elementoBtn, tamanho) {
  document.querySelectorAll(".size-btn").forEach(btn => btn.classList.remove("selected"));
  elementoBtn.classList.add("selected");
  tamanhoSelecionado = tamanho;
}

// carrinho
function salvarCarrinho() {
  try {
    localStorage.setItem(CHAVE_CARRINHO, JSON.stringify(carrinho));
  } catch (e) { /* storage indisponível */ }
}

function carregarCarrinho() {
  try {
    const salvo = JSON.parse(localStorage.getItem(CHAVE_CARRINHO));
    if (!Array.isArray(salvo)) return;
    // recarrega os dados atuais do produto (preço, frete) e mantém tamanho/id do item
    carrinho = salvo
      .filter(item => produtos.some(p => p.id === item.id && p.nome === item.nome))
      .map(item => ({ ...produtos.find(p => p.id === item.id), tamanho: item.tamanho, cartItemId: item.cartItemId }));
    contadorItemCarrinho = carrinho.reduce((max, item) => Math.max(max, item.cartItemId || 0), 0);
  } catch (e) {
    carrinho = [];
  }
}

function adicionarAoCarrinho(idProduto) {
  if (!tamanhoSelecionado) {
    mostrarAviso("Selecione um tamanho antes de adicionar à sacola.");
    return;
  }
  const prod = produtos.find(p => p.id === idProduto);
  if (!prod) return;

  contadorItemCarrinho++;
  carrinho.push({ ...prod, tamanho: tamanhoSelecionado, cartItemId: contadorItemCarrinho });

  atualizarCarrinho();
  mostrarAviso(`${prod.nome} (Tam. ${tamanhoSelecionado}) adicionado à sacola!`);
}

function removerDoCarrinho(cartItemId) {
  carrinho = carrinho.filter(item => item.cartItemId !== cartItemId);
  atualizarCarrinho();
}

function atualizarCarrinho() {
  const badge = document.getElementById("cart-badge");
  if (badge) {
    badge.textContent = carrinho.length;
    badge.style.display = carrinho.length ? "flex" : "none";
  }

  const lista = document.getElementById("cart-items-list");
  const subtotalEl = document.getElementById("cart-subtotal");
  const freteEl = document.getElementById("cart-frete");
  const totalEl = document.getElementById("cart-total");

  const subtotal = carrinho.reduce((soma, item) => soma + item.precoPorNum, 0);
  const todosFreteGratis = carrinho.every(item => item.freteGratis);
  const frete = carrinho.length === 0 || todosFreteGratis ? 0 : VALOR_FRETE;
  const total = subtotal + frete;

  if (lista) {
    if (carrinho.length === 0) {
      lista.innerHTML = '<p class="empty-cart-msg">Sua sacola está vazia.</p>';
    } else {
      lista.innerHTML = carrinho.map(item => `
        <div class="cart-item">
          <img src="${encodeURI(item.imagens[0])}" alt="${item.nome}" onerror="this.onerror=null; this.src=IMG_RESERVA;">
          <div class="cart-item-details">
            <h4>${item.nome}</h4>
            <p>Tamanho: ${item.tamanho}</p>
            <button class="btn-remove" onclick="removerDoCarrinho(${item.cartItemId})">Remover</button>
          </div>
          <div class="cart-item-price">${item.precoPor}</div>
        </div>
      `).join("");
    }
  }

  if (subtotalEl) subtotalEl.textContent = formatarPreco(subtotal);
  if (freteEl) {
    if (carrinho.length === 0) freteEl.textContent = "—";
    else if (frete === 0) freteEl.textContent = "GRÁTIS";
    else freteEl.textContent = formatarPreco(frete);
    freteEl.classList.toggle("frete-gratis", frete === 0 && carrinho.length > 0);
  }
  if (totalEl) totalEl.textContent = formatarPreco(total);

  salvarCarrinho();
}

function finalizarCompra() {
  if (carrinho.length === 0) {
    mostrarAviso("Sua sacola está vazia.");
    return;
  }
  alert("Pedido finalizado com sucesso!");
  carrinho = [];
  atualizarCarrinho();
  mudarPagina("home");
}

// carrossel
function iniciarCarrossel() {
  const el = document.getElementById("carrossel");
  if (!el) return;

  const vistos = new Set();
  const itens = CARROSSEL_NOMES
    .map(nome => produtos.find(p => p.nome === nome))
    .filter(p => {
      if (!p || vistos.has(p.id) || vistos.has(p.imagens[0])) return false;
      vistos.add(p.id);
      vistos.add(p.imagens[0]);
      return true;
    })
    .slice(0, 4);
  if (itens.length === 0) { el.style.display = "none"; return; }

  const slides = itens.map(p => `
    <div class="carousel-slide">
      <div class="slide-text">
        <span class="slide-tag">${p.marca} • ${p.categoria}</span>
        <h3 class="slide-title">${p.nome}</h3>
        ${p.desconto ? `<span class="slide-off">${p.desconto}</span>` : ""}
        <p class="slide-price">a partir de <strong>${p.precoPor}</strong></p>
        <button type="button" class="carousel-cta" onclick="abrirDetalhes(${p.id})">confira já!</button>
      </div>
      <div class="slide-img">
        <img src="${encodeURI(p.imagens[0])}" alt="${p.nome}" onerror="this.onerror=null; this.src=IMG_RESERVA;">
      </div>
    </div>
  `).join("");

  const controles = itens.length > 1 ? `
    <button type="button" class="carousel-btn prev" aria-label="Anterior">&#8249;</button>
    <button type="button" class="carousel-btn next" aria-label="Próximo">&#8250;</button>
    <div class="carousel-dots">
      ${itens.map((_, i) => `<button type="button" class="carousel-dot${i === 0 ? " active" : ""}" aria-label="Ir para o slide ${i + 1}"></button>`).join("")}
    </div>
  ` : "";

  el.innerHTML = `<div class="carousel-track">${slides}</div>${controles}`;
  if (itens.length < 2) return;

  const track = el.querySelector(".carousel-track");
  const dots = el.querySelectorAll(".carousel-dot");
  let atual = 0;
  let timer = null;

  function ir(indice) {
    atual = (indice + itens.length) % itens.length;
    track.style.transform = `translateX(-${atual * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle("active", i === atual));
  }

  const reduzirMovimento = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  function iniciarAuto() {
    pararAuto();
    if (!reduzirMovimento) timer = setInterval(() => ir(atual + 1), CARROSSEL_INTERVALO);
  }
  function pararAuto() { clearInterval(timer); }

  el.querySelector(".prev").addEventListener("click", () => { ir(atual - 1); iniciarAuto(); });
  el.querySelector(".next").addEventListener("click", () => { ir(atual + 1); iniciarAuto(); });
  dots.forEach((d, i) => d.addEventListener("click", () => { ir(i); iniciarAuto(); }));

  // pausa com o mouse em cima
  el.addEventListener("mouseenter", pararAuto);
  el.addEventListener("mouseleave", iniciarAuto);

  // arrastar com o dedo no celular
  let inicioX = null;
  el.addEventListener("touchstart", (e) => { inicioX = e.touches[0].clientX; pararAuto(); }, { passive: true });
  el.addEventListener("touchend", (e) => {
    if (inicioX !== null) {
      const dx = e.changedTouches[0].clientX - inicioX;
      if (Math.abs(dx) > 40) ir(dx < 0 ? atual + 1 : atual - 1);
    }
    inicioX = null;
    iniciarAuto();
  });

  iniciarAuto();
}

// fale conosco (a mensagem fica salva e aparece no painel da loja, em admin.html)
const CHAVE_RECLAMACOES = "vault-reclamacoes-v1";

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

function iniciarFormContato() {
  const form = document.getElementById("form-contato");
  if (!form) return;

  const status = document.getElementById("contato-status");
  const btnEnviar = document.getElementById("btn-enviar-contato");
  const btnWhats = document.getElementById("btn-whatsapp");

  if (form.dataset.iniciado === "true") return;
  form.dataset.iniciado = "true";

  if (CONTATO.whatsapp && btnWhats) {
    btnWhats.style.display = "block";
  }

  const mostrarStatus = (texto, tipo) => {
    if (!status) return;
    status.textContent = texto;
    status.className = "form-status " + tipo;
  };

  const pegarDados = () => ({
    nome: form.elements.namedItem("nome").value.trim(),
    email: form.elements.namedItem("email").value.trim(),
    assunto: form.elements.namedItem("assunto").value,
    mensagem: form.elements.namedItem("mensagem").value.trim()
  });

  function validar() {
    const d = pegarDados();

    const regras = [
      {
        campo: form.elements.namedItem("nome"),
        ok: d.nome.length >= 2,
        msg: "Digite seu nome com pelo menos 2 caracteres."
      },
      {
        campo: form.elements.namedItem("email"),
        ok: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(d.email),
        msg: "Digite um e-mail válido."
      },
      {
        campo: form.elements.namedItem("mensagem"),
        ok: d.mensagem.length >= 10,
        msg: "Escreva pelo menos 10 caracteres."
      }
    ];

    let tudoOk = true;

    regras.forEach(regra => {
      const grupo = regra.campo.closest(".input-group");
      if (!grupo) return;

      grupo.classList.toggle("invalid", !regra.ok);

      const erro = grupo.querySelector(".field-error");
      if (erro) erro.textContent = regra.ok ? "" : regra.msg;

      if (!regra.ok) tudoOk = false;
    });

    return tudoOk;
  }

  form.querySelectorAll("input, textarea").forEach(campo => {
    campo.addEventListener("input", () => {
      campo.closest(".input-group")?.classList.remove("invalid");
      const erro = campo.closest(".input-group")?.querySelector(".field-error");
      if (erro) erro.textContent = "";
    });
  });

  const montarTexto = d =>
    `Nome: ${d.nome}\nE-mail: ${d.email}\nAssunto: ${d.assunto}\n\n${d.mensagem}`;

  form.addEventListener("submit", async evento => {
    evento.preventDefault();
    mostrarStatus("", "");

    const campoIsca = document.getElementById("contato-site");

    // anti-spam
    if (campoIsca && campoIsca.value) return;
    if (!validar()) return;

    const d = pegarDados();
    const reclamacoes = carregarReclamacoes();

    const reclamacao = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      nome: d.nome,
      email: d.email,
      assunto: d.assunto,
      mensagem: d.mensagem,
      status: "Pendente",
      criadaEm: new Date().toISOString(),
      resposta: "",
      primeiraRespostaEm: null,
      avaliacao: 0
    };

    reclamacoes.push(reclamacao);

    if (!salvarReclamacoes(reclamacoes)) {
      mostrarStatus(
        "Não foi possível enviar sua mensagem agora. Tente novamente.",
        "erro"
      );
      return;
    }

    form.reset();

    if (CONTATO.endpoint) {
      btnEnviar.disabled = true;
      btnEnviar.textContent = "Enviando...";

      try {
        const resposta = await fetch(CONTATO.endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({
            nome: d.nome,
            email: d.email,
            assunto: d.assunto,
            mensagem: d.mensagem
          })
        });

        if (!resposta.ok) throw new Error("Falha no envio externo");

        mostrarStatus(
          "Mensagem enviada! Responderemos em breve.",
          "ok"
        );
      } catch (erro) {
        mostrarStatus(
          "Não foi possível enviar agora. Tente novamente ou use o e-mail " + CONTATO.email,
          "erro"
        );
      } finally {
        btnEnviar.disabled = false;
        btnEnviar.textContent = "Enviar mensagem";
      }

      return;
    }

    // sem endpoint: abre o programa de e-mail
    if (CONTATO.email) {
      const assuntoEmail = encodeURIComponent(`[Vault Sneakers] ${d.assunto}`);
      const corpo = encodeURIComponent(montarTexto(d));

      window.location.href =
        `mailto:${CONTATO.email}?subject=${assuntoEmail}&body=${corpo}`;

      mostrarStatus(
        "Mensagem enviada! Se o aplicativo de e-mail abrir, é só enviar por lá também.",
        "ok"
      );
    } else {
      mostrarStatus(
        "Mensagem registrada! Responderemos em breve.",
        "ok"
      );
    }
  });

  if (btnWhats) {
    btnWhats.addEventListener("click", () => {
      if (!CONTATO.whatsapp) return;
      if (!validar()) return;

      const texto = encodeURIComponent(montarTexto(pegarDados()));

      window.open(
        `https://wa.me/${CONTATO.whatsapp}?text=${texto}`,
        "_blank",
        "noopener"
      );

      mostrarStatus(
        "A mensagem foi preparada no WhatsApp. Confira e envie pelo aplicativo.",
        "ok"
      );
    });
  }
}

// inicialização
document.addEventListener("DOMContentLoaded", () => {
  carregarCarrinho();
  atualizarCarrinho();
  gerarFiltros();
  aplicarFiltros();
  iniciarCarrossel();
  iniciarFormContato();

  const inputBusca = document.getElementById("input-busca");
  if (inputBusca) {
    inputBusca.addEventListener("input", (e) => buscarProduto(e.target.value));
  }
});
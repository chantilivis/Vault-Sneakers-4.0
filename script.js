// ---------- imagens ----------

function gerarImagens(prefixo, quantidade, extensao = "jpeg") {
  return Array.from({ length: quantidade }, (_, i) => `img/${prefixo}-${i + 1}.${extensao}`);
}

const IMG_RESERVA =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400">' +
    '<rect width="100%" height="100%" fill="#eee"/>' +
    '<text x="50%" y="50%" text-anchor="middle" fill="#999" font-family="Arial" font-size="20">Sem imagem</text>' +
    '</svg>'
  );
window.IMG_RESERVA = IMG_RESERVA;

// ---------- configurações da loja ----------

const VALOR_FRETE = 29.90;
const CHAVE_CARRINHO = "vault-carrinho-v2";

const CONTATO = {
  email: "contato@vaultsneakers.com",
  whatsapp: "", // ex.: "5511999999999" (vazio esconde o botão)
  endpoint: ""  // link do Formspree/Getform, se for usar
};

// "nome" tem que ser igual ao de DADOS_PRODUTOS
const CARROSSEL = [
  { nome: "Air force 1 low panda",       foto: "img/Air_force_1_low_panda-carroseul.jpeg",       pos: "50% 60%" },
  { nome: "Nike Air Jordan 4 Bred",      foto: "img/Nike_Air_Jordan_4_Bred-carroseul.jpeg",      pos: "58% 55%" },
  { nome: "Nike Air Max 95 Neon",        foto: "img/Nike_Air_Max_95_Neon.jpeg",                  pos: "50% 70%" },
  { nome: "Nike Dunk Low Varsity Green", foto: "img/Nike_Dunk_Low_Varsity_Green-carroseul.jpeg", pos: "50% 55%" }
];
const CARROSSEL_INTERVALO = 4000;

const BEST_SELLERS = [
  "Air force 1 low panda",
  "Nike Air Jordan 4 Bred",
  "Nike Dunk Low Panda",
  "Nike Air Max 95 Neon",
  "Nike Air Jordan 4 Black Cat",
  "Nike Air Max Dn Roam Black",
  "Nike Shox R4 Black Pinksicle",
  "Nike Court Vision Low"
];

const BEST_BANNER = "img/Nike_Air_Max_95_Neon.jpeg";

const INEDITOS = [
  "Nike Air Max Dn NRG Marrom",
  "Nike Air Max Plus TN Hyper Pink Volt",
  "Nike Air Max 95 Big Bubble Comet Red",
  "Nike Air Jordan 4 Taupe Haze"
];

const CATEGORIAS_HOME = [
  { filtro: "Air Force", rotulo: "Air Force", img: "img/Air-force-1-low-panda-1.jpeg" },
  { filtro: "Jordan",    rotulo: "Jordan",    img: "img/Air-Jordan-4-bred-1.jpeg" },
  { filtro: "Air Max",   rotulo: "Air Max",   img: "img/Air-Max-95-Neon-1.jpeg" },
  { filtro: "Dunk",      rotulo: "Dunk",      img: "img/Dunk-Low-panda-1.jpeg" },
  { filtro: "Shox",      rotulo: "Shox",      img: "img/Nike-Shox-R4-Blue-Lagoon-1.jpeg" },
  { filtro: "Casual",    rotulo: "Casual",    img: "img/Nike-Court-Vision-Low-White-1.jpeg" }
];

// ---------- produtos ----------

const DESCRICOES = {
  "Air Force": "O ícone do basquete que virou clássico das ruas: visual limpo, construção em couro e amortecimento Air para o dia todo.",
  "Jordan": "Herança do basquete em um design inconfundível. Conforto, estilo e a atitude Jordan em cada passo.",
  "Air Max": "Amortecimento Air visível e visual marcante, feito para quem quer conforto e presença em qualquer ocasião.",
  "Dunk": "Nascido nas quadras e adotado pela cultura de rua: silhueta clássica e combinações de cores que chamam atenção.",
  "Casual": "Estilo versátil para o dia a dia, combinando com qualquer look e confortável do começo ao fim do dia.",
  "Shox": "Amortecimento com molas no calcanhar e visual futurista, direto do início dos anos 2000.",
  "Inédito": "Modelo exclusivo da Vault, em quantidade limitada. Você só encontra aqui."
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

// prefixo = nome da foto sem o "-número.jpeg"
const DADOS_PRODUTOS = [
  // air force 1
  { nome: "Air force 1 low panda", freteGratis: true, categoria: "Air Force", prefixo: "Air-force-1-low-panda", qtd: 8, preco: 799.90, desconto: 20,
    descricao: "O brilho continua vivo no Nike Air force 1 low panda, o ícone do basquete que dá um toque moderno naquilo que você conhece bem." },
  { nome: "Nike Air Force 1 Low Blue White", categoria: "Air Force", prefixo: "Air-force-1-blue-white", qtd: 8, preco: 799.90, desconto: 0,
    // a primeira foto tem o nome "Air-force-1 blue-&-white-1.jpeg"
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

  // casual
  { nome: "Nike Air Max Excee White Grey", categoria: "Casual", prefixo: "Nike-Air-Max-Excee-White-Grey", qtd: 6, preco: 599.90, desconto: 0 },
  { nome: "Nike Court Vision Low", freteGratis: true, categoria: "Casual", prefixo: "Nike-Court-Vision-Low-White", qtd: 6, preco: 499.90, desconto: 10,
    descricao: "Combina o estilo de ataque do basquete dos anos 80 com a cultura acelerada do jogo atual." },
  { nome: "Nike Court Vision Alta Black White", categoria: "Casual", prefixo: "Nike-Court-Vision-Alta-Black-White", qtd: 6, preco: 549.90, desconto: 0 },
  { nome: "Nike Court Vision Alta Triple White", categoria: "Casual", prefixo: "Nike-Court-Vision-Alta-Triple-White", qtd: 6, preco: 549.90, desconto: 0 },

  // shox r4
  { nome: "Nike Shox R4 Black Pinksicle", categoria: "Shox", prefixo: "Nike-Shox-R4-Black-Pinksicle", qtd: 6, preco: 899.90, desconto: 10 },
  { nome: "Nike Shox R4 Blue Lagoon", categoria: "Shox", prefixo: "Nike-shox-R4-Blue-Lagoon", qtd: 6, preco: 899.90, desconto: 0 },
  { nome: "Nike Shox R4 Phantom Picante Red", categoria: "Shox", prefixo: "Nike-Shox-R4-Phantom-Picante-Red", qtd: 6, preco: 899.90, desconto: 0 },
  { nome: "Nike Shox R4 White Metallic", categoria: "Shox", prefixo: "Nike-Shox-R4-White-Metallic", qtd: 6, preco: 899.90, desconto: 0 }

  // TODO: faltam 3 modelos (Big Bubble Laser Paisley, Big Bubble SE Obsidian, Plus TN Black Light Smoke Grey)
];

const produtos = DADOS_PRODUTOS.map((dados, i) => criarProduto(i + 1, dados));

// ---------- estado ----------

let carrinho = [];
let tamanhoSelecionado = null;
let contadorItemCarrinho = 0;
let filtroAtual = "todos";
let termoBusca = "";

// ---------- utilitários ----------

const formatarPreco = (valor) =>
  "R$ " + valor.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

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

function mudarPagina(idSecao) {
  const secaoAlvo = document.getElementById(idSecao);
  if (!secaoAlvo) return;
  fecharMenu();
  document.querySelectorAll(".page-section").forEach(sec => sec.classList.remove("active"));
  secaoAlvo.classList.add("active");
  window.scrollTo(0, 0);
}

function abrirMenu() {
  document.getElementById("drawer")?.classList.add("open");
  document.getElementById("drawer-overlay")?.classList.add("open");
}

function fecharMenu() {
  document.getElementById("drawer")?.classList.remove("open");
  document.getElementById("drawer-overlay")?.classList.remove("open");
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") fecharMenu();
});

// ---------- filtros e home ----------

function gerarFiltros() {
  const container = document.querySelector(".filters");
  if (!container) return;

  const categorias = [...new Set(produtos.map(p => p.categoria))];
  const itens = [
    { rotulo: "Todos", valor: "todos" },
    ...categorias.map(c => ({ rotulo: c, valor: c })),
    { rotulo: "Outlet", valor: "outlet" },
    { rotulo: "Frete grátis", valor: "frete" }
  ];

  container.innerHTML = itens.map((it, i) =>
    `<button class="filter-btn${i === 0 ? " active" : ""}" data-filtro="${it.valor}">${it.rotulo}</button>`
  ).join("");

  container.querySelectorAll(".filter-btn").forEach(btn => {
    btn.addEventListener("click", () => filtrarProdutos(btn.dataset.filtro, btn));
  });
}

function gerarCategoriasHome() {
  const el = document.getElementById("cat-tiles");
  if (!el) return;
  el.innerHTML = CATEGORIAS_HOME.map(c => `
    <a class="cat-tile" onclick="irParaCatalogo('${c.filtro}')">
      <div class="cat-circle"><img src="${encodeURI(c.img)}" alt="${c.rotulo}" loading="lazy" onerror="this.onerror=null; this.src=IMG_RESERVA;"></div>
      <span>${c.rotulo}</span>
    </a>
  `).join("");
}

function irParaCatalogo(filtro) {
  const input = document.getElementById("input-busca");
  if (input) input.value = "";
  termoBusca = "";
  mudarPagina("home");
  const btn = [...document.querySelectorAll(".filter-btn")].find(b => b.dataset.filtro === filtro);
  filtrarProdutos(filtro, btn || null);
  document.getElementById("catalogo")?.scrollIntoView({ behavior: "smooth" });
}

function buscaRapida(texto) {
  const input = document.getElementById("input-busca");
  if (input) input.value = texto;
  filtrarProdutos("todos", document.querySelector('.filter-btn[data-filtro="todos"]'));
  buscarProduto(texto);
  document.getElementById("catalogo")?.scrollIntoView({ behavior: "smooth" });
}

function cardProduto(prod, rank) {
  const tagDesconto = prod.desconto ? `<span class="tag-off">${prod.desconto}</span>` : "";
  const tagFrete = prod.freteGratis ? `<span class="tag-frete">FRETE GRÁTIS</span>` : "";
  const precoDeHTML = prod.precoDe ? `<span class="price-old">${prod.precoDe}</span>` : "";
  const precoPixHTML = prod.precoPix ? `<span class="price-promo">${prod.precoPix}</span>` : "";
  const rankHTML = rank ? `<span class="rank-badge">${rank}</span>` : "";

  return `
    <div class="product-card" onclick="abrirDetalhes(${prod.id})">
      <div class="card-top">
        <div class="brand-badge">${prod.logoMarca}</div>
        <div class="top-tags">
          ${tagDesconto}
          ${tagFrete}
        </div>
        ${rankHTML}
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
}

function gerarBestSellers() {
  const track = document.getElementById("best-track");
  if (!track) return;

  const lista = BEST_SELLERS.map(n => produtos.find(p => p.nome === n)).filter(Boolean);
  if (lista.length === 0) {
    document.getElementById("bestsellers")?.remove();
    return;
  }

  const banner = document.getElementById("best-banner-img");
  if (banner) {
    banner.src = encodeURI(BEST_BANNER);
    banner.onerror = () => {
      banner.onerror = null;
      banner.src = encodeURI(lista[0].imagens[0]);
    };
  }

  track.innerHTML = lista.map(p => `
    <div class="best-item" onclick="abrirDetalhes(${p.id})">
      <div class="best-item-img">
        <img src="${encodeURI(p.imagens[0])}" alt="${p.nome}" loading="lazy" onerror="this.onerror=null; this.src=IMG_RESERVA;">
      </div>
      <span class="best-brand">${p.marca}</span>
      <h3 class="best-name" title="${p.nome}">${p.nome}</h3>
      <strong class="best-price">${p.precoPor}</strong>
    </div>
  `).join("");
}

function rolarBest(direcao) {
  const track = document.getElementById("best-track");
  if (!track) return;
  track.scrollBy({ left: direcao * track.clientWidth * 0.85, behavior: "smooth" });
}

function gerarIneditos() {
  const grid = document.getElementById("ineditos-grid");
  const bloco = document.getElementById("ineditos");
  if (!grid) return;

  const lista = INEDITOS.map(n => produtos.find(p => p.nome === n)).filter(Boolean);
  if (lista.length === 0) {
    bloco?.remove();
    return;
  }

  grid.innerHTML = lista.map(p => `
    <div class="inedito-card" onclick="abrirDetalhes(${p.id})">
      <span class="inedito-badge">INÉDITO</span>
      ${p.freteGratis ? '<span class="inedito-frete">FRETE GRÁTIS</span>' : ""}
      <div class="inedito-img">
        <img src="${encodeURI(p.imagens[0])}" alt="${p.nome}" loading="lazy" onerror="this.onerror=null; this.src=IMG_RESERVA;">
      </div>
      <div class="inedito-info">
        <span class="inedito-marca">${p.marca}</span>
        <h3>${p.nome}</h3>
        <strong>${p.precoPor}</strong>
        <small>${p.parcelas}</small>
      </div>
    </div>
  `).join("");
}

function irParaInedito() {
  mudarPagina("home");
  document.getElementById("ineditos")?.scrollIntoView({ behavior: "smooth" });
}

// ---------- vitrine, busca e filtro ----------

function renderizarProdutos(lista) {
  const grid = document.getElementById("grid-produtos");
  if (!grid) return;

  if (lista.length === 0) {
    grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 2rem;">Nenhum produto encontrado.</p>';
    return;
  }

  grid.innerHTML = lista.map(prod => cardProduto(prod)).join("");
}

function aplicarFiltros() {
  const termo = termoBusca.toLowerCase().trim();
  const filtro = filtroAtual.toLowerCase();

  const resultado = produtos.filter(p => {
    const passaFiltro =
      filtro === "todos" ||
      (filtro === "outlet" && p.desconto !== "") ||
      (filtro === "frete" && p.freteGratis) ||
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

// ---------- página do produto ----------

function abrirDetalhes(id) {
  const prod = produtos.find(p => p.id === id);
  if (!prod) return;

  tamanhoSelecionado = null;
  const container = document.getElementById("detalhes-conteudo");
  if (!container) return;

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

// ---------- carrinho ----------

function salvarCarrinho() {
  try {
    localStorage.setItem(CHAVE_CARRINHO, JSON.stringify(carrinho));
  } catch (e) {}
}

function carregarCarrinho() {
  try {
    const salvo = JSON.parse(localStorage.getItem(CHAVE_CARRINHO));
    if (!Array.isArray(salvo)) return;

    // pega os dados atuais do produto, mas mantém tamanho e id do item salvo
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

// ---------- carrossel ----------

// tenta algumas grafias do nome do arquivo antes de desistir
function candidatosFoto(caminho) {
  const dir = caminho.slice(0, caminho.lastIndexOf("/") + 1);
  const nome = caminho.slice(dir.length);
  const variacoes = new Set([
    nome,
    nome.replace(/_/g, " "),
    nome.replace(/_/g, "-"),
    nome.replace(/_/g, " ").replace("-carroseul", " carroseul"),
    nome.replace("-carroseul", "-carrossel"),
    nome.replace(/_/g, " ").replace("-carroseul", "-carrossel"),
    nome.toLowerCase(),
    nome.replace(/\.jpeg$/i, ".jpg")
  ]);
  return [...variacoes].map(n => dir + n);
}

function tentarProximaFoto(img) {
  const lista = (img.dataset.cands || "").split("|").filter(Boolean);
  const i = Number(img.dataset.i || 0);
  if (i < lista.length) {
    img.dataset.i = i + 1;
    img.src = encodeURI(lista[i]);
  } else {
    img.onerror = null;
    img.src = img.dataset.fallback || IMG_RESERVA;
  }
}

function iniciarCarrossel() {
  const el = document.getElementById("carrossel");
  if (!el) return;

  const vistos = new Set();
  const itens = CARROSSEL
    .map(c => {
      const p = produtos.find(prod => prod.nome === c.nome);
      return p ? { ...p, fotoBanner: c.foto || p.imagens[0], posFoto: c.pos || "50% 50%" } : null;
    })
    .filter(p => {
      if (!p || vistos.has(p.id)) return false;
      vistos.add(p.id);
      return true;
    })
    .slice(0, 4);

  if (itens.length === 0) {
    el.style.display = "none";
    return;
  }

  const slides = itens.map(p => `
    <div class="carousel-slide">
      <div class="slide-text">
        <span class="slide-tag">${p.marca} • ${p.categoria}</span>
        <h3 class="slide-title">${p.nome}</h3>
        ${p.desconto ? `<span class="slide-off">${p.desconto}</span>` : ""}
        <button type="button" class="carousel-cta" onclick="abrirDetalhes(${p.id})">confira já!</button>
      </div>
      <div class="slide-img">
        <img src="${encodeURI(candidatosFoto(p.fotoBanner)[0])}" data-cands="${candidatosFoto(p.fotoBanner).join('|')}" data-i="1" data-fallback="${encodeURI(p.imagens[0])}" alt="${p.nome}" style="object-position:${p.posFoto}" onerror="tentarProximaFoto(this)">
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

  function pararAuto() {
    clearInterval(timer);
  }

  el.querySelector(".prev").addEventListener("click", () => { ir(atual - 1); iniciarAuto(); });
  el.querySelector(".next").addEventListener("click", () => { ir(atual + 1); iniciarAuto(); });
  dots.forEach((d, i) => d.addEventListener("click", () => { ir(i); iniciarAuto(); }));

  el.addEventListener("mouseenter", pararAuto);
  el.addEventListener("mouseleave", iniciarAuto);

  // swipe no celular
  let inicioX = null;
  el.addEventListener("touchstart", (e) => {
    inicioX = e.touches[0].clientX;
    pararAuto();
  }, { passive: true });

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

// ---------- helpers dos formulários ----------

function mostrarStatusForm(el, texto, tipo) {
  if (!el) return;
  el.textContent = texto;
  el.className = "form-status " + tipo;
}

// regras = [{ campo, ok, msg }]
function validarCampos(regras) {
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

function limparErroAoDigitar(form) {
  form.querySelectorAll("input, textarea").forEach(campo => {
    campo.addEventListener("input", () => {
      const grupo = campo.closest(".input-group");
      grupo?.classList.remove("invalid");
      const erro = grupo?.querySelector(".field-error");
      if (erro) erro.textContent = "";
    });
  });
}

const emailValido = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);

// ---------- fale conosco ----------

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
  if (form.dataset.iniciado === "true") return;
  form.dataset.iniciado = "true";

  const status = document.getElementById("contato-status");
  const btnEnviar = document.getElementById("btn-enviar-contato");
  const btnWhats = document.getElementById("btn-whatsapp");
  const campo = (nome) => form.elements.namedItem(nome);

  if (CONTATO.whatsapp && btnWhats) btnWhats.style.display = "block";

  const pegarDados = () => ({
    nome: campo("nome").value.trim(),
    email: campo("email").value.trim(),
    assunto: campo("assunto").value,
    mensagem: campo("mensagem").value.trim()
  });

  const validar = () => {
    const d = pegarDados();
    return validarCampos([
      { campo: campo("nome"), ok: d.nome.length >= 2, msg: "Digite seu nome com pelo menos 2 caracteres." },
      { campo: campo("email"), ok: emailValido(d.email), msg: "Digite um e-mail válido." },
      { campo: campo("mensagem"), ok: d.mensagem.length >= 10, msg: "Escreva pelo menos 10 caracteres." }
    ]);
  };

  const montarTexto = (d) =>
    `Nome: ${d.nome}\nE-mail: ${d.email}\nAssunto: ${d.assunto}\n\n${d.mensagem}`;

  limparErroAoDigitar(form);

  form.addEventListener("submit", async (evento) => {
    evento.preventDefault();
    mostrarStatusForm(status, "", "");

    // campo escondido: se vier preenchido, é robô
    const campoIsca = document.getElementById("contato-site");
    if (campoIsca && campoIsca.value) return;
    if (!validar()) return;

    const d = pegarDados();
    const reclamacoes = carregarReclamacoes();

    reclamacoes.push({
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
    });

    if (!salvarReclamacoes(reclamacoes)) {
      mostrarStatusForm(status, "Não foi possível enviar sua mensagem agora. Tente novamente.", "erro");
      return;
    }

    form.reset();

    if (CONTATO.endpoint) {
      btnEnviar.disabled = true;
      btnEnviar.textContent = "Enviando...";

      try {
        const resposta = await fetch(CONTATO.endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", "Accept": "application/json" },
          body: JSON.stringify({
            nome: d.nome,
            email: d.email,
            assunto: d.assunto,
            mensagem: d.mensagem
          })
        });

        if (!resposta.ok) throw new Error("Falha no envio externo");
        mostrarStatusForm(status, "Mensagem enviada! Responderemos em breve.", "ok");
      } catch (erro) {
        mostrarStatusForm(status, "Não foi possível enviar agora. Tente novamente ou use o e-mail " + CONTATO.email, "erro");
      } finally {
        btnEnviar.disabled = false;
        btnEnviar.textContent = "Enviar mensagem";
      }
      return;
    }

    // sem endpoint, abre o app de e-mail
    if (CONTATO.email) {
      const assuntoEmail = encodeURIComponent(`[Vault Sneakers] ${d.assunto}`);
      const corpo = encodeURIComponent(montarTexto(d));
      window.location.href = `mailto:${CONTATO.email}?subject=${assuntoEmail}&body=${corpo}`;
      mostrarStatusForm(status, "Mensagem enviada! Se o aplicativo de e-mail abrir, é só enviar por lá também.", "ok");
    } else {
      mostrarStatusForm(status, "Mensagem registrada! Responderemos em breve.", "ok");
    }
  });

  if (btnWhats) {
    btnWhats.addEventListener("click", () => {
      if (!CONTATO.whatsapp) return;
      if (!validar()) return;

      const texto = encodeURIComponent(montarTexto(pegarDados()));
      window.open(`https://wa.me/${CONTATO.whatsapp}?text=${texto}`, "_blank", "noopener");
      mostrarStatusForm(status, "A mensagem foi preparada no WhatsApp. Confira e envie pelo aplicativo.", "ok");
    });
  }
}

// ---------- seja um franqueado ----------

const CHAVE_FRANQUIAS = "vault-franquias-v1";

function carregarFranquias() {
  try {
    const dados = JSON.parse(localStorage.getItem(CHAVE_FRANQUIAS));
    return Array.isArray(dados) ? dados : [];
  } catch (erro) {
    return [];
  }
}

function salvarFranquias(lista) {
  try {
    localStorage.setItem(CHAVE_FRANQUIAS, JSON.stringify(lista));
    return true;
  } catch (erro) {
    return false;
  }
}

function iniciarFormFranquia() {
  const form = document.getElementById("form-franquia");
  if (!form) return;

  const status = document.getElementById("franquia-status");
  const btn = document.getElementById("btn-enviar-franquia");
  const campo = (nome) => form.elements.namedItem(nome);

  const pegarDados = () => ({
    nome: campo("nome").value.trim(),
    email: campo("email").value.trim(),
    telefone: campo("telefone").value.trim(),
    cidade: campo("cidade").value.trim(),
    investimento: campo("investimento").value,
    ponto: campo("ponto").value,
    mensagem: campo("mensagem").value.trim()
  });

  // máscara: (11) 99999-9999
  campo("telefone").addEventListener("input", (e) => {
    let v = e.target.value.replace(/\D/g, "").slice(0, 11);
    if (v.length > 6) v = `(${v.slice(0, 2)}) ${v.slice(2, v.length - 4)}-${v.slice(-4)}`;
    else if (v.length > 2) v = `(${v.slice(0, 2)}) ${v.slice(2)}`;
    else if (v.length > 0) v = `(${v}`;
    e.target.value = v;
  });

  const validar = () => {
    const d = pegarDados();
    const digitos = d.telefone.replace(/\D/g, "");
    return validarCampos([
      { campo: campo("nome"), ok: d.nome.length >= 2, msg: "Digite seu nome completo." },
      { campo: campo("email"), ok: emailValido(d.email), msg: "Digite um e-mail válido." },
      { campo: campo("telefone"), ok: digitos.length >= 10, msg: "Digite um telefone com DDD." },
      { campo: campo("cidade"), ok: d.cidade.length >= 2, msg: "Informe a cidade onde deseja abrir." }
    ]);
  };

  const montarTexto = (d) =>
    `Nome: ${d.nome}\nE-mail: ${d.email}\nTelefone: ${d.telefone}\nCidade/UF: ${d.cidade}\n` +
    `Capital: ${d.investimento}\nPonto comercial: ${d.ponto}\n\n${d.mensagem || "(sem mensagem)"}`;

  limparErroAoDigitar(form);

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    mostrarStatusForm(status, "", "");
    if (!validar()) return;

    const d = pegarDados();
    const lista = carregarFranquias();
    lista.push({
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      ...d,
      status: "Novo",
      criadaEm: new Date().toISOString()
    });

    if (!salvarFranquias(lista)) {
      mostrarStatusForm(status, "Não foi possível enviar agora. Tente novamente.", "erro");
      return;
    }

    form.reset();

    if (CONTATO.endpoint) {
      btn.disabled = true;
      btn.textContent = "Enviando...";

      try {
        const r = await fetch(CONTATO.endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", "Accept": "application/json" },
          body: JSON.stringify({ tipo: "Franquia", ...d })
        });
        if (!r.ok) throw new Error("falha");
        mostrarStatusForm(status, "Recebemos seu interesse! Nossa equipe entrará em contato em breve.", "ok");
      } catch (err) {
        mostrarStatusForm(status, "Não foi possível enviar agora. Escreva para " + CONTATO.email, "erro");
      } finally {
        btn.disabled = false;
        btn.textContent = "Enviar interesse";
      }
      return;
    }

    if (CONTATO.email) {
      const assunto = encodeURIComponent("[Vault Sneakers] Interesse em franquia");
      const corpo = encodeURIComponent(montarTexto(d));
      window.location.href = `mailto:${CONTATO.email}?subject=${assunto}&body=${corpo}`;
    }
    mostrarStatusForm(status, "Recebemos seu interesse! Nossa equipe entrará em contato em breve.", "ok");
  });
}

// ---------- inicialização ----------

document.addEventListener("DOMContentLoaded", () => {
  carregarCarrinho();
  atualizarCarrinho();
  gerarFiltros();
  gerarCategoriasHome();
  gerarBestSellers();
  gerarIneditos();
  aplicarFiltros();
  iniciarCarrossel();
  iniciarFormContato();
  iniciarFormFranquia();

  const inputBusca = document.getElementById("input-busca");
  if (inputBusca) {
    inputBusca.addEventListener("input", (e) => buscarProduto(e.target.value));
  }
});

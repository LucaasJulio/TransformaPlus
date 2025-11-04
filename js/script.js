/* ======================================================
   T+ | SCRIPT PRINCIPAL
   Autor: Andressa
   Funções:
   - Carrossel automático (Home)
   - Menu responsivo (mobile)
   - Scroll suave
   - Animação nos cards
   - Mensagem de envio do formulário (Contato)
====================================================== */

/* =======================
   1. CARROSSEL AUTOMÁTICO
========================= */
let slideAtual = 0;

function mostrarSlide(n) {
  const slides = document.querySelectorAll(".slides");
  slides.forEach(slide => (slide.style.display = "none"));
  slides[n].style.display = "block";
}

function proximoSlide() {
  const slides = document.querySelectorAll(".slides");
  slideAtual++;
  if (slideAtual >= slides.length) slideAtual = 0;
  mostrarSlide(slideAtual);
}

// Troca de imagem a cada 5 segundos (5000 ms)
if (document.querySelector(".slides")) {
  mostrarSlide(slideAtual);
  setInterval(proximoSlide, 5000);
}

/* =======================
   2. MENU RESPONSIVO
========================= */
// Cria botão "hambúrguer" para telas pequenas
const menu = document.querySelector(".menu");
const header = document.querySelector("header");

if (menu) {
  const botaoMenu = document.createElement("div");
  botaoMenu.classList.add("menu-btn");
  botaoMenu.innerHTML = "☰"; // Ícone simples de menu
  header.querySelector(".navbar").prepend(botaoMenu);

  botaoMenu.addEventListener("click", () => {
    menu.classList.toggle("menu-ativo");
    botaoMenu.classList.toggle("ativo");
  });
}

/* =======================
   3. SCROLL SUAVE (rolagem suave)
========================= */
const links = document.querySelectorAll('a[href^="#"]');
links.forEach(link => {
  link.addEventListener("click", function (e) {
    const destino = document.querySelector(this.getAttribute("href"));
    if (destino) {
      e.preventDefault();
      destino.scrollIntoView({ behavior: "smooth" });
    }
  });
});

/* =======================
   4. ANIMAÇÃO DOS CARDS
========================= */
// Cards de projetos, doações, voluntários etc.
const cards = document.querySelectorAll(".card, .card-projeto, .mvv-card");
const aparecerCard = new IntersectionObserver((entradas) => {
  entradas.forEach((entrada) => {
    if (entrada.isIntersecting) {
      entrada.target.classList.add("visivel");
    }
  });
}, { threshold: 0.2 });

cards.forEach((card) => aparecerCard.observe(card));

/* =======================
   5. CONTADOR (página Doações)
========================= */
const contadores = document.querySelectorAll(".contador");

function animarContador(contador) {
  const valorFinal = +contador.getAttribute("data-valor");
  let valorAtual = 0;
  const incremento = Math.ceil(valorFinal / 100);

  const atualizar = setInterval(() => {
    valorAtual += incremento;
    contador.textContent = valorAtual;
    if (valorAtual >= valorFinal) {
      contador.textContent = valorFinal;
      clearInterval(atualizar);
    }
  }, 30);
}

if (contadores.length > 0) {
  const observerContador = new IntersectionObserver((entradas) => {
    entradas.forEach((entrada) => {
      if (entrada.isIntersecting) {
        animarContador(entrada.target);
        observerContador.unobserve(entrada.target);
      }
    });
  });
  contadores.forEach((contador) => observerContador.observe(contador));
}

/* =======================
   6. FORMULÁRIO DE CONTATO
========================= */
const formContato = document.querySelector(".form-contato");
if (formContato) {
  formContato.addEventListener("submit", (e) => {
    e.preventDefault(); // impede recarregar a página
    alert("✅ Mensagem enviada com sucesso!\nA equipe do T+ entrará em contato em breve.");
    formContato.reset();
  });
}

// ===========================
// MÁSCARAS DE INPUT
// ===========================
const cpf = document.getElementById("cpf");
const telefone = document.getElementById("telefone");
const cep = document.getElementById("cep");

// CPF → 000.000.000-00
cpf.addEventListener("input", () => {
  let valor = cpf.value.replace(/\D/g, "");
  if (valor.length > 3) valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
  if (valor.length > 6) valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
  if (valor.length > 9) valor = valor.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  cpf.value = valor;
});

// TELEFONE → (00) 00000-0000
telefone.addEventListener("input", () => {
  let valor = telefone.value.replace(/\D/g, "");
  if (valor.length > 2) valor = valor.replace(/^(\d{2})(\d)/g, "($1) $2");
  if (valor.length > 7) valor = valor.replace(/(\d{5})(\d{4})$/, "$1-$2");
  telefone.value = valor;
});

// CEP → 00000-000
cep.addEventListener("input", () => {
  let valor = cep.value.replace(/\D/g, "");
  if (valor.length > 5) valor = valor.replace(/(\d{5})(\d)/, "$1-$2");
  cep.value = valor;
});

// ===========================
// VALIDAÇÃO SIMPLES
// ===========================
const form = document.getElementById("formCadastro");
form.addEventListener("submit", (e) => {
  if (!form.checkValidity()) {
    e.preventDefault();
    alert("⚠️ Preencha todos os campos obrigatórios corretamente.");
  } else {
    e.preventDefault();
    alert("✅ Cadastro enviado com sucesso!");
    form.reset();
  }
});

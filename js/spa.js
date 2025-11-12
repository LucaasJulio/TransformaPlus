/* ======================================
   spa.js - Sistema simples de SPA (Single Page Application)
   ====================================== */

// Captura os links do menu principal
const links = document.querySelectorAll("nav a");
const conteudo = document.querySelector("main");

links.forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();

    const pagina = link.getAttribute("href");
    carregarConteudo(pagina);
  });
});

// Função para carregar conteúdo sem recarregar a página
function carregarConteudo(pagina) {
  fetch(pagina)
    .then(res => res.text())
    .then(html => {
      conteudo.innerHTML = html;
    })
    .catch(err => {
      conteudo.innerHTML = "<p>❌ Erro ao carregar conteúdo.</p>";
      console.error("Erro:", err);
    });
}

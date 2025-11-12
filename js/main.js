/* ======================================
   main.js - Funções gerais do site T+
   ====================================== */

// ===== Carrossel automático =====
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
setInterval(proximoSlide, 5000);

// ===== Menu mobile (hambúrguer) =====
const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector("nav ul");
if (menuBtn) {
  menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("ativo");
  });
}

// ===== Scroll suave =====
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const destino = document.querySelector(link.getAttribute("href"));
    destino.scrollIntoView({ behavior: "smooth" });
  });
});

// ===== Animação de entrada =====
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add("aparecer");
    });
  },
  { threshold: 0.1 }
);
document.querySelectorAll(".animar").forEach(el => observer.observe(el));

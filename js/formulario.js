/* ======================================
   formulario.js - Verificação de consistência e feedback visual
   ====================================== */

const form = document.querySelector("form");

if (form) {
  form.addEventListener("submit", e => {
    e.preventDefault();

    const nome = form.querySelector("#nome");
    const email = form.querySelector("#email");
    const cpf = form.querySelector("#cpf");
    const telefone = form.querySelector("#telefone");

    // ===== Validação simples =====
    if (!nome.value || !email.value || !cpf.value || !telefone.value) {
      mostrarMensagem("⚠️ Preencha todos os campos obrigatórios!", "erro");
      return;
    }

    // ===== Verificações básicas =====
    if (!email.value.includes("@")) {
      mostrarMensagem("⚠️ E-mail inválido!", "erro");
      return;
    }

    if (cpf.value.length < 11) {
      mostrarMensagem("⚠️ CPF deve conter 11 dígitos!", "erro");
      return;
    }

    // ===== Feedback de sucesso =====
    mostrarMensagem("✅ Formulário enviado com sucesso!", "sucesso");

    // ===== Armazenamento local =====
    localStorage.setItem("usuario", nome.value);

    // ===== Resetar formulário =====
    form.reset();
  });
}

// ===== Função para exibir mensagens de feedback =====
function mostrarMensagem(texto, tipo) {
  const msg = document.createElement("div");
  msg.className = `mensagem ${tipo}`;
  msg.textContent = texto;
  document.body.appendChild(msg);

  setTimeout(() => msg.remove(), 4000);
}

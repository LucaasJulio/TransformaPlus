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

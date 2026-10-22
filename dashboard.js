
const nome = sessionStorage.getItem("saudeNome");

const tituloBoasVindas = document.querySelector(
    "#titulo-boas-vindas"
);

if (tituloBoasVindas) {
    if (nome) {
        tituloBoasVindas.textContent = "Olá, " + nome + "!";
    } else {
        tituloBoasVindas.textContent =
            "Olá! Bem-vindo ao Saúde+.";
    }
}

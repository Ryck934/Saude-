
const formulario = document.querySelector(".form-login");

formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    const nome = document.querySelector("#nome").value.trim();
    const idade = Number(document.querySelector("#idade").value);

    if (nome === "") {
        alert("Digite seu nome.");
        return;
    }

    if (!idade || idade < 1 || idade > 120) {
        alert("Digite uma idade válida.");
        return;
    }

    sessionStorage.setItem("saudeNome", nome);
    sessionStorage.setItem("saudeIdade", idade);

    window.location.href = "dashboard.html";
});

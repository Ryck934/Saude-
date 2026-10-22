
const formulario = document.querySelector("#form-anotacao");
const campoTitulo = document.querySelector("#titulo-anotacao");
const campoDescricao = document.querySelector("#descricao-anotacao");
const mensagem = document.querySelector("#mensagem-anotacoes");
const container = document.querySelector("#anotacoes-container");

let anotacoes = [];

try {
    anotacoes = JSON.parse(
        localStorage.getItem("saudeAnotacoes") || "[]"
    );

    if (!Array.isArray(anotacoes)) {
        anotacoes = [];
    }
} catch {
    anotacoes = [];
}

function salvarAnotacoes() {
    localStorage.setItem(
        "saudeAnotacoes",
        JSON.stringify(anotacoes)
    );
}

function mostrarAnotacoes() {
    container.replaceChildren();

    if (anotacoes.length === 0) {
        mensagem.textContent = "Você ainda não tem anotações.";
        return;
    }

    mensagem.textContent =
        "Total de anotações: " + anotacoes.length;

    anotacoes.forEach(function(anotacao) {
        const cartao = document.createElement("article");
        const titulo = document.createElement("h3");
        const descricao = document.createElement("p");
        const botaoExcluir = document.createElement("button");

        titulo.textContent = anotacao.titulo;
        descricao.textContent = anotacao.descricao;

        botaoExcluir.type = "button";
        botaoExcluir.textContent = "Excluir";

        botaoExcluir.addEventListener("click", function() {
            anotacoes = anotacoes.filter(function(item) {
                return item.id !== anotacao.id;
            });

            salvarAnotacoes();
            mostrarAnotacoes();
        });

        cartao.append(titulo, descricao, botaoExcluir);
        container.appendChild(cartao);
    });
}

formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    const titulo = campoTitulo.value.trim();
    const descricao = campoDescricao.value.trim();

    if (titulo === "" || descricao === "") {
        mensagem.textContent =
            "Preencha o título e a descrição.";
        return;
    }

    const anotacao = {
        id: Date.now().toString() + Math.random().toString(16).slice(2),
        titulo: titulo,
        descricao: descricao
    };

    anotacoes.push(anotacao);

    salvarAnotacoes();
    mostrarAnotacoes();

    formulario.reset();

    campoTitulo.focus();
});

mostrarAnotacoes();

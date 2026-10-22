
const formulario = document.querySelector("#form-vacina");
const campoNome = document.querySelector("#nome-vacina");
const campoDataDose = document.querySelector("#data-dose");
const campoProximaDose = document.querySelector("#proxima-dose");
const mensagem = document.querySelector("#mensagem-vacinas");
const container = document.querySelector("#vacinas-container");

const CHAVE_STORAGE = "saudeVacinas";

function carregarVacinas() {
    try {
        const dados = JSON.parse(
            localStorage.getItem(CHAVE_STORAGE) || "[]"
        );

        return Array.isArray(dados) ? dados : [];
    } catch {
        return [];
    }
}

let vacinas = carregarVacinas();

function salvarVacinas() {
    try {
        localStorage.setItem(
            CHAVE_STORAGE,
            JSON.stringify(vacinas)
        );

        return true;
    } catch {
        mensagem.textContent =
            "Não foi possível salvar. Verifique o armazenamento do navegador.";

        return false;
    }
}

function formatarData(data) {
    if (!data) {
        return "Não informada";
    }

    const partes = data.split("-");
    return partes[2] + "/" + partes[1] + "/" + partes[0];
}

function mostrarVacinas() {
    container.replaceChildren();

    if (vacinas.length === 0) {
        mensagem.textContent =
            "Você ainda não registrou vacinas.";

        return;
    }

    mensagem.textContent =
        "Total de registros: " + vacinas.length;

    vacinas.forEach(function(vacina) {
        const cartao = document.createElement("article");
        const titulo = document.createElement("h3");
        const dataDose = document.createElement("p");
        const proximaDose = document.createElement("p");
        const botaoExcluir = document.createElement("button");

        titulo.textContent = vacina.nome;

        dataDose.textContent =
            "Data da dose: " + formatarData(vacina.dataDose);

        proximaDose.textContent =
            "Próxima dose: " + formatarData(vacina.proximaDose);

        botaoExcluir.type = "button";
        botaoExcluir.textContent = "Excluir registro";

        botaoExcluir.addEventListener("click", function() {
            vacinas = vacinas.filter(function(item) {
                return item.id !== vacina.id;
            });

            if (salvarVacinas()) {
                mostrarVacinas();
            }
        });

        cartao.append(
            titulo,
            dataDose,
            proximaDose,
            botaoExcluir
        );

        container.appendChild(cartao);
    });
}

formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    const nome = campoNome.value.trim();
    const dataDose = campoDataDose.value;
    const proximaDose = campoProximaDose.value;

    if (!nome || !dataDose) {
        mensagem.textContent =
            "Preencha o nome da vacina e a data da dose.";

        return;
    }

    if (proximaDose && proximaDose < dataDose) {
        mensagem.textContent =
            "A próxima dose não pode ter uma data anterior à dose registrada.";

        campoProximaDose.focus();
        return;
    }

    const vacina = {
        id: Date.now().toString() + Math.random().toString(16).slice(2),
        nome: nome,
        dataDose: dataDose,
        proximaDose: proximaDose
    };

    vacinas.push(vacina);

    if (salvarVacinas()) {
        formulario.reset();
        mostrarVacinas();
        campoNome.focus();
    } else {
        vacinas = vacinas.filter(function(item) {
            return item.id !== vacina.id;
        });
    }
});

mostrarVacinas();

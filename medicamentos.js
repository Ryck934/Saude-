
const formulario = document.querySelector("#form-medicamento");
const campoNome = document.querySelector("#nome-medicamento");
const campoDosagem = document.querySelector("#dosagem-medicamento");
const campoHorarios = document.querySelector("#horarios-medicamento");
const mensagem = document.querySelector("#mensagem-medicamentos");
const container = document.querySelector("#medicamentos-container");

const CHAVE_STORAGE = "saudeMedicamentos";

function carregarMedicamentos() {
    try {
        const dados = JSON.parse(
            localStorage.getItem(CHAVE_STORAGE) || "[]"
        );

        return Array.isArray(dados) ? dados : [];
    } catch {
        return [];
    }
}

let medicamentos = carregarMedicamentos();

function salvarMedicamentos() {
    try {
        localStorage.setItem(
            CHAVE_STORAGE,
            JSON.stringify(medicamentos)
        );

        return true;
    } catch {
        mensagem.textContent =
            "Não foi possível salvar. Verifique o armazenamento do navegador.";

        return false;
    }
}

function mostrarMedicamentos() {
    container.replaceChildren();

    if (medicamentos.length === 0) {
        mensagem.textContent =
            "Você ainda não cadastrou medicamentos.";

        return;
    }

    mensagem.textContent =
        "Total de registros: " + medicamentos.length;

    medicamentos.forEach(function(medicamento) {
        const cartao = document.createElement("article");
        const titulo = document.createElement("h3");
        const dosagem = document.createElement("p");
        const horarios = document.createElement("p");
        const botaoExcluir = document.createElement("button");

        titulo.textContent = medicamento.nome;
        dosagem.textContent = "Dosagem: " + medicamento.dosagem;
        horarios.textContent = "Horários registrados: " + medicamento.horarios;

        botaoExcluir.type = "button";
        botaoExcluir.textContent = "Excluir registro";

        botaoExcluir.addEventListener("click", function() {
            medicamentos = medicamentos.filter(function(item) {
                return item.id !== medicamento.id;
            });

            if (salvarMedicamentos()) {
                mostrarMedicamentos();
            }
        });

        cartao.append(titulo, dosagem, horarios, botaoExcluir);
        container.appendChild(cartao);
    });
}

formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    const nome = campoNome.value.trim();
    const dosagem = campoDosagem.value.trim();
    const horarios = campoHorarios.value.trim();

    if (!nome || !dosagem || !horarios) {
        mensagem.textContent = "Preencha todos os campos.";
        return;
    }

    const medicamento = {
        id: Date.now().toString() + Math.random().toString(16).slice(2),
        nome: nome,
        dosagem: dosagem,
        horarios: horarios
    };

    medicamentos.push(medicamento);

    if (salvarMedicamentos()) {
        formulario.reset();
        mostrarMedicamentos();
        campoNome.focus();
    } else {
        medicamentos = medicamentos.filter(function(item) {
            return item.id !== medicamento.id;
        });
    }
});

mostrarMedicamentos();

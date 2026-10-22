
const conteudos = [
    {
        titulo: "Queimaduras leves",
        categoria: "primeiros-socorros",
        descricao: "Interrompa o contato com a fonte de calor e resfrie a região com água corrente fresca. Não use gelo, pasta de dente ou receitas caseiras e não estoure bolhas. Procure atendimento se a queimadura for extensa, profunda ou atingir áreas delicadas.",
        palavras: ["queimadura", "queimado", "fogo", "agua quente", "bolha", "calor"],
        alerta: false
    },
    {
        titulo: "Cortes e sangramentos",
        categoria: "primeiros-socorros",
        descricao: "Em um corte pequeno, lave as mãos e a região com água limpa e cubra com um curativo limpo. Se houver sangramento intenso, pressione o local com um tecido limpo e peça ajuda. Não retire objetos presos na ferida.",
        palavras: ["corte", "sangue", "sangramento", "ferida", "machucado"],
        alerta: true
    },
    {
        titulo: "Engasgo e dificuldade para respirar",
        categoria: "primeiros-socorros",
        descricao: "Se a pessoa não consegue respirar, falar ou tossir, peça ajuda imediatamente e ligue para o SAMU, no 192. Siga as instruções do atendente. Não coloque os dedos às cegas dentro da boca da pessoa.",
        palavras: ["engasgo", "engasgado", "respirar", "falta de ar", "sufocamento"],
        alerta: true
    },
    {
        titulo: "Sinais de emergência",
        categoria: "alertas",
        descricao: "Dificuldade intensa para respirar, inconsciência, dor súbita no peito, sinais de AVC, convulsão ou sangramento intenso podem exigir atendimento imediato. Ligue para o SAMU, no 192, e siga as orientações recebidas.",
        palavras: ["emergencia", "urgencia", "desmaio", "inconsciente", "avc", "infarto", "convulsao", "dor no peito"],
        alerta: true
    },
    {
        titulo: "Febre",
        categoria: "sintomas",
        descricao: "A febre pode ter diferentes causas. Descanse, beba líquidos se conseguir e acompanhe a evolução. Procure orientação de um profissional de saúde se persistir, piorar ou vier acompanhada de outros sintomas preocupantes.",
        palavras: ["febre", "temperatura alta", "calafrio", "quente"],
        alerta: false
    },
    {
        titulo: "Dor de cabeça",
        categoria: "sintomas",
        descricao: "Desidratação, falta de sono e outras condições podem causar dor de cabeça. Descanse em um ambiente tranquilo e beba água. Uma dor súbita e muito intensa, ou acompanhada de confusão, fraqueza ou dificuldade para falar, exige atendimento urgente.",
        palavras: ["dor de cabeca", "cefaleia", "enxaqueca", "cabeca doendo", "fraqueza"],
        alerta: true
    },
    {
        titulo: "Desidratação",
        categoria: "sintomas",
        descricao: "Sede, boca seca e urina escura podem indicar que você precisa de líquidos. Beba água regularmente. Confusão, desmaio ou incapacidade de beber exigem avaliação urgente.",
        palavras: ["desidratacao", "sede", "boca seca", "pouca urina", "urina escura", "calor"],
        alerta: true
    },
    {
        titulo: "Alimentação equilibrada",
        categoria: "prevencao",
        descricao: "Procure variar os alimentos, incluir frutas, verduras, legumes e feijão, e dar preferência a alimentos pouco processados. As necessidades variam de pessoa para pessoa.",
        palavras: ["alimentacao", "comida", "dieta", "frutas", "verduras", "nutricao"],
        alerta: false
    },
    {
        titulo: "Hidratação diária",
        categoria: "prevencao",
        descricao: "Beba água ao longo do dia e aumente a atenção durante o calor ou a atividade física. A quantidade necessária varia conforme idade, atividade, clima e condições de saúde.",
        palavras: ["agua", "hidratacao", "beber agua", "calor", "sede"],
        alerta: false
    },
    {
        titulo: "Sono e descanso",
        categoria: "prevencao",
        descricao: "Manter horários regulares para dormir, reduzir distrações antes de deitar e preparar um ambiente tranquilo pode ajudar na qualidade do sono.",
        palavras: ["sono", "dormir", "insonia", "cansaco", "descanso"],
        alerta: false
    },
    {
        titulo: "Higiene e prevenção de infecções",
        categoria: "prevencao",
        descricao: "Lave as mãos com água e sabão, mantenha alimentos bem higienizados e siga as recomendações de vacinação. Evite compartilhar objetos pessoais que possam transmitir infecções.",
        palavras: ["higiene", "lavar as maos", "infeccao", "germes", "bacterias", "vacina"],
        alerta: false
    },
    {
        titulo: "Atividade física",
        categoria: "prevencao",
        descricao: "Movimentar o corpo regularmente pode contribuir para a saúde física e mental. Escolha atividades adequadas à sua condição e aumente o esforço gradualmente.",
        palavras: ["exercicio", "academia", "caminhada", "esporte", "atividade fisica"],
        alerta: false
    }
];

const formulario = document.querySelector("#form-busca");
const campoBusca = document.querySelector("#busca-sintomas");
const mensagem = document.querySelector("#mensagem-resultados");
const lista = document.querySelector("#lista-resultados");
const botoesCategoria = document.querySelectorAll("[data-categoria]");

let categoriaAtual = "todos";

function normalizar(texto) {
    return texto
        .toLocaleLowerCase("pt-BR")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .trim();
}

function criarCartao(conteudo) {
    const cartao = document.createElement("article");
    cartao.className = "orientacao-card";

    const categoria = document.createElement("span");
    categoria.className = "orientacao-categoria";
    categoria.textContent = conteudo.categoria
        .replace("-", " ")
        .replace(/^./, letra => letra.toUpperCase());

    const titulo = document.createElement("h3");
    titulo.textContent = conteudo.titulo;

    const descricao = document.createElement("p");
    descricao.textContent = conteudo.descricao;

    cartao.append(categoria, titulo, descricao);

    if (conteudo.alerta) {
        const aviso = document.createElement("p");
        aviso.className = "orientacao-aviso";
        aviso.textContent =
            "Atenção: procure atendimento se houver sinais de gravidade.";
        cartao.appendChild(aviso);
    }

    return cartao;
}

function atualizarResultados() {
    const pesquisa = normalizar(campoBusca.value);

    const resultados = conteudos.filter(conteudo => {
        const correspondeCategoria =
            categoriaAtual === "todos" ||
            conteudo.categoria === categoriaAtual;

        const textoPesquisavel = normalizar([
            conteudo.titulo,
            conteudo.descricao,
            conteudo.categoria,
            ...conteudo.palavras
        ].join(" "));

        const correspondePesquisa =
            !pesquisa || textoPesquisavel.includes(pesquisa);

        return correspondeCategoria && correspondePesquisa;
    });

    lista.replaceChildren();

    resultados.forEach(conteudo => {
        lista.appendChild(criarCartao(conteudo));
    });

    if (resultados.length === 0) {
        mensagem.textContent =
            "Nenhum conteúdo encontrado. Tente outra palavra ou categoria.";
    } else {
        mensagem.textContent =
            `${resultados.length} conteúdo(s) encontrado(s).`;
    }
}

formulario.addEventListener("submit", evento => {
    evento.preventDefault();
    atualizarResultados();
});

campoBusca.addEventListener("input", atualizarResultados);

botoesCategoria.forEach(botao => {
    botao.addEventListener("click", () => {
        categoriaAtual = botao.dataset.categoria;

        botoesCategoria.forEach(outroBotao => {
            outroBotao.classList.remove("ativo");
        });

        botao.classList.add("ativo");
        atualizarResultados();
    });
});

atualizarResultados();

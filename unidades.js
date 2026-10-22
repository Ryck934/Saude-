
const formulario = document.querySelector("#form-unidades");
const campoBusca = document.querySelector("#busca-unidades");
const botoesCategoria = document.querySelectorAll("[data-tipo]");

const areaMapa = document.querySelector("#mapa-unidades");
const mapa = document.querySelector("#google-maps");
const tituloMapa = document.querySelector("#titulo-mapa");
const linkGoogleMaps = document.querySelector("#abrir-google-maps");

function pesquisarUnidades(termo) {
    const pesquisa = termo.trim();

    if (pesquisa === "") {
        campoBusca.focus();
        return;
    }

    // URL para abrir a pesquisa completa no Google Maps.
    const urlPesquisa = new URL("https://www.google.com/maps/search/");
    urlPesquisa.searchParams.set("api", "1");
    urlPesquisa.searchParams.set("query", pesquisa);

    // URL para incorporar o mapa na página.
    const urlMapa = new URL("https://maps.google.com/maps");
    urlMapa.searchParams.set("q", pesquisa);
    urlMapa.searchParams.set("output", "embed");

    // Atualiza o título, o mapa e o link externo.
    tituloMapa.textContent = "Resultados: " + pesquisa;
    mapa.src = urlMapa.toString();
    linkGoogleMaps.href = urlPesquisa.toString();

    // Exibe a área do mapa.
    areaMapa.hidden = false;

    // Desce a página até os resultados.
    areaMapa.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}

// Pesquisa digitada no campo.
formulario.addEventListener("submit", function(event) {
    event.preventDefault();
    pesquisarUnidades(campoBusca.value);
});

// Pesquisa pelos botões de categoria.
botoesCategoria.forEach(function(botao) {
    botao.addEventListener("click", function() {
        const tipo = botao.dataset.tipo;
        campoBusca.value = tipo;
        pesquisarUnidades(tipo);
    });
});

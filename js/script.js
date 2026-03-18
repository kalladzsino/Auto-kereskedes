let markaInput;
let modellInput;
let talalatokDiv;

document.addEventListener('DOMContentLoaded', function() {
    markaInput = document.getElementById("markaInput");
    modellInput = document.getElementById("modellInput");
    talalatokDiv = document.getElementById("talalatok");
});

function includeHtml(name) {
    fetch(`./${name}.html`)
        .then(response => response.text())
        .then(html => document.querySelector(name).innerHTML = html);
}

// amikor a felhasználó görgeti az oldaltt akkor rárakjuk a classt hogy 100%ra animálójon
window.addEventListener("scroll", function() {
    const navbar = document.querySelector(".navbar");
    if (window.scrollY > 10) {
        navbar.classList.add("navbar-scrolled");
    } else {
        navbar.classList.remove("navbar-scrolled");
    }
});

function uzenetMutatas(uzenet) {
    alert(uzenet);
}

async function autokBetoltese() {
    try {
        const response = await fetch('../db/adatok.json');
        autok = await response.json();
        autokMegjelenites();
    } catch (error) {
        uzenetMutatas('Hiba történt az autók betöltése során!')
    }
}

function ListaFrissites() {
    talalatokDiv.innerHTML = "Teszt";
}
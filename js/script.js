let autok = [];
let AutokFilter = [];

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

// autok json betöltése + a 2 tömb változo feltöltése
async function JsonBetoltes() {
    try {
        const response = await fetch('../db/adatok.json');
        autok = await response.json();
        AutokFilter = [...autok];

        // csak akkor generaljuk a kartyakat ha a vasarlas oldalon vagyunk,hogy ne legyen error
        if (document.body.id === 'vasarlas') {
            autok.forEach(item => {
            CreateCard(item.marka, item.modell, item.kivitel, item.evjarat, item.ar, item.foto);
            });
        }

    } catch (error) { 
        alert('Hiba történt a betöltés során!')
    }
};
JsonBetoltes()



function CreateCard(marka, modell, kivitel, evjarat, ar, foto) {
    let TalalatokDiv = document.getElementById("talalatok");
    const card = document.createElement(`div`);

    TalalatokDiv.innerHTML += `
    <div class="col">
        <div class="card card-jarmu">
            <img src="${foto}" onerror="this.onerror=null; this.src='../assets/img/images/cars/default.png';" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${marka} ${modell}</h5>
                <p class="card-text">${kivitel} | ${evjarat}</p>
                <p class="card-text card-text-mini"> ${numberWithSpaces(ar)} Ft</p>
            </div>
            <button class="btn btn-primary" type="button" aria-expanded="false" style="width: 100%;">
                Részletek
            </button>
        </div>
    </div>
    `;
    
    TalalatokDiv.appendChild(card);
}

// szamok formazasa ezres elvalaszto spaceszel
function numberWithSpaces(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}
let autok = [];
let AutokFilter = [];

// html filter bemenetek
let markaInput;
let modellInput;
let kivitelDropdown = ""; // a dropdownban kivalasztott érték fogja felulirni a setDropdownValue functionnal

document.addEventListener("DOMContentLoaded", function() {
    markaInput = document.getElementById("markaInput");
    modellInput = document.getElementById("modellInput");
});

function setDropdownValue(value) {
    kivitelDropdown = value;
    dropdownSzoveg.textContent = value; // a dropdown gomb szoveget is atirjuk a kivalasztott ertekre
    if (value === "") {
        dropdownSzoveg.textContent = "Kérem Válasszon";
    }
}

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
            CreateCard(item.marka, item.modell, item.kivitel, item.evjarat, item.ar, item.foto, item.uzemanyag, item.id);
            });
        }

    } catch (error) { 
        alert('Hiba történt a betöltés során!')
    }
};
JsonBetoltes()

function CreateCard(marka, modell, kivitel, evjarat, ar, foto, uzemanyag, id) {
    let TalalatokDiv = document.getElementById("talalatok");
    const card = document.createElement(`div`);

    TalalatokDiv.innerHTML += `
    <div class="col">
        <div class="card card-jarmu">
            <img src="${foto}" onerror="this.onerror=null; this.src='../assets/img/images/cars/Default.png';" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${marka} ${modell}</h5>
                <p>${kivitel} | ${evjarat} <br> ${uzemanyag}</p>

                <p class="card-text card-text-mini"> ${numberWithSpaces(ar)} Ft</p>
            </div>
            <button class="btn btn-primary" onclick="SetModalData(${id})" data-bs-toggle="modal" data-bs-target="#exampleModal" type="button" aria-expanded="false" style="width: 100%;" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Részletek
            </button>
        </div>
    </div>
    `;
    
    TalalatokDiv.appendChild(card);
};

// szamok formazasa ezres elvalaszto spaceszel
function numberWithSpaces(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};

// modal adatok beirasa
function SetModalData(id) {
    let DefaultFoto = "../assets/img/images/cars/Default.png";
    let ModalTitle = document.getElementById("ModalTitle");
    let ModalSubtitle = document.getElementById("ModalSubtitle");
    let ModalAr = document.getElementById("ModalAr");
    let ModalElado = document.getElementById("ModalElado");
    let ModalHelyszin = document.getElementById("ModalHelyszin");
    let ModalUzemanyag = document.getElementById("ModalUzemanyag");
    let ModalLeiras = document.getElementById("ModalLeiras");


    ModalTitle.innerHTML = `${autok[id].marka} ${autok[id].modell}`;
    ModalSubtitle.innerHTML = `${autok[id].kivitel} | ${autok[id].evjarat}`;
    ModalAr.innerHTML = `${numberWithSpaces(autok[id].ar)} Ft`;
    ModalElado.innerHTML = `Eladó: ${autok[id].elado}`;
    ModalHelyszin.innerHTML = `Helyszín: ${autok[id].helyszin}`;
    ModalUzemanyag.innerHTML = `Üzemanyag: ${autok[id].uzemanyag}`;
    ModalLeiras.innerHTML = autok[id].leiras;

    ClearModalCarousel()
    if (autok[id].foto !== ""){
        SetModalCarouselItem(autok[id].foto, true);
    }
    else {
        SetModalCarouselItem(DefaultFoto, true);
    }
    if (autok[id].foto2 !== ""){
        SetModalCarouselItem(autok[id].foto2, false);
    }
    else {
        SetModalCarouselItem(DefaultFoto, false);
    }
    if (autok[id].foto3 !== ""){
        SetModalCarouselItem(autok[id].foto3), false;
    }
    else {
        SetModalCarouselItem(DefaultFoto, false);
    }
}

function ClearModalCarousel() {
    let ModalCarousel = document.getElementById("ModalCarousel");
    ModalCarousel.innerHTML = "";
}

function SetModalCarouselItem(foto, active = false) {
    let ModalCarousel = document.getElementById("ModalCarousel");
    if (active) {
        ModalCarousel.innerHTML += `
        <div class="carousel-item active">
            <img src="${foto}" class="d-block w-100" >
        </div>
    `;  
    }
    else{
        ModalCarousel.innerHTML += `
            <div class="carousel-item">
                <img src="${foto}" class="d-block w-100" >
            </div>
        `;
    }
}


function Kereses() {
    const marka = markaInput.value.toLowerCase();
    const modell = modellInput.value.toLowerCase();
    const kivitel = kivitelDropdown.toLowerCase();

    // szűrés a bemenetek alapján
    AutokFilter = autok.filter(auto => {
        return (
            (marka === "" || auto.marka.toLowerCase().includes(marka)) && //márkára szűrés (ha üres akkor minden találatot visszaad)
            (modell === "" || auto.modell.toLowerCase().includes(modell)) && //modellre szűrés (ha üres akkor minden találatot visszaad)
            (kivitel === "" || auto.kivitel.toLowerCase().includes(kivitel))
        );
    });

    // regi kartyak torlese
    const TalalatokDiv = document.getElementById("talalatok");
    TalalatokDiv.innerHTML = "";

    // új kártyák létrehozása
    AutokFilter.forEach(item => {
        CreateCard(
            item.marka,
            item.modell,
            item.kivitel,
            item.evjarat,
            item.ar,
            item.foto,
            item.uzemanyag,
            item.id
        );
    });
};
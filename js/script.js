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


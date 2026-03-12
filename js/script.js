function includeHtml(name) {
    fetch(`./${name}.html`)
        .then(response => response.text())
        .then(html => document.querySelector(name).innerHTML = html);
}

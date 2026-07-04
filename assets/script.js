const titles = [
    "kiero morirme hoy!!!1",
    "EX ZETA BLOG !!",
    ">.<"
];

let ind = 0;

function changeTitle() {
    ind = (ind + 1) % titles.length;
    document.title = titles[ind];
}

setInterval(changeTitle, 2000);
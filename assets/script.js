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






document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('momiPaintCanvasLeft');
    const ctx = canvas.getContext('2d');
    const colorPreview = document.getElementById('momiCurrentColorPreview');
    
    let painting = false;
    let currentColor = '#000000';
    let brushSize = 3;

    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    function startPosition(e) {
        painting = true;
        draw(e);
    }

    function endPosition() {
        painting = false;
        ctx.beginPath();
    }

    function draw(e) {
        if (!painting) return;
        const rect = canvas.getBoundingClientRect();
        
        // 1. Calculamos la escala entre el tamaño interno del canvas y el tamaño CSS real en pantalla
        const escalaX = canvas.width / rect.width;
        const escalaY = canvas.height / rect.height;

        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;

        ctx.lineWidth = brushSize;
        ctx.strokeStyle = currentColor;

        // 2. Aplicamos la escala a las coordenadas restadas
        const xCalibrado = (clientX - rect.left) * escalaX;
        const yCalibrado = (clientY - rect.top) * escalaY;

        ctx.lineTo(xCalibrado, yCalibrado);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(xCalibrado, yCalibrado);
    }

    canvas.addEventListener('mousedown', startPosition);
    canvas.addEventListener('mouseup', endPosition);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseleave', endPosition);

    canvas.addEventListener('touchstart', (e) => { e.preventDefault(); startPosition(e); });
    canvas.addEventListener('touchend', endPosition);
    canvas.addEventListener('touchmove', (e) => { e.preventDefault(); draw(e); });

    window.selectPaintColor = function(color) {
        currentColor = color;
        colorPreview.style.background = color;
        brushSize = (color === '#ffffff') ? 12 : 3;
    };

    window.clearCanvas = function() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    };
});
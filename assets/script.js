document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. ROTACIÓN DEL TÍTULO DE LA PESTAÑA
    // ==========================================
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


    // ==========================================
    // 2. ROTACIÓN DEL NICKNAME (.grid_nav-nickname)
    // ==========================================
    const nicknameElemento = document.querySelector('.grid_nav-nickname');
    const nicknames = [
        "BASURA",
        "ex zeta",
        "momi 2008",
        "offline...",
        "loading..."
    ];
    let indiceNick = 0;

    function cambiarNickname() {
        if (nicknameElemento) {
            indiceNick = (indiceNick + 1) % nicknames.length;
            nicknameElemento.textContent = nicknames[indiceNick];
        }
    }
    setInterval(cambiarNickname, 4000);


    // ==========================================
    // 3. ENTRADAS DEL BLOG (Tu "Base de Datos" JS)
    // ==========================================
    const entradas = [
        {
            titulo: "TODOS PUTOS XDDD",
            fecha: "7 de julio de 2026",
            contenido: "ola hijos de mil puta bienvenidos ami blog los odio mueranse jejeje",
            imagen: "https://media.tenor.com/Ki9hLQ4Zl7UAAAAM/trollface-troll-face.gif",
            // Esta entrada no tiene imagen, se muestra solo el texto
        }
    ];

    // Buscamos el elemento <main class="grid_main">
    const mainContenedor = document.querySelector('.grid_main');

    if (mainContenedor) {
        // Limpiamos el contenido estático de prueba que tenías antes (el Lorem Ipsum)
        mainContenedor.innerHTML = ''; 

        // Recorremos el array y creamos las entradas una por una
        entradas.forEach(post => {
            const articulo = document.createElement('article');
            articulo.className = 'blog-post';
            
            let postHTML = `
                <small class="post-fecha">${post.fecha}</small>
                <h2 class="post-titulo">${post.titulo}</h2>
                <p class="post-contenido">${post.contenido}</p>
            `;
            
            // Corregido: Ahora verifica y usa 'imagen' correctamente
            if (post.imagen) {
                postHTML += `<img src="${post.imagen}" class="post-imagen" alt="Imagen del post">`;
            }

            postHTML += '<hr class="post-separador">';

            articulo.innerHTML = postHTML;
            mainContenedor.appendChild(articulo);
        });
    }


    // ==========================================
    // 4. WIDGET DE PAINT (CALIBRADO Y RESPONSIVO)
    // ==========================================
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
        
        const escalaX = canvas.width / rect.width;
        const escalaY = canvas.height / rect.height;

        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;

        ctx.lineWidth = brushSize;
        ctx.strokeStyle = currentColor;

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
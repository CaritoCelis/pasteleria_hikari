// Simulamos base de datos de noticias con contenido HTML completo
const noticias = {
    1: {
        titulo: "🎂 Pastelería Hikari deslumbra con un pastel de 5 metros en matrimonio",
        imagenes: ["/img/gigante_7.jpg"],
        contenido: `
            <p>¡Un momento que quedará en la memoria de todos! 💖</p>
            <p>En un reciente matrimonio, <strong>Pastelería Hikari</strong> sorprendió a los invitados con un <strong>pastel de 5 metros de largo</strong>, creado especialmente para la ocasión. Cada detalle fue pensado para <strong>impresionar tanto a la vista como al paladar</strong>.</p>
            <h3>✨ Detalles que marcaron la diferencia:</h3>
            <ul>
                <li><strong>Tamaño monumental:</strong> 5 metros de largo que se robaron todas las miradas.</li>
                <li><strong>Decoración impecable:</strong> elegante, delicada y hecha a medida para los novios.</li>
                <li><strong>Sabores irresistibles:</strong> combinación perfecta de texturas y dulzura que encantó a todos.</li>
            </ul>
            <p>Los novios y sus invitados quedaron maravillados al ver cómo la creatividad y pasión de Pastelería Hikari se tradujeron en <strong>una obra de arte comestible</strong>.</p>
            <p><strong>🎉 Un evento inolvidable</strong><br>Con esta creación, Pastelería Hikari reafirma su compromiso de <strong>hacer de cada celebración un momento único</strong>, donde tradición, calidad y originalidad se mezclan en cada bocado.</p>
            <p>💡 <strong>Tip Hikari:</strong> Si quieres que tu evento sea recordado para siempre, nuestros <strong>pasteles personalizados</strong> están diseñados para superar todas tus expectativas.</p>
        `
    },
    2: {
        titulo: "Curiosidad: La miel prolonga la frescura de los panes 🍯",
        imagenes: ["/img/miel.jpg"],
        contenido: `
            <p>¿Sabías que un ingrediente tan natural como la <strong>miel</strong> puede hacer que los panes se mantengan frescos por más tiempo?</p>
            <p>En Pastelería Hikari aplicamos este truco tradicional en algunas recetas para ofrecerte panes que conserven su textura y sabor por más días, sin necesidad de conservantes artificiales.</p>
            <h3>✨ Por qué funciona:</h3>
            <ul>
                <li>La miel actúa como humectante natural, reteniendo la humedad dentro del pan y evitando que se reseque rápidamente.</li>
                <li>Contiene azúcares y enzimas que ayudan a mantener el pan suave y delicioso.</li>
                <li>Este método se conoce desde la antigüedad y sigue siendo mucho más efectivo y saludable que muchos aditivos modernos.</li>
            </ul>
            <h3>🌾 Beneficios para ti:</h3>
            <ul>
                <li>Panes más frescos y esponjosos durante más tiempo.</li>
                <li>Sabor ligeramente dulce y natural que potencia la experiencia de cada bocado.</li>
                <li>Alternativa saludable y tradicional para cuidar tu alimentación.</li>
            </ul>
            <p>💡 <strong>Tip Hikari:</strong> Prueba nuestros panes con miel y notarás la diferencia desde la primera mordida.</p>
        `
    },
    3: {
        titulo: "Novedad: Cheesecake de temporada 🍓🍫",
        imagenes: [
            "/img/cheesecake_5.jpeg",
            "/img/cheesecake_6.jpeg",
            "/img/cheesecake_7.jpeg",
            "/img/cheesecake_9.jpeg"
        ],
        contenido: `
        <p>Hikari presenta su nueva línea de <strong>cheesecakes artesanales</strong> sin azúcar añadido, elaborados con frutas frescas de estación y combinaciones irresistibles como <strong>frutilla–chocolate, maracuyá–coco y arándano–vainilla</strong>. Cada cheesecake está cuidadosamente preparado para lograr un equilibrio perfecto entre cremosidad, dulzura natural y frescura.</p>

    <h3>✨ Características</h3>
    <ul>
        <li>🍰 Postres ligeros, coloridos y sin azúcares refinados.</li>
        <li>🍓 Frutas de temporada que aportan sabor natural y vibrante.</li>
        <li>🥥 Combinaciones seleccionadas para que cada bocado sea único.</li>
        <li>🌰 Base crujiente hecha con ingredientes naturales que potencia los sabores del relleno.</li>
        <li>🎨 Decoración artesanal con frutas frescas, chocolate o semillas, cuidando cada detalle.</li>
    </ul>

    <h3>💡 Tip Hikari</h3>
    <ul>
        <li>Sirve los cheesecakes ligeramente fríos para potenciar su cremosidad y frescura.</li>
        <li>Combínalos con infusiones, cafés especiales o jugos naturales para una experiencia completa.</li>
        <li>Prueba nuestras combinaciones exclusivas de temporada, que cambian constantemente.</li>
        <li>Personaliza tu cheesecake con toppings como frutas adicionales, nueces o salsas caseras.</li>
    </ul>

    <h3>🎉 Experiencia Hikari</h3>
    <p>Cada cheesecake está pensado no solo para deleitar el paladar, sino también para crear momentos de alegría y celebración. Perfectos para cumpleaños, reuniones familiares o simplemente para darte un gusto especial en cualquier momento del día.</p>
    </div>
        `
    },
    4: {
        titulo: "Dato curioso: El pan integral y sus beneficios 🌾🍞",
        imagenes: ["/img/panes.jpg"],
        contenido: `
            <p>El pan integral se elabora con <strong>granos enteros</strong> que conservan el salvado y el germen, a diferencia del pan blanco que usa harina refinada. Esto lo convierte en un alimento más nutritivo y lleno de beneficios.</p>
            <h3>Beneficios del pan integral:</h3>
            <ul>
                <li>🌱 <strong>Rico en fibra:</strong> ayuda a mejorar la digestión y mantiene la sensación de saciedad por más tiempo.</li>
                <li>💪 <strong>Vitaminas y minerales:</strong> el germen aporta vitaminas del complejo B, hierro, magnesio y antioxidantes naturales.</li>
                <li>⚡ <strong>Energía sostenida:</strong> los carbohidratos complejos proporcionan energía constante.</li>
                <li>🍀 <strong>Más natural y saludable:</strong> ingredientes 100% naturales, sin conservantes ni azúcares refinados añadidos.</li>
            </ul>
            <h3>Tip Hikari:</h3>
            <p>Combina tu pan integral con semillas, frutos secos o cremas de frutas naturales para potenciar su sabor y beneficios. ¡Un pan saludable puede ser también delicioso! 😋</p>
        `
    }
};


const params = new URLSearchParams(window.location.search);
const id = params.get('id');
const contenedorImagenes = document.getElementById('imagenes');

if(noticias[id]){
    document.getElementById('titulo').textContent = noticias[id].titulo;
    document.getElementById('contenido').innerHTML = noticias[id].contenido;

    contenedorImagenes.innerHTML = '';
    noticias[id].imagenes.forEach(src=>{
        const img = document.createElement('img');
        img.src = src;
        img.alt = noticias[id].titulo;
        img.className = 'imagen-detalle';
        contenedorImagenes.appendChild(img);

        // Modal al hacer clic
        img.addEventListener('click', ()=>{
            document.getElementById('modal').style.display = "block";
            document.getElementById('imagen-modal').src = src;
        });
    });
} else {
    document.getElementById('titulo').textContent = "Noticia no encontrada";
    document.getElementById('contenido').textContent = "La noticia que buscas no existe o fue eliminada.";
}

// Cerrar modal
document.getElementById('cerrar-modal').onclick = ()=>{
    document.getElementById('modal').style.display = "none";
}

// Cerrar modal al hacer clic fuera de la imagen
document.getElementById('modal').onclick = (e)=>{
    if(e.target === document.getElementById('modal')) document.getElementById('modal').style.display = "none";
}
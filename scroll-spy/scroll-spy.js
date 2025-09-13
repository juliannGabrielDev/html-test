// Espera a que el contenido del DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    // Selecciona todas las secciones (h2) dentro del main
    const sections = document.querySelectorAll('main h2');
    // Selecciona todos los elementos de la lista de navegación
    const navLinks = document.querySelectorAll('nav li');

    // Función que se ejecuta al hacer scroll
    function onScroll() {
        let currentSection = ''; // Variable para almacenar la sección actual
        const scrollPosition = window.scrollY + 200; // Ajusta la posición de desplazamiento

        // Itera sobre cada sección para determinar la sección actual
        sections.forEach(section => {
            const sectionTop = section.offsetTop; // Obtiene la posición superior de la sección
            if (scrollPosition >= sectionTop) { // Comprueba si la posición de desplazamiento es mayor o igual a la posición superior de la sección
                currentSection = section.getAttribute('id'); // Obtiene el ID de la sección actual
            }
        });

        // Itera sobre cada elemento de la lista de navegación
        navLinks.forEach(li => {
            li.classList.remove('active'); // Elimina la clase 'active' de todos los elementos
            if (li.id === `nav-${currentSection}`) { // Comprueba si el ID del elemento de navegación coincide con la sección actual
                li.classList.add('active'); // Añade la clase 'active' al elemento correspondiente
            }
        });
    }

    // Añade un evento de desplazamiento a la ventana
    window.addEventListener('scroll', onScroll);
    // Ejecuta la función onScroll al cargar la página para establecer el estado inicial
    onScroll();
});
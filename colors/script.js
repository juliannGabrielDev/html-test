// Función principal para llenar la tabla con colores
function fillColorTable() {
    // Lista de nombres de colores
    const colorNames = [
        'Red', 'Orange', 'Amber', 'Yellow', 'Lime', 'Green',
        'Emerald', 'Teal', 'Cyan', 'Sky', 'Blue', 'Indigo',
        'Violet', 'Purple', 'Fuchsia', 'Pink', 'Rose',
        'Slate', 'Gray', 'Zinc', 'Neutral', 'Stone'
    ];
    
    // Lista de tonos de colores
    const shades = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'];
    
    // Seleccionar todas las filas de la tabla
    const rows = document.querySelectorAll('.color-palette tr');

    // Iterar sobre cada fila de la tabla
    rows.forEach((row, rowIndex) => {
        // Saltar la fila del encabezado
        if (rowIndex === 0) return;

        // Obtener el nombre del color correspondiente a la fila actual
        const colorName = colorNames[rowIndex - 1].toLowerCase();
        
        // Seleccionar todas las celdas de la fila actual
        const cells = row.querySelectorAll('td');

        // Iterar sobre cada tono de color
        for (let i = 0; i < shades.length; i++) {
            // Verificar si la celda existe
            if (cells[i + 1]) {
                // Obtener el nombre de la variable CSS para el tono de color actual
                const shade = shades[i];
                const varName = `--${colorName}-${shade}`;
                
                // Obtener el valor del color desde las variables CSS
                const colorValue = getComputedStyle(document.documentElement).getPropertyValue(varName).trim();

                // Establecer el color de fondo de la celda
                cells[i + 1].style.backgroundColor = colorValue;
                
                // Mostrar el valor hexadecimal del color como texto en la celda
                cells[i + 1].textContent = colorValue;

                // Ajustar el color del texto para asegurar legibilidad
                const isLight = isLightColor(colorValue);
                cells[i + 1].style.color = isLight ? '#000' : '#fff';
            }
        }
    });
}

// Función para determinar si un color es claro u oscuro
function isLightColor(hexColor) {
    // Convertir el valor hexadecimal a RGB
    let hex = hexColor.replace('#', '');
    let r = parseInt(hex.substr(0, 2), 16);
    let g = parseInt(hex.substr(2, 2), 16);
    let b = parseInt(hex.substr(4, 2), 16);

    // Calcular la luminosidad del color
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.5; // Retorna true si el color es claro
}

function copyInnerTextToClipboard() {
    const cells = document.querySelectorAll('.color-palette td:not(:first-child)');
    cells.forEach(cell => {
        cell.addEventListener('click', () => {
            const text = cell.textContent;
            navigator.clipboard.writeText(text);
            alert(`"${text}" copiado al portapapeles`);
        });
    });
}

document.addEventListener('DOMContentLoaded', copyInnerTextToClipboard);
document.addEventListener('DOMContentLoaded', fillColorTable);
document.addEventListener('DOMContentLoaded', () => {

    const formulario = document.querySelector('.reporte__formulario');

    // Obtener el ID de la auditoría desde la URL
    const params = new URLSearchParams(window.location.search);
    const auditoriaId = params.get('auditoriaId');


    formulario.addEventListener('submit', async (event) => {
        event.preventDefault();
    
        const titulo = document.querySelector('#titulo').value.trim();
        const descripcion = document.querySelector('#descripcion').value.trim();
        const fecha = document.querySelector('#fecha').value.trim();
        const autor = document.querySelector('#autor').value.trim();
    
        if (!titulo || !descripcion || !fecha || !autor) {
            alert('Todos los campos son obligatorios');
            return;
        }
    
        const data = { titulo, descripcion, fecha, autor, auditoriaId };
    
        try { 
            const response = await fetch(`http://localhost:3000/auditorias/${auditoriaId}/reportes`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
    
            if (response.ok) {
                alert('Reporte creado con éxito');
                formulario.reset(); // Limpia los campos del formulario
                obtenerReportes();
            } else {
                alert('Error al crear el reporte');
            }
        } catch (error) {
            console.error('Detalle del error:', error); 
            alert('No se pudo conectar al servidor');
        }
    });    

    const contenedorReportes = document.getElementById('contenedor-reportes');

    // Función para obtener reportes desde el servidor
    const obtenerReportes = async () => {
        try {
            const response = await fetch(`http://localhost:3000/auditorias/${auditoriaId}/reportes`,);
            if (response.ok) {
                const reportes = await response.json();
                mostrarReportes(reportes); // Renderiza los reportes en el DOM
            } else {
                console.error('Error al obtener los reportes:', await response.json());
            }
        } catch (error) {
            console.error('Error de red:', error);
        }
    };

    // Función para mostrar los reportes en el HTML
    const mostrarReportes = (reportes) => {

        contenedorReportes.innerHTML = ''; // Limpiar contenedor
        if (reportes.length === 0) {
            contenedorReportes.innerHTML = '<p>No hay reportes disponibles.</p>';
            return;
        }

        reportes.forEach((reporte) => {
            const div = document.createElement('div');
            div.classList.add('reporte__item');
            div.innerHTML = `
                <h3>${reporte.titulo}</h3>
                <p><strong>Auditoría ID:</strong> ${reporte.auditoriaId}</p>
                <p><strong>Descripción:</strong> ${reporte.descripcion}</p>
                <p><strong>Fecha de creación:</strong> ${new Date(reporte.createdAt).toLocaleDateString()}</p>
                <button class="btn-eliminar" data-id="${reporte.id}">Eliminar</button>
            `;
            contenedorReportes.appendChild(div);
        });
                 // Agregar eventos a los botones después de renderizar
                    document.querySelectorAll('.btn-eliminar').forEach((btn) => {
                    btn.addEventListener('click', eliminarReporte);
               });
    };


        const eliminarReporte = async (event) => {
            const id = event.target.dataset.id; // Obtiene el ID de la auditoría desde el atributo data-id
            console.log(id)
            const confirmar = confirm('¿Estás seguro de eliminar esta auditoría?');
            if (!confirmar) return;
        
            try {
                const response = await fetch(`http://localhost:3000/reportes/${id}`, {
                    method: 'DELETE',
                });
        
                if (response.ok) {
                    alert('Auditoría eliminada con éxito');
                    obtenerReportes(); // Actualiza la lista de auditorías
                } else {
                    alert('Error al eliminar la auditoría');
                }
            } catch (error) {
                console.error('Error de red:', error);
                alert('No se pudo conectar al servidor');
            }
        };


    // Llama a la función para inicializar los reportes
    obtenerReportes();
     
});

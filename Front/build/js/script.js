document.addEventListener('DOMContentLoaded', () => {
    const formulario = document.querySelector('.auditoria__formulario'); // Seleccionamos el foclearmulario
    const contenedorAuditorias = document.querySelector('.auditoria__grid'); // Contenedor para las auditorías

    // Función para obtener y mostrar las auditorías
    const obtenerAuditorias = async () => {
        try {
            const response = await fetch('http://localhost:3000/auditorias');
            if (response.ok) {
                const auditorias = await response.json();
                mostrarAuditorias(auditorias); // Llama a la función para renderizar
            } else {
                console.error('Error al obtener auditorías:', await response.json());
            }
        } catch (error) {
            console.error('Error de red:', error);
        }
    };

    function redirigirACrearReporte(auditoriaId) {
        // Cambia la URL según la estructura de tus archivos
        window.location.href = `reportes.html?auditoriaId=${auditoriaId}`;
    }

    // Función para renderizar las auditorías en el HTML
    const mostrarAuditorias = (auditorias) => {
        contenedorAuditorias.innerHTML = ''; // Limpia el contenedor antes de renderizar
    
        auditorias.forEach((auditoria) => {
            const div = document.createElement('div');
            div.classList.add('auditoria__item'); // Clase para estilos
            div.innerHTML = `
                <h3>${auditoria.nombre}</h3>
                <p><strong>Ubicación</strong> ${auditoria.ubicacion}</p>
                <p><strong>Fecha</strong> ${auditoria.fecha}</p>
                <p><strong>Auditor</strong> ${auditoria.auditor}</p>
                <button class="btn-eliminar" data-id="${auditoria.id}">Eliminar</button>
                <button class="btn-reporte" data-id="${auditoria.id}">Crear Reporte</button>
            `;
    
            contenedorAuditorias.appendChild(div);
        });
    
        // Agregar eventos a los botones después de renderizar
        document.querySelectorAll('.btn-eliminar').forEach((btn) => {
            btn.addEventListener('click', eliminarAuditoria);
        });
    
        document.querySelectorAll('.btn-reporte').forEach((btn) => {
            btn.addEventListener('click', (event) => {
                const auditoriaId = event.target.dataset.id; // Obtén el id desde el atributo data-id
                redirigirACrearReporte(auditoriaId); // Pasa el id como argumento
            });
        });
        
    };
    

    // Evento de envío del formulario
    formulario.addEventListener('submit', async (event) => {
        event.preventDefault(); // Evita que el formulario recargue la página

        // Capturamos los datos de los campos del formulario
        const nombre = document.querySelector('#nombre').value.trim();
        const ubicacion = document.querySelector('#ubicacion').value.trim();
        const fecha = document.querySelector('#fecha').value.trim();
        const auditor = document.querySelector('#auditor').value.trim();

        // Validamos que no estén vacíos
        if (!nombre || !ubicacion || !fecha || !auditor) {
            alert('Todos los campos son obligatorios');
            return;
        }

        // Preparamos el objeto para enviar
        const data = {
            nombre,
            ubicacion,
            fecha,
            auditor,
        };

        try {
            // Realizamos la petición POST al backend
            const response = await fetch('http://localhost:3000/auditorias', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                alert('Auditoría creada con éxito');
                formulario.reset(); // Limpia los campos del formulario
                obtenerAuditorias(); // Actualiza la lista de auditorías
            } else {
                const error = await response.json();
                console.error('Error al crear la auditoría:', error);
                alert('Ocurrió un error al crear la auditoría');
            }
        } catch (error) {
            console.error('Error de red:', error);
            alert('No se pudo conectar al servidor');
        }
    });


    const eliminarAuditoria = async (event) => {
        const id = event.target.dataset.id; // Obtiene el ID de la auditoría desde el atributo data-id
    
        const confirmar = confirm('¿Estás seguro de eliminar esta auditoría?');
        if (!confirmar) return;
    
        try {
            const response = await fetch(`http://localhost:3000/auditorias/${id}`, {
                method: 'DELETE',
            });
    
            if (response.ok) {
                alert('Auditoría eliminada con éxito');
                obtenerAuditorias(); // Actualiza la lista de auditorías
            } else {
                alert('Error al eliminar la auditoría');
            }
        } catch (error) {
            console.error('Error de red:', error);
            alert('No se pudo conectar al servidor');
        }
    };

    // Inicializa mostrando las auditorías existentes
    obtenerAuditorias();
});

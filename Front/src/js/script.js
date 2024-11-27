// document.addEventListener('DOMContentLoaded', function(){
//     crearAuditoria();
// } );



// function crearAuditoria () {
//     const add = document.querySelector('#button')
//     const inputName = document.querySelector('#nombre')
//     const inputUb = document.querySelector('#ubicacion')
//     const inputDate = document.querySelector('#fecha')
//     const inputAud = document.querySelector('#auditor')
//     const grid = document.querySelector('.auditoria__grid')

//     add.addEventListener('click', function (e) {
//         e.preventDefault();
//         const nombre = document.createElement('P')
//         const ubicacion = document.createElement('P')
//         const fecha = document.createElement('P')
//         const auditor = document.createElement('P')
//         const auditoria = document.createElement('A')

//         nombre.textContent = inputName.value;
//         ubicacion.textContent = inputUb.value;
//         fecha.textContent = inputDate.value;
//         auditor.textContent = inputAud.value

    
//         auditoria.appendChild(nombre)
//         auditoria.appendChild(ubicacion)
//         auditoria.appendChild(fecha)
//         auditoria.appendChild(auditor)
    
//         grid.appendChild(auditoria)
//     }) 

// }




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

    // Función para renderizar las auditorías en el HTML
    const mostrarAuditorias = (auditorias) => {
        contenedorAuditorias.innerHTML = ''; // Limpia el contenedor antes de renderizar

        auditorias.forEach((auditoria) => {
            const div = document.createElement('div');
            div.classList.add('auditoria__item'); // Puedes agregar estilos con esta clase
            div.innerHTML = `
                <h3>${auditoria.nombre}</h3>
                <p><strong>Ubicación:</strong> ${auditoria.ubicacion}</p>
                <p><strong>Fecha:</strong> ${auditoria.fecha}</p>
                <p><strong>Auditor:</strong> ${auditoria.auditor}</p>
            `;
            contenedorAuditorias.appendChild(div);
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

    // Inicializa mostrando las auditorías existentes
    obtenerAuditorias();
});

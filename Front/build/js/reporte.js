document.addEventListener('DOMContentLoaded', () => {
    const formulario = document.querySelector('.reporte__formulario');

    // Obtener el ID de la auditoría desde la URL
    const params = new URLSearchParams(window.location.search);
    const auditoriaId = params.get('auditoriaId');

    formulario.addEventListener('submit', async (event) => {
        event.preventDefault();

        // Capturar datos del formulario
        const descripcion = document.querySelector('#descripcion').value.trim();
        const fecha = document.querySelector('#fecha').value.trim();

        if (!descripcion || !fecha) {
            alert('Todos los campos son obligatorios');
            return;
        }

        // Crear el objeto del reporte
        const data = {
            descripcion,
            fecha,
            auditoriaId, // Asociar el reporte con la auditoría
        };

        try {
            // Enviar reporte al backend
            const response = await fetch('http://localhost:3000/reportes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                alert('Reporte creado con éxito');
                window.location.href = 'index.html'; // Redirigir al inicio
            } else {
                alert('Error al crear el reporte');
            }
        } catch (error) {
            console.error('Error de red:', error);
            alert('No se pudo conectar al servidor');
        }
    });
});

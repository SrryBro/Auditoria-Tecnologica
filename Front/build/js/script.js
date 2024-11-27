document.addEventListener('DOMContentLoaded', function(){
    crearAuditoria();
} );



function crearAuditoria () {
    const add = document.querySelector('#button')
    const inputName = document.querySelector('#nombre')
    const inputUb = document.querySelector('#ubicacion')
    const inputDate = document.querySelector('#fecha')
    const inputAud = document.querySelector('#auditor')
    const grid = document.querySelector('.auditoria__grid')

    add.addEventListener('click', function (e) {
        e.preventDefault();
        const nombre = document.createElement('P')
        const ubicacion = document.createElement('P')
        const fecha = document.createElement('P')
        const auditor = document.createElement('P')
        const auditoria = document.createElement('A')

        nombre.textContent = inputName.value;
        ubicacion.textContent = inputUb.value;
        fecha.textContent = inputDate.value;
        auditor.textContent = inputAud.value

    
        auditoria.appendChild(nombre)
        auditoria.appendChild(ubicacion)
        auditoria.appendChild(fecha)
        auditoria.appendChild(auditor)
    
        grid.appendChild(auditoria)
    }) 

}



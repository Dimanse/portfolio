let paso = 1;
const pasoInicial = 1;
const pasoFinal = 3;

const cita = {
    id: '',
    nombre: '',
    fecha: '',
    hora_id: '',
    servicios: []
}

document.addEventListener('DOMContentLoaded', function() {
    iniciarApp();
});

function iniciarApp() {
    mostrarSeccion(); // Muestra y oculta las secciones
    tabs(); // Cambia la sección cuando se presionen los tabs
    botonesPaginador(); // Agrega o quita los botones del paginador
    paginaSiguiente(); 
    paginaAnterior();

    consultarAPI(); // Consulta la API en el backend de PHP

    idCliente();
    nombreCliente(); // Añade el nombre del cliente al objeto de cita
    seleccionarFecha(); // Añade la fecha de la cita en el objeto
    // seleccionarHora(); // Añade la hora de la cita en el objeto
    selectHour(); // Añade la hora de la cita en el objeto

    mostrarResumen(); // Muestra el resumen de la cita
}

function mostrarSeccion() {

    // Ocultar la sección que tenga la clase de mostrar
    const seccionAnterior = document.querySelector('.mostrar');
    if(seccionAnterior) {
        seccionAnterior.classList.remove('mostrar');
    }

    // Seleccionar la sección con el paso...
    const pasoSelector = `#paso-${paso}`;
    const seccion = document.querySelector(pasoSelector);
    seccion.classList.add('mostrar');

    // Quita la clase de actual al tab anterior
    const tabAnterior = document.querySelector('.actual');
    if(tabAnterior) {
        tabAnterior.classList.remove('actual');
    }

    // Resalta el tab actual
    const tab = document.querySelector(`[data-paso="${paso}"]`);
    tab.classList.add('actual');
}

function tabs() {

    // Agrega y cambia la variable de paso según el tab seleccionado
    const botones = document.querySelectorAll('.tabs button');
    botones.forEach( boton => {
        boton.addEventListener('click', function(e) {
            e.preventDefault();

            paso = parseInt( e.target.dataset.paso );
            mostrarSeccion();

            botonesPaginador(); 
        });
    });
}

function botonesPaginador() {
    const paginaAnterior = document.querySelector('#anterior');
    const paginaSiguiente = document.querySelector('#siguiente');

    if(paso === 1) {
        paginaAnterior.classList.add('ocultar');
        paginaSiguiente.classList.remove('ocultar');
    } else if (paso === 3) {
        paginaAnterior.classList.remove('ocultar');
        paginaSiguiente.classList.add('ocultar');

        mostrarResumen();
    } else {
        paginaAnterior.classList.remove('ocultar');
        paginaSiguiente.classList.remove('ocultar');
    }

    mostrarSeccion();
}

function paginaAnterior() {
    const paginaAnterior = document.querySelector('#anterior');
    paginaAnterior.addEventListener('click', function() {

        if(paso <= pasoInicial) return;
        paso--;
        
        botonesPaginador();
    })
}
function paginaSiguiente() {
    const paginaSiguiente = document.querySelector('#siguiente');
    paginaSiguiente.addEventListener('click', function() {

        if(paso >= pasoFinal) return;
        paso++;
        
        botonesPaginador();
    })
}

async function consultarAPI() {

    try {
        const url = '/api/servicios';
        const resultado = await fetch(url);
        const servicios = await resultado.json();
        mostrarServicios(servicios);
    
    } catch (error) {
        console.log(error);
    }
}

function mostrarServicios(servicios) {
    servicios.forEach( servicio => {
        const { id, nombre, precio } = servicio;

        const nombreServicio = document.createElement('P');
        nombreServicio.classList.add('nombre-servicio');
        nombreServicio.textContent = nombre;

        const precioServicio = document.createElement('P');
        precioServicio.classList.add('precio-servicio');
        precioServicio.textContent = `$${precio}`;

        const servicioDiv = document.createElement('DIV');
        servicioDiv.classList.add('servicio');
        servicioDiv.dataset.idServicio = id;
        servicioDiv.onclick = function() {
            seleccionarServicio(servicio);
        }

        servicioDiv.appendChild(nombreServicio);
        servicioDiv.appendChild(precioServicio);

        document.querySelector('#servicios').appendChild(servicioDiv);

    });
}

function seleccionarServicio(servicio) {
    const { id } = servicio;
    const { servicios } = cita;

    // Identificar el elemento al que se le da click
    const divServicio = document.querySelector(`[data-id-servicio="${id}"]`);

    // Comprobar si un servicio ya fue agregado 
    if( servicios.some( agregado => agregado.id === id ) ) {
        // Eliminarlo
        cita.servicios = servicios.filter( agregado => agregado.id !== id );
        divServicio.classList.remove('seleccionado');
    } else {
        // Agregarlo
        cita.servicios = [...servicios, servicio];
        divServicio.classList.add('seleccionado');
    }
    // console.log(cita);
}

function idCliente() {
    cita.id = document.querySelector('#id').value;
}
function nombreCliente() {
    cita.nombre = document.querySelector('#nombre').value;
}

function seleccionarFecha() {
    const inputFecha = document.querySelector('#fecha');
    inputFecha.addEventListener('input', function(e) {

        const dia = new Date(e.target.value).getUTCDay();
        const diaFestivo = new Date(e.target.value).getUTCDate();
        const mes = new Date(e.target.value).getUTCMonth() +1;


        if( [6, 0].includes(dia) ) {
            e.target.value = '';
            mostrarAlerta('Fines de semana no permitidos', 'error', '.formulario');
        } else if((1 === diaFestivo & 1 === mes) ||
        (28 === diaFestivo & 3 === mes) ||
        (29 === diaFestivo & 3 === mes) ||
        (11 === diaFestivo & 4 === mes) ||
        (1 === diaFestivo  & 5 === mes) ||
        (25 === diaFestivo  & 7 === mes) ||
        (2 === diaFestivo  & 8 === mes) ||
        (15 === diaFestivo & 8 === mes) ||
        (1 === diaFestivo & 11 === mes) ||
        (25 === diaFestivo & 12 === mes)

){
   e.target.value= "";
   mostrarAlerta("No trabajamos los feriados", "error", ".formulario");
}
else{
            cita.fecha = e.target.value;
        }
        
    });
}

// function seleccionarHora() {
//     const inputHora = document.querySelector('#hora');
//     inputHora.addEventListener('input', function(e) {


//         const horaCita = e.target.value;
//         const hora = horaCita.split(":")[0];
//         if(hora < 10 || hora > 18) {
//             e.target.value = '';
//             mostrarAlerta('Hora No Válida', 'error', '.formulario');
//         } else {
//             cita.hora = e.target.value;

//             // console.log(cita);
//         }
//     })
// }


function selectHour(){
    const horas = document.querySelector('#horas');
    const inputHidenHora = document.querySelector('[name="hora_id"]')
    console.log(inputHidenHora);
    if(horas){
        let busqueda = {
            fecha: '',
        }
        const fecha = document.querySelector('#fecha');
        fecha.addEventListener('input', terminoBusqueda)
        
        function terminoBusqueda(e){
             const fechaValue = document.querySelector('#fecha').value;
            // fechaValue = e.target.value;
            // Reiniciar los campos ocultos y los campos de horas
            inputHidenHora.value = '';
            const horaPrevia = document.querySelector('.hora-seleccionada');
            if(horaPrevia){
                horaPrevia.classList.remove('hora-seleccionada');
            }
            busqueda[e.target.name] = e.target.value;
            buscarCitas();
        }
        
        async function buscarCitas(){
            const { fecha } = busqueda;
            const url = `/api/cita?fecha=${fecha}`;
            // const url = `/api/citas?fecha=${fecha}`;
            const respuesta = await fetch(url);
             const citas = await respuesta.json();
            //  console.log(citas);
            obtenerHorasDisponibles(citas);

        }

        function obtenerHorasDisponibles(citas){


              // Reiniciar las horas
              const listadoHoras = document.querySelectorAll('#horas li');
              listadoHoras.forEach(li => li.classList.add('hora--deshabilitada'));

              //Comprobar citas ya tomadas y quitar la variable de deshabilitado
              const horasTomadas = citas.map(cita => cita.hora_id);
              const listadoHorasArray = Array.from(listadoHoras);

            const resultado = listadoHorasArray.filter( li => !horasTomadas.includes(li.dataset.horaId) );
            resultado.forEach( li => li.classList.remove('hora--deshabilitada') )
            // console.log(resultado);
            
            const horasDisponibles = document.querySelectorAll('#horas li:not(.hora--deshabilitada)');
            horasDisponibles.forEach( hora => hora.addEventListener('click', horaSeleccionar));

            const horasDeshabilitadas = document.querySelectorAll('.horas__hora--deshabilitada');
            horasDeshabilitadas.forEach(hora => hora.removeEventListener('click', horaSeleccionar));
            
            
            //  console.log(horasNoDisponibles);
        }

        function horaSeleccionar(e){

            //Deshabilitar hora previa si hay un nuevo click
            const horaPrevia = document.querySelector('.hora-seleccionada');
            if(horaPrevia){
                horaPrevia.classList.remove('hora-seleccionada');
            }

            // Agregar clase seleccionada
            e.target.classList.add('hora-seleccionada');
            inputHidenHora.value = e.target.dataset.horaId;
            cita.hora_id = inputHidenHora.value;
            cita.hora = e.target.textContent;
                // console.log(e.target.textContent);
        }
        // console.log(fechaValue);
    }
}

console.log(cita);

function mostrarAlerta(mensaje, tipo, elemento, desaparece = true) {

    // Previene que se generen más de 1 alerta
    const alertaPrevia = document.querySelector('.alerta');
    if(alertaPrevia) {
        alertaPrevia.remove();
    }

    // Scripting para crear la alerta
    const alerta = document.createElement('DIV');
    alerta.textContent = mensaje;
    alerta.classList.add('alerta');
    alerta.classList.add(tipo);

    const referencia = document.querySelector(elemento);
    referencia.appendChild(alerta);

    if(desaparece) {
        // Eliminar la alerta
        setTimeout(() => {
            alerta.remove();
        }, 3000);
    }
  
}


function mostrarResumen() {
    const resumen = document.querySelector('.contenido-resumen');

    // Limpiar el Contenido de Resumen
    while(resumen.firstChild) {
        resumen.removeChild(resumen.firstChild);
    }

    if(Object.values(cita).includes('') || cita.servicios.length === 0 ) {
        mostrarAlerta('Faltan datos de Servicios, Fecha u Hora', 'error', '.contenido-resumen', false);

        return;
    } 

    // Formatear el div de resumen
    const { nombre, fecha, hora, servicios } = cita;



    // Heading para Servicios en Resumen
    const headingServicios = document.createElement('H3');
    headingServicios.textContent = 'Resumen de Servicios';
    resumen.appendChild(headingServicios);

    // Iterando y mostrando los servicios
    servicios.forEach(servicio => {
        const { id, precio, nombre } = servicio;
        const contenedorServicio = document.createElement('DIV');
        contenedorServicio.classList.add('contenedor-servicio');

        const textoServicio = document.createElement('P');
        textoServicio.textContent = nombre;

        const precioServicio = document.createElement('P');
        precioServicio.innerHTML = `<span>Precio:</span> $${precio}`;

        contenedorServicio.appendChild(textoServicio);
        contenedorServicio.appendChild(precioServicio);

        resumen.appendChild(contenedorServicio);
    });

    // Heading para Cita en Resumen
    const headingCita = document.createElement('H3');
    headingCita.textContent = 'Resumen de Cita';
    resumen.appendChild(headingCita);

    const nombreCliente = document.createElement('P');
    nombreCliente.innerHTML = `<span>Nombre:</span> ${nombre}`;

    // Formatear la fecha en español
    const fechaObj = new Date(fecha);
    const mes = fechaObj.getMonth();
    const dia = fechaObj.getDate() + 2;
    const year = fechaObj.getFullYear();

    const fechaUTC = new Date( Date.UTC(year, mes, dia));
    
    const opciones = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'}
    const fechaFormateada = fechaUTC.toLocaleDateString('es-MX', opciones);

    const fechaCita = document.createElement('P');
    fechaCita.innerHTML = `<span>Fecha:</span> ${fechaFormateada}`;

    const horaCita = document.createElement('P');
    horaCita.innerHTML = `<span>Hora:</span> ${hora} Horas`;

    // Boton para Crear una cita
    const botonReservar = document.createElement('BUTTON');
    botonReservar.classList.add('boton');
    botonReservar.textContent = 'Reservar Cita';
    botonReservar.onclick = reservarCita;

    resumen.appendChild(nombreCliente);
    resumen.appendChild(fechaCita);
    resumen.appendChild(horaCita);

    resumen.appendChild(botonReservar);
}

async function reservarCita() {
    
    const { nombre, fecha, hora_id, servicios, id } = cita;

    const idServicios = servicios.map( servicio => servicio.id );
    // console.log(idServicios);

    const datos = new FormData();
    
    datos.append('fecha', fecha);
    datos.append('hora_id', hora_id );
    datos.append('usuarioId', id);
    datos.append('servicios', idServicios);

    // console.log([...datos]);

    try {
        // Petición hacia la api
        const url = '/api/citas'
        const respuesta = await fetch(url, {
            method: 'POST',
            body: datos
        });

        const resultado = await respuesta.json();
        console.log(resultado);
        
        if(resultado.resultado) {
            Swal.fire({
                icon: 'success',
                title: 'Cita Creada',
                text: 'Tu cita fue creada correctamente',
                button: 'OK'
            }).then( () => {
                setTimeout(() => {
                    window.location.reload();
                }, 3000);
            })
        }
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Hubo un error al guardar la cita'
        })
    }

    
    // console.log([...datos]);

}


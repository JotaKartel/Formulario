// JavaScript Document
const butValidar = window.document.getElementById("butValidar");
const txtNombre = window.document.getElementById("txtNombre");
const txtTelefonoFijo = window.document.getElementById("txtTelefonoFijo");
const txtTelefonoMovil = window.document.getElementById("txtTelefonoMovil");
const txtCP = window.document.getElementById("txtCP");
const txtFNac = window.document.getElementById("txtFNac");
const txtEmail = window.document.getElementById("txtEmail");
const selCoche = window.document.getElementById("selCoche");
const casillasExtra = window.document.getElementById("divCasillas");
const validar = window.document.getElementById("divValidar");

window.onload = function() {
    txtNombre.addEventListener('input', validarTexto, false);
    txtTelefonoFijo.addEventListener('input', validarTelefonoFijo, false);
    txtTelefonoMovil.addEventListener('input', validarTelefonoMovil, false);
    txtCP.addEventListener('input', validarCP, false);
    txtFNac.addEventListener('input', validarFecha, false);
    txtEmail.addEventListener('input', validarEmail, false);
    selCoche.addEventListener('change', validarLista, false);
    casillasExtra.addEventListener('change', validarCasillas, false);
    butValidar.addEventListener('click', validarForm, false);
}

let clearRender = function(e) {
    const nodo = window.document.getElementById(e).getElementsByTagName('span')[0];
    if (nodo && nodo.parentNode) {
        nodo.parentNode.removeChild(nodo);
    }
}

let renderError = function(e) {
    clearRender(e);
    let span = window.document.createElement('span');
    span.innerHTML = "<img src='img/cerrar.png' width='10' />";
    window.document.getElementById(e).appendChild(span);
}

let renderOk = function(e) {
    clearRender(e);
    let span = window.document.createElement('span');
    span.innerHTML = "<img src='./img/doble-verificacion.png' width='10' />";
    window.document.getElementById(e).appendChild(span);
}

let renderHelp = function() {
    validar.innerHTML = '<div id="divValNombre">Nombre:</div><div id="divValTlfF">Teléfono Fijo:</div><div id="divValTlfM">Teléfono Móvil:</div><div id="divValCP">CP:</div><div id="divValFNac">Fecha de nacimiento:</div><div id="divValEmail">Email:</div><div id="divValSelCoche">Tipo de Coche:</div><div id="divValCExtra">Extras del coche:</div>';
}

function validarTexto() {
    !testTexto(txtNombre, 3, 100) ? renderError('divValNombre') : renderOk('divValNombre');
}

function validarTelefonoFijo() {
    !testTelefonoFijo(txtTelefonoFijo) ? renderError('divValTlfF') : renderOk('divValTlfF');
}

function validarTelefonoMovil() {
    !testTelefonoMovil(txtTelefonoMovil) ? renderError('divValTlfM') : renderOk('divValTlfM');
}

function validarCP() {
    !testCPNacional(txtCP) ? renderError('divValCP') : renderOk('divValCP');
}

function validarEmail() {
    !testEmail(txtEmail) ? renderError('divValEmail') : renderOk('divValEmail');
}

function validarFecha() {
    !testFecha(txtFNac) ? renderError('divValFNac') : renderOk('divValFNac');
}

function validarLista() {
    !testLista(selCoche) ? renderError('divValSelCoche') : renderOk('divValSelCoche');
}

function validarCasillas() {
    !testCasillas(casillasExtra, 1, 3) ? renderError('divValCExtra') : renderOk('divValCExtra');
}

function validarForm() {
    validarTexto();
    validarTelefonoFijo();
    validarTelefonoMovil();
    validarCP();
    validarEmail();
    validarFecha();
    validarLista();
    validarCasillas();

    const validaciones = [
        testTexto(txtNombre, 3, 100),
        testTelefonoFijo(txtTelefonoFijo),
        testTelefonoMovil(txtTelefonoMovil),
        testCPNacional(txtCP),
        testEmail(txtEmail),
        testFecha(txtFNac),
        testLista(selCoche),
        testCasillas(casillasExtra, 1, 3)
    ];

    if (validaciones.every(Boolean)) {
        mostrarDatos();
    } else {
        alert("Hay errores en el formulario. Por favor, corrígelos.");
    }
}

function mostrarDatos() {
    const nombre = txtNombre.value;
    const telefonoFijo = txtTelefonoFijo.value;
    const telefonoMovil = txtTelefonoMovil.value;
    const cp = txtCP.value;
    const fechaNacimiento = txtFNac.value;
    const email = txtEmail.value;
    const tipoCoche = selCoche.options[selCoche.selectedIndex].text;
    
    const extrasSeleccionados = [];
    const checkboxes = casillasExtra.querySelectorAll('input[type="checkbox"]:checked');
    checkboxes.forEach(checkbox => {
        extrasSeleccionados.push(checkbox.nextElementSibling.innerText);
    });

    document.getElementById("nombreDatos").innerText = "Nombre: " + nombre;
    document.getElementById("telefonoFijoDatos").innerText = "Teléfono Fijo: " + telefonoFijo;
    document.getElementById("telefonoMovilDatos").innerText = "Teléfono Móvil: " + telefonoMovil;
    document.getElementById("cpDatos").innerText = "Código Postal: " + cp;
    document.getElementById("fechaNacDatos").innerText = "Fecha de Nacimiento: " + fechaNacimiento;
    document.getElementById("emailDatos").innerText = "Email: " + email;
    document.getElementById("tipoCocheDatos").innerText = "Tipo de Coche: " + tipoCoche;
    document.getElementById("extrasDatos").innerText = "Extras: " + (extrasSeleccionados.length > 0 ? extrasSeleccionados.join(", ") : "Ninguno");

    document.getElementById("divDatos").style.display = "block";
}

function testTexto(input, min, max) {
    const texto = input.value.trim();
    return texto.length >= min && texto.length <= max;
}

function testTelefonoFijo(input) {
    const telefono = input.value.trim();
    return telefono.match(/^(\+34|0034|34)?[ -]?[6-9][ -]?([0-9][ -]?){8}$/);
}

function testTelefonoMovil(input) {
    const telefono = input.value.trim();
    return telefono.match(/^(\+34|0034|34)?[ -]?([67][0-9]{8})$/);
}

function testCPNacional(input) {
    const cp = input.value.trim();
    return cp.match(/^[0-9]{5}$/);
}

function testEmail(input) {
    const email = input.value.trim();
    return email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);
}

function testFecha(input) {
    const fecha = input.value.trim();
    const fechaRegex = /^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/;
    if (!fecha.match(fechaRegex)) {
        return false;
    }

    const partes = fecha.split('/');
    const dia = parseInt(partes[0], 10);
    const mes = parseInt(partes[1], 10) - 1; 
    const anio = parseInt(partes[2], 10);
    const fechaNacimiento = new Date(anio, mes, dia);

    const fechaActual = new Date();
    const edad = fechaActual.getFullYear() - fechaNacimiento.getFullYear();
    const mesActual = fechaActual.getMonth();
    const diaActual = fechaActual.getDate();

    return (edad > 18 || (edad === 18 && (mesActual > mes || (mesActual === mes && diaActual >= dia))));
}

function testLista(input) {
    return input.value !== "";
}

function testCasillas(input, min, max) {
    const casillas = input.getElementsByTagName('input');
    let count = 0;
    for (let i = 0; i < casillas.length; i++) {
        if (casillas[i].checked) {
            count++;
        }
    }
    return count >= min && count <= max;
}
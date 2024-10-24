// JavaScript Document
function testTexto(campo,min,max){
	min=(typeof min==='undefined')?0:min;
	max=(typeof max==='undefined')?"":max;
	const valor=campo.value;
	const expresion="^[a-zA-Z\\sá-úÁ-Ú'à-ùÀ-Ùä-üÄ-Ü]{"+min+","+max+"}$";
	const rExp=new RegExp(expresion);
	return rExp.test(valor);
}

function testEmail(campo){
	const valor=campo.value;
	const expresion="^[\\w\\-\\.]{3,}@([\\w\\-\\.]{2,})\\.[\\w\\-]{2,4}$";
	const rExp=newRegExp(expresion);
	return rExp.test(valor);
}

function testCPNacional(campo){
	const valor=campo.value;
	const expresion="^([0-5][0-2]\\d{3}|(070|071|080)\\d{2})$";
	const rExp=new RegExp(expresion);
	return rExp.test(valor);
}

function testTelefonoFijo(campo){
	const valor=campo.value;
	const expresion="^(\\+\\d{2,3}|00\\d{2})?[89]\\d{8}$";
	const rExp=new RegExp(expresion);
	return rExp.test(valor);
}

function testTelefonoMovil(input) {
    const telefono = input.value.trim();
    return telefono.match(/^(\+34|0034|34)?[67][0-9]{8}$/);
}

function testFecha(input) {
    const fecha = input.value.trim();
    const fechaRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/(19|20)\d\d$/;
    if (!fecha.match(fechaRegex)) {
        return false;
    }

    const partes = fecha.split('/');
    const dia = parseInt(partes[0], 10);
    const mes = parseInt(partes[1], 10) - 1;
    const anio = parseInt(partes[2], 10);
    const fechaNacimiento = new Date(anio, mes, dia);

    if (fechaNacimiento.getFullYear() !== anio || 
        fechaNacimiento.getMonth() !== mes || 
        fechaNacimiento.getDate() !== dia) {
        return false; 
    }

    const fechaActual = new Date();
    const edad = fechaActual.getFullYear() - fechaNacimiento.getFullYear();
    const mesActual = fechaActual.getMonth();
    const diaActual = fechaActual.getDate();

    return (edad > 18 || (edad === 18 && (mesActual > mes || (mesActual === mes && diaActual >= dia))));
}

function testlista(select){
	const index=select.selectedIndex;
	return(index===null)?-1:index;
}
function testCasillas(casillas,min,max){
	min=(typeof min==='undefined')?0:min;
	max=(typeof max==='undefined')?"":max;
	const seleccionados=casillas.querySelectorAll('input[type="checkbox"):checked');
	if (seleccionados.length<min||seleccionados.length>max)
		return false;
	else
		return seleccionados;
}
var datosjson = valores;


/*---------------------------------------*/

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./swcriper.js')
      .then(reg => console.log('Registro de SW exitoso', reg))
      .catch(err => console.warn('Error al tratar de registrar el sw', err))
  }

/*---------------------------------------*/






function armar(arreglo) {
    totalpaginas = 0;
    var filasxpag = 6;
    var conteodepag = -1;
    console.log(arreglo);
    var fila = "";
    fila += ' <div class=\"pagina\" id=\"pagini\">';
    for (x in arreglo) {
        fila += '<div class=\"fila\" onclick="cargar(this.dataset.orden)"data-orden=\"' + arreglo[x].id_orden + '\">';
        fila += '<div class="avatar ';
        fila += arreglo[x].estado;
        fila += '\">';
        fila += '<span>OT</span>';
        fila += '<h1>' + arreglo[x].id_orden + '</h1>';
        fila += '</div>';
        fila += '<div class=\"descripcion\">';
        fila += '<h2>' + arreglo[x].cliente + '</h2>';
        fila += '<span>' + arreglo[x].estado + '-' + arreglo[x].producto + '</span>';
        fila += '</div>';
        fila += '<div class="fecha">';
        fila += '<span>01-12</span>';
        fila += '<span>2016</span>';
        fila += '</div>';
        fila += '</div>';
        if (x == (conteodepag + filasxpag)) {
            conteodepag += filasxpag;
            fila += '</div><!--fin de pag-' + x + '-' + conteodepag + '-->\n <div class=\"pagina\" id=\"pag' + totalpaginas + '\">';
            ++totalpaginas;
        }

    }
    document.getElementById('visual').innerHTML = fila;
    paginacion();
    fila = "";
}



function paginacion() {
    var anchopagina = document.getElementById('visual').scrollWidth; //ancho del div
    var posicion = document.getElementById('visual').scrollLeft;
    var ajuste = totalpaginas; //ajuste en 0
    var pixeleporventa = (anchopagina / ajuste);
    //console.log('ancho',pixeleporventa);
    var npag = posicion / pixeleporventa;
    //console.log('Nro de pag',npag);
    document.getElementById('nro_pag').innerHTML = parseInt(npag);
    ultima = '#pag' + (totalpaginas - 1);
    document.getElementById('ult').setAttribute('href', ultima);
    npag = parseInt(npag);
    var an = '#pag' + (npag - 1);
    if (npag - 1 == -1) { an = '#pagini'; }
    var po = '#pag' + (npag + 1);
    document.getElementById('ant').setAttribute('href', an);
    document.getElementById('post').setAttribute('href', po);
}

var aguja = '';

function filtrar_entodo(filtrado) {
    mayu = aguja.toUpperCase(); //mayusculas
    minu = aguja.toLowerCase(); //minusculas
    if (filtrado.cliente === null) {} else {
        if (filtrado.cliente.indexOf(minu) != -1 || filtrado.cliente.indexOf(mayu) != -1) {
            console.log(filtrado.cliente);
            return true;
        }
    }

    if (filtrado.producto === null) {} else {
        if (filtrado.producto.indexOf(minu) != -1 || filtrado.producto.indexOf(mayu) != -1) {
            //console.log(filtrado.producto);
            return true;
        }
    }
    if (filtrado.estado === null) {} else {
        if (filtrado.estado.indexOf(minu) != -1 || filtrado.estado.indexOf(mayu) != -1) {
            // console.log(filtrado.estado);
            return true;
        }
    }

    if (filtrado.id_orden === null) {} else {
        if (filtrado.id_orden.indexOf(aguja) != -1) {
            //console.log(filtrado.id_orden);
            return true;
        }
    }
}




function filtrado_total(agu) {
    aguja = agu; //global
    console.log(datosjson.filter(filtrar_entodo));
    if (aguja.length > 0) {
        armar(datosjson.filter(filtrar_entodo));
    }

}

function ordenpuntual(or) {

    if (or.id_orden === null) {} else {
        if (or.id_orden == aguja) {
            // console.log(or.id_orden);
            return true;
        }

    }
}


function borrar_aguja() {
    document.getElementById('termino').value = '';
    armar(datosjson);
}




///cargar en el modal orden seleccionada////////////////////////////////////
function cargar(or) {
    //console.log(or);
    aguja = or;
    var orden = datosjson.filter(ordenpuntual); //filtra con la orden puntual 
    console.log(orden);
    let est = document.getElementById('estado');
    let pro = document.getElementById('producto');
    let com = document.getElementById('comercio');
    let fal = document.getElementById('falla');
    let dom = document.getElementById('domicilio');
    let loc = document.getElementById('localidad');
    let tel = document.getElementById('telefono');
    let cor = document.getElementById('correo');
    let tik = document.getElementById('ticket');
    let rep = document.getElementById('rephasta');
    let asg = document.getElementById('aseg');

    if (orden[0].estado != null) {
        est.innerHTML = orden[0].estado;
    }
    pro.innerHTML = orden[0].producto + '-' + orden[0].marca + '-' + orden[0].marca + 'MOD ' + orden[0].modelo + '-SN:' + orden[0].serie;
    com.innerHTML = orden[0].compradoen;
    fal.innerHTML = orden[0].observaciones;
    dom.innerHTML = orden[0].domicilio;
    if (orden[0].localidad === null) {} else {
        loc.innerHTML = orden[0].localidad;
    }
    if (orden[0].telefono === null) {} else {
        tel.innerHTML = orden[0].telefono;
    }
    if (orden[0].selectseguro === null) {} else {
        asg.innerHTML = orden[0].selectseguro;
    }
    if (orden[0].selectseguro === null) {} else {
        asg.innerHTML = orden[0].selectseguro;
    }

    if (orden[0].repararhasta === null) {} else {
        rep.innerHTML = orden[0].repararhasta;
    }

    if (orden[0].email === null) {} else {
        cor.innerHTML = orden[0].email;
    }

    if (orden[0].ticket === null) {} else {
        cor.innerHTML = orden[0].ticket;
    }

    var historiaHTML = '<ul>';
    var notas = JSON.parse(orden[0].notas);

    for (n in notas) {

        historiaHTML += '<li>';
        historiaHTML += '<div class=\"hfecha\">' + notas[n].fecha + '</div>';
        historiaHTML += '<div class=\"hestado\">' + notas[n].nota + '</div>';
        historiaHTML += '<div class=\"hoperador\">' + notas[n].operador + '</div>';
        historiaHTML += '</li>';

    }

    historiaHTML += '</ul>';

    document.getElementById('historia').innerHTML = historiaHTML;
    //console.log(historiaHTML);

    var historiaHTML = '';






    modal('ver');

}
/////////////////////////////////////////////////////////////7///

//vista y o paertura del modal //////////////////////
function modal(op) {
    if (op == 'ver') {
        document.getElementById('modal').className = 'modalfichaver';
    }
    if (op == 'cerrar') {
        document.getElementById('modal').className = 'modalfichanover';
    }
}
//////////////////////////////////////////////////////////////////
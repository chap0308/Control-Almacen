let paso = 1;
//solo tenemos 3 paginas
const pasoInicial = 1;
const pasoFinal = 3;

const pedidos = {
    preVentas:[],
    clientes1:{},
    fecha: '',
    cantidad: [],
    productos: [],
    vaciador:[]
}


document.addEventListener('DOMContentLoaded', function() {
    iniciarApp();
});

function iniciarApp() {
    mostrarSeccion(); // Muestra y oculta las secciones, esto es para que inicie con un paso, en este caso se puso al inicio let paso=1. Por eso comienza mostrando el paso 1 de la seccion
    tabs();
    botonesPaginador();//se le pone cuando comienza y para que borre el boton de anterior
    paginaSiguiente(); 
    paginaAnterior();
    consultarAPI();//backend
    seleccionarFecha();
    mostrarResumen();
    vaciar();
}
function mostrarSeccion(){
    //IMPORTANTE: GUIATE DE <button class="actual" type="button" data-paso="1">
    // Ocultar la sección que tenga la clase de mostrar
    const seccionAnterior = document.querySelector('.mostrar');//se le asigna seccionAnterior como variable al que tiene como nombre mostrar en su clase
    if(seccionAnterior) {//Para que no inicie con error
        seccionAnterior.classList.remove('mostrar');//esto borra al que estaba antes, y solo borra cuando se le da click. Al inicio no lo borra porque no hay interaccion.
                                                    //sino eliminaria todo al que tiene este nombre en su clase al inicio.
    }

    // Seleccionar la sección con el paso...
    const pasoSelector = `#paso-${paso}`;//reemplaza el valor que obtuvimos de tabs() en su anterior numero de paso, el # es para los que son de id
    const seccion = document.querySelector(pasoSelector);
    seccion.classList.add('mostrar');//Y le añade la clase mostrar, OJO ESTE VA A ESTAR AL INICIO EN LA PRIMERA SECCION POR DEFAULT, YAQUE esta funcion está iniciada en iniciarApp()
                                    //NO NECESARIAMENTE DEBE FUNCIAR ESTO POR LA FUNCION tabs(). IMPORTANTE

    // Quita la clase de actual al tab anterior
    const tabAnterior = document.querySelector('.actual');
    if(tabAnterior) {//si es que 
        tabAnterior.classList.remove('actual');
    }

    // Resalta el tab actual
    const tab = document.querySelector(`[data-paso="${paso}"]`);//importante poner el -
    tab.classList.add('actual');

}

function tabs() {//esta funcion elige el numero del paso del boton, mas no muestra la seccion

    // Agrega y cambia la variable de paso según el tab seleccionado
    const botones = document.querySelectorAll('.tabs button');//nos da información de los que tienen esa clase, pero como es un all te da de todos los que tiene ese nombre
    botones.forEach( boton => {
        boton.addEventListener('click', function(e) {//el addEvenListener no puede ser usado en un querySelectorAll, pero si lo iteras con un forEach, sí se puede
            //console.log(typeof e.target.dataset.paso);//cuando das click en los botones, te da la informacion de cuantas veces lo estás dando
            //console.log(parseInt( e.target.dataset.paso));//se diferencian con el color de los strings
            e.preventDefault();

            paso = parseInt( e.target.dataset.paso );
            mostrarSeccion();
            botonesPaginador(); //se le pone acá tambien para que cuando se de click en los botones, se actualicen los paso y determine que mostrar o no en esta funcion
        });
    });
}

function botonesPaginador() {
    const paginaAnterior = document.querySelector('#anterior');
    const paginaSiguiente = document.querySelector('#siguiente');

    if(paso === 1) {
        paginaAnterior.classList.add('ocultar');
        paginaSiguiente.classList.remove('ocultar');
        vaciar();
        quitar();
    } else if (paso === 3) {
        paginaAnterior.classList.remove('ocultar');
        paginaSiguiente.classList.add('ocultar');
        mostrarResumen();
        // agregarDatos();
    } else {
        paginaAnterior.classList.remove('ocultar');
        paginaSiguiente.classList.remove('ocultar');
        vaciar();
        quitar();
    }
    mostrarSeccion();
}

function paginaAnterior() {
    const paginaAnterior = document.querySelector('#anterior');
    paginaAnterior.addEventListener('click', function() {

        if(paso <= pasoInicial) return;
        paso--;
        
        botonesPaginador();//pasamos la logica ya hecha en la anterior funcion
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

async function consultarAPI() {//async y await van siempre juntos, y el await hace que espere a que se termine de ejecutar una funcion

    try {
        // const url = `${location.origin}/api/productos`;//esta es la url que se va a consumir, la url que tiene el api
        const url = '/api/productos';//esta es la url que se va a consumir, la url que tiene el api
        const resultado = await fetch(url);//funcion que permite consumir este los datos de la url(en este caso son de la tabla servicios)
        
        const datos = await resultado.json();//
        //console.log(productos['productos']); //con esto se puede ver los array en la consola
        mostrarProductos(datos['productos'],datos['clientes']);
        //idCliente(datos['clientes']);
    
    } catch (error) {
        console.log(error);
    }
}

function mostrarProductos(productos=[],clientes=[]) {
    productos.forEach( producto => {
        // let {cantidad, preVentas}=pedidos;
        const {id, descripcion, precio_unitarioVenta, stock } = producto;

        const datosCant={
            id: producto.id,
            cant: null
        }
        const datosPreV={
            id: producto.id,
            cant: null
        }
        let color='';

        if(stock<=10){
            color='red';
        }else if(stock<=25){
            color='yellow';
        }else{
            color='green';
        }

        //se crean codigos de hmtl
        const descripcionProducto = document.createElement('P');
        descripcionProducto.classList.add('nombre-servicio');
        descripcionProducto.textContent = descripcion;

        const precio_costoProducto = document.createElement('P');
        precio_costoProducto.classList.add(`precio-servicio`);
        precio_costoProducto.textContent = precio_unitarioVenta==0 || stock==0 ? '': `$ ${precio_unitarioVenta}`;
        precio_costoProducto.setAttribute('style',"display: inline-grid;");
        const span = document.createElement("SPAN");
        span.classList.add(`${color}`);
        span.textContent = `Stock: ${stock}`;
        span.setAttribute('style',"margin-left: 70rem;color: black;padding:0.4rem;");
        precio_costoProducto.appendChild(span);

        const productoDiv = document.createElement('DIV');//acá se crea un <di></di>

        productoDiv.classList.add('servicio');
        if(stock==0){
            productoDiv.classList.add('disabled');
        }

        productoDiv.dataset.idProducto = id;//este significa crear mi propia variable en html, este es lo que se crea: data-id-servicio="id"
        productoDiv.onclick = function() {//IMPORTANTE PARA SELECCIONAR CADA SERVICIO
            seleccionarProducto(producto);
            seleccionarCantidad(datosCant);
            seleccionarPreVenta(datosPreV);
        }

        productoDiv.appendChild(descripcionProducto);//se insertan los nombres
        productoDiv.appendChild(precio_costoProducto);//se insertan los precios
        

        document.querySelector('#servicios').appendChild(productoDiv);//ACÁ SE COLOCA LO CREADO, en este caso en la linea 14 <div id="servicios" class="listado-servicios"></div>
        
    });

    

    clientes.forEach( cliente => {
        
        const {id, nombre}=cliente;
        const option=document.createElement('option');
        option.value = `${id}`;
        option.textContent=`${nombre}`;
        document.querySelector('#cliente').appendChild(option);
        
        
    });
    //CLIENTES
    document.querySelector('#cliente').addEventListener('change',e=>{

        const idClie=e.target.value;
        //pedidos.clientes1.id=e.target.value;
        //seleccionarClientes(clientes);
        //let {clientes1}=pedidos;
        for(let i=0;i<clientes.length;i++){
            if(clientes[i].id==idClie){
                pedidos.clientes1=clientes[i];
                
            }
            
        }
        
        //pedidos.clientes1.id=idCliente;


        //CLIENTES
        //console.log(pedidos);//PARA SABER EL CLIENTE QUE SE HA AGREGADO
    });
    
    /*
    function filtrarCliente() {
    
        const resultado=clientes.filter( filtrarIdCliente );   
    }
    function filtrarIdCliente(cliente){
        console.log(cliente);  
        
    }
    */

    
}



function seleccionarProducto(producto) {
        
    const { id } = producto;//ESTE ES DE LOS DATOS DEL JSON
    
    const { productos } = pedidos;//ESTE ES DEL OBJETO CITA DE ARRIBA, EN EL COMIENZO. No confundir con el servicio que se selecciona cuando das click, es decir el que esta una linea arriba

    // Identificar el elemento al que se le da click
    const divProducto = document.querySelector(`[data-id-producto="${id}"]`);//acá se coloca el id seleccionado en esta variable hmtl
    
    // Comprobar si un servicio ya fue agregado, es como si fuera un propery_exits
    if( productos.some( agregado => agregado.id === id ) ) {//agregado es como un nuevo array que viene de servicios(similar al foreach).
    //servicios.some te dará como resultado true o false    //Luego comparamos el agregado.id con el servicio.id, pero como ya extraimos antes ese id al inicio de esta funcion, entonces solo ponemos id.
    //Si ya existe un id que ya está en servicios entonces es porque ya está seleccionado y por ende se elimina:
    //some: comprueba si en productos hay un id que sea igual al id de todos lo productos del json, es decir si está seleccionado(coincide el id)
        // Eliminarlo
        pedidos.productos = productos.filter( agregado => agregado.id !== id );//agrega todos los productos que no tengan el mismo id que los datos de json. Los agrega en pedidos.productos
        // pedidos.cantidad = productos.filter( agregado => agregado!== agregado );
        // pedidos.preVentas = productos.filter( agregado => agregado!== agregado );
        //osea que si hay 3 elementos, va a elegir 2 que no tengan ese id y quita el seleccionado
        divProducto.classList.remove('seleccionado');   
    } else {//sino se agrega, porque no ha sido seleccionado
        // Agregarlo
        pedidos.productos = [...productos, producto];//IMPORTANTE, es para agregar el servicio(servicio) seleccionado en los servicios(servicios) del objeto cita 
        divProducto.classList.add('seleccionado');
    }
    //PRODUCTOS
    //console.log(pedidos);
    
}

function seleccionarCantidad(datosCant){
    const { id } = datosCant;

    const { cantidad } = pedidos;

    if(cantidad.some(agregado => agregado.id === id)){
        pedidos.cantidad = cantidad.filter( agregado => agregado.id !== id );
    }else{
        pedidos.cantidad = [...cantidad, datosCant];
    }
}

function seleccionarPreVenta(datosPreV){
    const { id } = datosPreV;

    const { preVentas } = pedidos;

    if(preVentas.some(agregado => agregado.id === id)){
        pedidos.preVentas = preVentas.filter( agregado => agregado.id !== id );
    }else{
        pedidos.preVentas = [...preVentas, datosPreV];
    }
}

/*
function idCliente(clientes){
    //pedidos.clientes=[...clientes,cliente]
    //pedidos.id=document.querySelector('#cliente').value;//establecemos el id del cliente con el value
    //pedidos.nombreCli= document.querySelector('#cliente').textContent;//acá no se le pone nada en el input, ya está predeterminado. Por eso, se le pone .value, ya que, en el value="" está su nombre
    const inputNombre = document.querySelector('#cliente');
    inputNombre.addEventListener('change', function(e) {
        const idCliente=e.target.value;
        const {clientes1}=pedidos;

        //console.log(clientes.pop());

        //pedidos.clientes1 = [...clientes1, clientes.pop()];
        
        clientes.forEach(cliente =>{
            
            if(idCliente==cliente.id){
                pedidos.clientes1 = [...clientes1, cliente];
                //const ultimo=pedidos.clientes1.pop();
            }
        });
        console.log(pedidos);
        //const ultimo=pedidos.clientes1.pop();
        //console.log(nombre.nombre);
        //console.log(ultimo);
        //console.log(pedidos.clientes1.pop());//obtener el ultimo
        //let selectedIndex = e.target.selectedIndex;

        // Obtén el elemento de opción seleccionado
        //let selectedOption = e.target.options[selectedIndex];

        // Obtén el texto de la opción seleccionada
        //let selectedText = selectedOption.text;

        //const cliente=[selectedText,idCliente];

        //const idCli= e.target.value;
    });
    
    
}
*/


//FECHA
function seleccionarFecha() {
    //PRUEBA PARA EL PROYECTO, tienes que sumarle 1 al max y en inventario tambien
    // document.querySelector('#fecha').addEventListener('input',e=>{
    //     pedidos.fecha=e.target.value;
    // })

    const inputFecha = document.querySelector('#fecha').value;//acá solo hacemos referencia al id
    pedidos.fecha=inputFecha;
        //FECHA
        //console.log(pedidos);
        //const stringFecha=fecha.toString();
        //pedidos.fecha=stringFecha;
        //console.log(pedidos);
        

}
function mostrarAlerta(mensaje, tipo, elemento,desaparece=true){//elemento=que tipo de elemento es en html, puede ser un id, clase, etc.
    //desaparece siempre va a ser true, por eso no es necesario ponerle algo si es que usas esa funcion,
    //pero si lo quieres como false, entonces agregale al final. Aún así si no lo pones funciona.
    // Previene que se generen más de 1 alerta
    const alertaPrevia = document.querySelector('.alerta');
    //if(alertaPrevia) return;//si no existe una clase que tenga alerta, se retorna y no sigue con lo de abajo
    if(alertaPrevia) {
    alertaPrevia.remove();
    }

    // Scripting para crear la alerta
    const alerta = document.createElement('DIV');
    alerta.textContent = mensaje;
    alerta.classList.add('alerta');
    alerta.classList.add(tipo);

    const referencia =document.querySelector(elemento);//referencia porque lo toma de un nombre de una clase o tipo en html
    //const referencia =document.querySelector('#paso-2 p');
    //var firstChild = referencia.firstChild; //se agrega el fisrtChild y luego se le coloca la funcio de abajo
    //referencia.insertBefore(alerta, firstChild);//con esto se puede agregar al inicio de un contenedor o div. OJO PARA QUE FUNCIONE TIENES QUE QUITAR EL p de #paso-2 
    referencia.appendChild(alerta);

    if(desaparece){
    setTimeout(() => {
    alerta.remove();
    }, 3000);
    }



}

function vaciar(){

    //eliminar
    //console.log("eliminar");
    // pedidos.cantidad=[];
    // pedidos.preVentas=[];

    pedidos.vaciador=[];
}

function quitar(){
    const pas3 = document.querySelector(`[data-paso="3"]`);
    if(pas3.hasAttribute('disabled')){
        pas3.removeAttribute('disabled');
    }
}

// function agregarDatos(){
//     let inpCant = document.querySelector('#actual');
// }


function mostrarResumen() {

    const boton = document.querySelector('.actual');

    if (boton.getAttribute('data-paso') === '3' && boton.classList.contains('actual')) {
        boton.disabled = true;
    }
    
    const resumen = document.querySelector('.contenido-resumen');
    // Limpiar el Contenido de Resumen
    while(resumen.firstChild) {
        resumen.removeChild(resumen.firstChild);
    }
    //para saber si un valor existe en un objeto se usa includes y para saber la cantidad de un array se usa length( tambien sirve para saber si está vacío)
    if(Object.keys(pedidos.clientes1).length === 0 || pedidos.productos.length === 0 || pedidos.fecha === '') {
        mostrarAlerta('Faltan datos de Productos, Fecha u Hora','error','.contenido-resumen',false);
        
        return;
    }
    
    // Formatear el div de resumen
    const { clientes1:{ nombre,email }, fecha, productos } = pedidos;
    // Heading para Servicios en Resumen
    const headingServicios = document.createElement('H3');
    headingServicios.textContent = 'Resumen de Productos';
    resumen.appendChild(headingServicios);

    const elementoPaso3 = document.querySelector('[data-paso="3"]');
    

    productos.forEach(producto => {
        const { vaciador,cantidad, preVentas }=pedidos;
        
        vaciador.push(null);

        // if(vaciador.length<productos.length){
        //     cantidad.push(null);
        //     preVentas.push(null);
        // }
        // if(vaciador.length>productos.length){
        //     cantidad.pop();
        //     preVentas.pop();
        // }
        
        // cantidad.push(null);
        // preVentas.push(null);

        const { descripcion, precio_unitarioVenta } = producto;
        const contenedorServicio = document.createElement('DIV');
        contenedorServicio.classList.add('contenedor-servicio');

        const textoProducto = document.createElement('P');
        textoProducto.textContent = descripcion;

        const precioProducto = document.createElement('P');
        precioProducto.innerHTML = `<span>Precio:</span> $${precio_unitarioVenta}`;


        const textCantidad= document.createElement('P');
        textCantidad.innerHTML = `<span>Cantidad: </span>`;

        const inputCantidad= document.createElement('input');
        inputCantidad.setAttribute("id", "cantidadProducto"+vaciador.length);
        inputCantidad.setAttribute("step", "1");
        inputCantidad.setAttribute("type", "number");
        textCantidad.appendChild(inputCantidad);                                               
        
        const precioVenta= document.createElement('P');
        precioVenta.innerHTML = `<span>Precio Venta: </span>`;
        
        const inputVenta= document.createElement('input');
        inputVenta.setAttribute("id", "precioVenta"+vaciador.length); 
        inputVenta.setAttribute("type", "number");
        inputVenta.setAttribute("step", "0.01");
        inputVenta.setAttribute("readonly", "");
        precioVenta.appendChild(inputVenta);
        

        contenedorServicio.appendChild(textoProducto);
        contenedorServicio.appendChild(precioProducto);
        contenedorServicio.appendChild(textCantidad);
        contenedorServicio.appendChild(precioVenta);
        resumen.appendChild(contenedorServicio);
        
    });
    
    //CALCULAR LA CANTIDAD Y LOS PRECIOS COMPRA
    for(let i=0; i<pedidos.vaciador.length;i++){
        let {cantidad, preVentas}=pedidos;
        if(cantidad[i].cant!==null){
            document.querySelector('#cantidadProducto'+(i+1)).value=cantidad[i].cant;
            document.getElementById('precioVenta'+(i+1)).value=preVentas[i].cant;
        }

        document.querySelector('#cantidadProducto'+(i+1)).addEventListener('input',e=>{
            //CALCULAR LA CANTIDAD
            const cant=e.target.value;
            cantNum=parseInt(cant);
            cantidad[i].cant=cantNum;
            //CALCULAR EL PRECIO COMPRA
            if(cant===''){
                document.getElementById('precioVenta'+(i+1)).value='';
                pedidos.preVentas[i].cant=null;
            }else if(cant){
                let result=cantidad[i].cant*productos[i].precio_unitarioVenta;
                nuevoResultado=result.toFixed(2);
                document.getElementById('precioVenta'+(i+1)).value=nuevoResultado;
                let valor=document.getElementById('precioVenta'+(i+1)).value;
                valorNum=parseFloat(valor);
                pedidos.preVentas[i].cant=valorNum;
            }

            //PRECIO Y CANTIDAD
            //console.log(pedidos);

        });
    }
    
    
    
    

    // Heading para Cliente en Resumen
    const headingCliente = document.createElement('H3');
    headingCliente.textContent = 'Resumen del Cliente';
    resumen.appendChild(headingCliente);

    const nombreCliente = document.createElement('P');
    nombreCliente.innerHTML = `<span>Nombre del Cliente:</span> ${nombre}`;

    const correoCliente = document.createElement('P');
    correoCliente.innerHTML = `<span>Correo del Cliente:</span> ${email}`;

    // Formatear la fecha en español
    const fechaObj = new Date(fecha);//primero se crea un nuevo objeto de Date y se le agrega la fecha del formulario, algo asi new Date('2023-04-25')
    const mes = fechaObj.getMonth();//obtenemos el numero del mes(0=enero, febrero=1, ...), no es que reste un mes, solo considera al mes uno menos pero igual va bien
    const dia = fechaObj.getDate() + 2;//se le sube +2 porque newDate() te resta un dia. Y como usamos 2 new Date() le sumamos 2.
    const year = fechaObj.getFullYear();//si es igual al año actual

    const fechaUTC = new Date( Date.UTC(year, mes, dia));//si da el año y el mes bien, pero el dia si le resta 2, por eso arriba se le suma
    //console.log(fechaUTC);// (Fri Oct 15 2021 19:00:00 GMT-0500)

    //weekday= nombre del dia(jueves,etc), year = formato: 2023, month = nombre del mes(junio,etc), day= numero del dia(10,11,etc)
    const opciones = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'}//se colocan en una variable

    //.toLocaleDateString solo toma objetos de fecha y los convierte a string, en este caso fechaUTC sale el nombre del año pero en ingles (Fri Oct 15 2021 19:00:00 GMT-0500), por eso usamos esas variable de abajo 
    const fechaFormateada = fechaUTC.toLocaleDateString('es-PE', opciones);//formato de idioma('es-PE')
    //console.log(fechaFormateada);//es igual a domingo, 21 de mayo de 2023
    const fechaCita = document.createElement('P');
    fechaCita.innerHTML = `<span>Fecha:</span> ${fechaFormateada}`;// y así lo convertimos en español

    // Boton para Guardar
    const botonGuardar = document.createElement('BUTTON');
    botonGuardar.classList.add('boton');
    botonGuardar.textContent = 'Guardar Pedido';
    /*
    //para agregarle un id a esa funcion
    botonReservar.onclick = function(){
        reservarCita(id)
    };
    */
    botonGuardar.onclick = validarPedido;
    
    resumen.appendChild(nombreCliente);
    resumen.appendChild(correoCliente);
    resumen.appendChild(fechaCita);

    resumen.appendChild(botonGuardar);

}

function validarPedido(){
    const resumen = document.querySelector('.contenido-resumen');
    const{preVentas,cantidad}=pedidos;
    const preVN=preVentas.map(producto=>parseFloat(producto.cant));
    const cantN=cantidad.map(producto=>parseInt(producto.cant));
    // if( preVN.includes(NaN) || preVN.includes(0) || cantN.includes(NaN)|| cantN.includes(0) ) {
    //     console.log("Faltan dat");
    // }else{
    //     console.log("Todo bien");
    // }
    // console.log(preVN);
    // console.log(cantN);
    // return;
    // Limpiar el Contenido de Resumen
    //para saber si un valor existe en un objeto se usa includes y para saber la cantidad de un array se usa length( tambien sirve para saber si está vacío)
    if( preVN.includes(NaN) || preVN.includes(0) || cantN.includes(NaN)|| cantN.includes(0) ) {
        mostrarAlerta('Completa todos los datos','error','.contenido-resumen',true);
        return;
    }else{
        guardarPedido(preVN,cantN);
    }
}

async function guardarPedido(preVN, cantN){
    const {fecha,productos,clientes1}=pedidos;

    const idClien=clientes1.id;
    const idProductos=productos.map(producto=>producto.id);
    const precioUVent=productos.map(producto=>parseFloat(producto.precio_unitarioVenta));
    const stock=productos.map(producto=>parseInt(producto.stock));

    //Stock actualizado
    const nuevoStock=stock.map((valor,indice)=>valor-cantN[indice]);

    //let total=0;
    //preVentas.forEach( precios=>total+=precios);
    //console.log(total);
    let precioTotal = preVN.reduce((total, producto) => total + producto, 0); //0 es el valor inicial del total
    
    // console.log(idClien);
    // console.log(idProductos);
    // console.log(cantidad);
    // console.log(preVentas);
    // console.log(preVN);
    // console.log(cantN);
    // console.log(nuevoStock);
    // console.log( precioTotal );
    // return;
    const datos= new FormData();
    //PEDIDOS
    //valores unitarios
    datos.append('clientes_id',idClien);
    datos.append('fecha_pedido',fecha);
    datos.append('precioTotal',precioTotal);

    //Detalle Pedido
    //arreglos, por eso se manda corregir en la API con explode()
    datos.append('productos',idProductos);
    datos.append('cantidad_salida',cantN);
    datos.append('precio_unitario',precioUVent);
    datos.append('precio_venta',preVN);

    //PRODUCTOS ACTUALIZAR
    //arreglo
    datos.append('stock',nuevoStock);

    try {
        const url = '/api/pedidos'

        const respuesta=await fetch(url,{
        method:'POST',
        body:datos //IMPORTANTE PARA PASAR LOS DATOS AL FETCH
        });

        const resultado=await respuesta.json();

        //console.log(resultado);
    
        if(resultado) {
            Swal.fire({
                icon: 'success',
                title: 'Pedido Registrado',
                text: 'El pedido fue registrado correctamente',
                button: 'OK'
            }).then( () => {
                    window.location.reload();
                    /*
                    setTimeout(() => {
                        window.location.reload();
                    }, 3000);
                    */
            })
        }} catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Hubo un error al registrar el pedido'
            })
        }
    
    
    //console.log([...datos]);
}
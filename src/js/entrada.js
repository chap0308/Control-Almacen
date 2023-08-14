let paso = 1;
//solo tenemos 3 paginas
const pasoInicial = 1;
const pasoFinal = 3;

const solicitud = {
    preCompras:[],
    proveedor1:{},
    fecha: '',
    cantidad: [],
    productos: [],
    precioCostoNuevo:[],
    gananciaS:[],
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
    consultarAPI();
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



function quitar(){
    const pas3 = document.querySelector(`[data-paso="3"]`);
    if(pas3.hasAttribute('disabled')){
        pas3.removeAttribute('disabled');
    }
}

async function consultarAPI() {//async y await van siempre juntos, y el await hace que espere a que se termine de ejecutar una funcion

    try {
        //! const url = `${location.origin}/api/productos`;
        const url = '/api/productos';//esta es la url que se va a consumir, la url que tiene el api
        const resultado = await fetch(url);//funcion que permite consumir este los datos de la url(en este caso son de la tabla servicios)
        
        const datos = await resultado.json();//
        //console.log(productos['productos']); //con esto se puede ver los array en la consola
        mostrarProductosyProveedores(datos['productos'],datos['proveedores']);
        //idCliente(datos['clientes']);
    
    } catch (error) {
        console.log(error);
    }
}


function mostrarProductosyProveedores(productos=[],proveedores=[]) {
    productos.forEach( producto => {
        const {id, descripcion, precio_costo,stock } = producto;
        const datosCant={
            id: producto.id,
            cant: null
        }
        const datosGan={
            id: producto.id,
            cant: producto.ganancia
        }
        const datosComp={
            id: producto.id,
            cant: null
        }
        const datosCostoNuevo={
            id: producto.id,
            cant: 0
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
        precio_costoProducto.classList.add('precio-servicio');
        precio_costoProducto.textContent = precio_costo==0 ? '':'$ '+precio_costo;
        precio_costoProducto.setAttribute('style',"display: inline-grid;");
        const span = document.createElement("SPAN");
        span.classList.add(`${color}`);
        span.textContent = `Stock: ${stock}`;
        span.setAttribute('style',"margin-left: 70rem;color: black;padding:0.4rem;");
        precio_costoProducto.appendChild(span);
        
        const productoDiv = document.createElement('DIV');//acá se crea un <di></di>
        productoDiv.classList.add('servicio');
        productoDiv.dataset.idProducto = id;//este significa crear mi propia variable en html, este es lo que se crea: data-id-servicio="id"
        productoDiv.onclick = function() {//IMPORTANTE PARA SELECCIONAR CADA SERVICIO
            seleccionarProducto(producto);
            seleccionarCantidad(datosCant);
            seleccionarGanancia(datosGan);
            seleccionarPreComp(datosComp);
            seleccionarCostoNuevo(datosCostoNuevo);
        }

        productoDiv.appendChild(descripcionProducto);//se insertan los nombres
        productoDiv.appendChild(precio_costoProducto);//se insertan los precios

        document.querySelector('#servicios').appendChild(productoDiv);//ACÁ SE COLOCA LO CREADO, en este caso en la linea 14 <div id="servicios" class="listado-servicios"></div>
        
    });

    

    proveedores.forEach( proveedor => {
        
        const {id, nombre}=proveedor;
        const option=document.createElement('option');
        option.value = `${id}`;
        option.textContent=`${nombre}`;
        document.querySelector('#proveedor').appendChild(option);
        
        
    });
    //PROVEEDORES
    document.querySelector('#proveedor').addEventListener('change',e=>{

        const idProv=e.target.value;
        //pedidos.clientes1.id=e.target.value;
        //seleccionarClientes(clientes);
        //let {clientes1}=pedidos;
        for(let i=0;i<proveedores.length;i++){
            if(proveedores[i].id==idProv){
                solicitud.proveedor1=proveedores[i];
                
            }
            
        }
        //PROVEEDORES
        //console.log(solicitud);//PARA SABER EL CLIENTE QUE SE HA AGREGADO
    });

}

function seleccionarProducto(producto) {
        
    const { id } = producto;//ESTE ES DE LOS DATOS DEL JSON
    
    const { productos } = solicitud;//ESTE ES DEL OBJETO CITA DE ARRIBA, EN EL COMIENZO. No confundir con el servicio que se selecciona cuando das click, es decir el que esta una linea arriba

    // Identificar el elemento al que se le da click
    const divProducto = document.querySelector(`[data-id-producto="${id}"]`);//acá se coloca el id seleccionado en esta variable hmtl
    
    // Comprobar si un servicio ya fue agregado, es como si fuera un propery_exits
    if( productos.some( agregado => agregado.id === id ) ) {//agregado es como un nuevo array que viene de servicios(similar al foreach).
    //servicios.some te dará como resultado true o false    //Luego comparamos el agregado.id con el servicio.id, pero como ya extraimos antes ese id al inicio de esta funcion, entonces solo ponemos id.
    //Si ya existe un id que ya está en servicios entonces es porque ya está seleccionado y por ende se elimina:
    //some: comprueba si en productos hay un id que sea igual al id de todos lo productos del json, es decir si está seleccionado(coincide el id)
        // Eliminarlo
        solicitud.productos = productos.filter( agregado => agregado.id !== id );//agrega todos los productos que no tengan el mismo id que los datos de json. Los agrega en pedidos.productos

        //osea que si hay 3 elementos, va a elegir 2 que no tengan ese id y quita el seleccionado
        divProducto.classList.remove('seleccionado');   
    } else {//sino se agrega, porque no ha sido seleccionado
        // Agregarlo
        solicitud.productos = [...productos, producto];//IMPORTANTE, es para agregar el servicio(servicio) seleccionado en los servicios(servicios) del objeto cita 
        divProducto.classList.add('seleccionado');
    }
    //PRODUCTOS
    //console.log(solicitud);
    
}

function seleccionarCantidad(datosCant){
    const { id } = datosCant;

    const { cantidad } = solicitud;

    if(cantidad.some(agregado => agregado.id === id)){
        solicitud.cantidad = cantidad.filter( agregado => agregado.id !== id );
    }else{
        solicitud.cantidad = [...cantidad, datosCant];
    }
}
function seleccionarGanancia(datosGan){
    const { id } = datosGan;

    const { gananciaS } = solicitud;

    if(gananciaS.some(agregado => agregado.id === id)){
        solicitud.gananciaS = gananciaS.filter( agregado => agregado.id !== id );
    }else{
        solicitud.gananciaS = [...gananciaS, datosGan];
    }
}

function seleccionarPreComp(datosComp){
    const { id } = datosComp;

    const { preCompras } = solicitud;

    if(preCompras.some(agregado => agregado.id === id)){
        solicitud.preCompras = preCompras.filter( agregado => agregado.id !== id );
    }else{
        solicitud.preCompras = [...preCompras, datosComp];
    }
}
function seleccionarCostoNuevo(datosCostoNuevo){
    const { id } = datosCostoNuevo;

    const { precioCostoNuevo } = solicitud;

    if(precioCostoNuevo.some(agregado => agregado.id === id)){
        solicitud.precioCostoNuevo = precioCostoNuevo.filter( agregado => agregado.id !== id );
    }else{
        solicitud.precioCostoNuevo = [...precioCostoNuevo, datosCostoNuevo];
    }
}

//FECHA
function seleccionarFecha() {
    //PRUEBA
    // document.querySelector('#fecha').addEventListener('input',e=>{
    //     solicitud.fecha=e.target.value;
    // })

    const inputFecha = document.querySelector('#fecha').value;//acá solo hacemos referencia al id
    solicitud.fecha=inputFecha;
        //FECHA
        //console.log(solicitud);
        
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

    solicitud.vaciador=[];
}

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
    if(Object.keys(solicitud.proveedor1).length === 0 || solicitud.productos.length === 0 || solicitud.fecha === '') {
        mostrarAlerta('Faltan datos de Productos, Fecha u Hora','error','.contenido-resumen',false);
        
        return;
    }
    
    
    // Formatear el div de resumen
    const { proveedor1:{ nombre,email }, fecha, productos } = solicitud;
    // Heading para Servicios en Resumen
    const headingServicios = document.createElement('H3');
    headingServicios.textContent = 'Resumen de Productos';
    resumen.appendChild(headingServicios);

    productos.forEach(producto => {
        const {vaciador, cantidad, preCompras, precioCostoNuevo, gananciaS }=solicitud;
        vaciador.push(null);
        // cantidad.push(null);
        // preCompras.push(null);
        // precioCostoNuevo.push(null);
        // gananciaS.push(null);
        const { descripcion, precio_costo, ganancia } = producto;
        let mostrarGan=ganancia;

        if(mostrarGan==0){
            NGan= mostrarGan;
        }else{
            mostrarGan= (Number(ganancia)-1)*100;
            NGan= mostrarGan.toFixed(2);
        }
        

        const contenedorServicio = document.createElement('DIV');
        contenedorServicio.classList.add('contenedor-servicio');
        contenedorServicio.setAttribute("id", "contenedor"+vaciador.length);

        const textoProducto = document.createElement('P');
        textoProducto.textContent = descripcion;

        const precioProducto = document.createElement('P');
        precioProducto.innerHTML = `<span>Precio:</span> $`;

        const inputPrecioNuevo= document.createElement('input');
        inputPrecioNuevo.setAttribute("id", "precioNuevo"+vaciador.length);
        inputPrecioNuevo.setAttribute("step", "0.01");
        inputPrecioNuevo.setAttribute("type", "number");
        inputPrecioNuevo.setAttribute("value", `${precio_costo}`);

        precioProducto.appendChild(inputPrecioNuevo);

        const textCantidad= document.createElement('P');
        textCantidad.innerHTML = `<span>Cantidad: </span>`;

        const inputCantidad= document.createElement('input');
        inputCantidad.setAttribute("id", "cantidadProducto"+vaciador.length);
        inputCantidad.setAttribute("step", "1");
        inputCantidad.setAttribute("type", "number");
        //inputCantidad.setAttribute("value", "1");     
        textCantidad.appendChild(inputCantidad);

        const gananciaPr= document.createElement('P');
        gananciaPr.innerHTML = `<span>Ganancia (%): </span>`;

        const inputGanancia= document.createElement('input');
        inputGanancia.setAttribute("id", "ganancia"+vaciador.length); 
        inputGanancia.setAttribute("type", "number");
        inputGanancia.setAttribute("step", "0.01");
        inputGanancia.setAttribute("placeholder", "Ejemplo:50,65.50,...");
        inputGanancia.setAttribute("max", "500");
        inputGanancia.setAttribute("value", `${NGan}`);
        gananciaPr.appendChild(inputGanancia);
        
        const precioCompra= document.createElement('P');
        precioCompra.innerHTML = `<span>Precio Compra: </span>`;
        
        const inputVenta= document.createElement('input');
        inputVenta.setAttribute("id", "precioCompra"+vaciador.length); 
        inputVenta.setAttribute("type", "number");
        inputVenta.setAttribute("step", "0.01");
        inputVenta.setAttribute("readonly", "");
        precioCompra.appendChild(inputVenta);
        

        contenedorServicio.appendChild(textoProducto);
        contenedorServicio.appendChild(precioProducto);
        contenedorServicio.appendChild(textCantidad);
        contenedorServicio.appendChild(gananciaPr);
        contenedorServicio.appendChild(precioCompra);
        resumen.appendChild(contenedorServicio);
        
    });
    
    //CALCULAR LA CANTIDAD Y LOS PRECIOS COMPRA
    for(let i=0; i<solicitud.vaciador.length;i++){
        let { cantidad, productos, precioCostoNuevo, gananciaS, preCompras } = solicitud;
        if(cantidad[i].cant!==null ){
            document.querySelector('#cantidadProducto'+(i+1)).value=cantidad[i].cant;
            document.getElementById('precioCompra'+(i+1)).value=preCompras[i].cant;
        }
        if(precioCostoNuevo[i].cant!==0 ){
            document.querySelector('#precioNuevo'+(i+1)).value=precioCostoNuevo[i].cant;
        }else if(precioCostoNuevo[i].cant==0 && cantidad[i].cant ){
            let va1=parseFloat(productos[i].precio_costo)*cantidad[i].cant;
            document.querySelector('#precioCompra'+(i+1)).value=va1.toFixed(2);
            preCompras[i].cant=document.querySelector('#precioCompra'+(i+1)).value;
        }
        if(gananciaS[i].cant==0){
            document.querySelector('#ganancia'+(i+1)).value=0.00;
        }else if(gananciaS[i].cant==1.0  ){
            let ga1=document.querySelector('#ganancia'+(i+1)).value;
            const nuevGan= parseFloat(ga1).toFixed(2);
            const calGan=(nuevGan/100)+1;
            gananciaS[i].cant=calGan.toFixed(4);
        }else if(gananciaS[i].cant==='NaN'){
            if(productos[i].ganancia!=0){
                let vaGanancia= productos[i].ganancia*100-100;
                document.querySelector('#ganancia'+(i+1)).value=vaGanancia.toFixed(2);
                gananciaS[i].cant=productos[i].ganancia;
                return;
            }
            document.querySelector('#ganancia'+(i+1)).value=0;
            
        }
        else if(gananciaS[i].cant){
            let valG=parseFloat(gananciaS[i].cant)*100-100;
            document.querySelector('#ganancia'+(i+1)).value=valG.toFixed(2);

        }
        
        document.querySelector('#precioNuevo'+(i+1)).addEventListener('input',e=>{
            const pre=e.target.value;
            const preNuev =parseFloat(pre).toFixed(2);
            const cant=document.querySelector('#cantidadProducto'+(i+1)).value;
            const preCosto= productos[i].precio_costo;
            cantNum=parseInt(cant);
            cantidad[i].cant=cantNum;

            const gan=document.querySelector('#ganancia'+(i+1)).value;
            const nuevGan= parseFloat(gan).toFixed(2);
            const calGan=(nuevGan/100)+1;
            gananciaS[i].cant=calGan.toFixed(4);
            //let identF=parseInt(productos[i].ident);

            //CALCULAR EL PRECIO COMPRA
            if(cant==='' || isNaN(preNuev) || preNuev==0 || cant==0){
                document.getElementById('precioCompra'+(i+1)).value='';
                solicitud.preCompras[i].cant=null;
                precioCostoNuevo[i].cant=0;
            }else if(cant && preCosto==preNuev){
                //identF=0;
                precioCostoNuevo[i].cant=0;
                let result=cantidad[i].cant*productos[i].precio_costo;
                nuevoResultado=result.toFixed(2);
                document.getElementById('precioCompra'+(i+1)).value=nuevoResultado;
                let valor=document.getElementById('precioCompra'+(i+1)).value;
                valorNum=parseFloat(valor);
                solicitud.preCompras[i].cant=valorNum;
                /*
                productos[i].ident=identF;
                console.log(solicitud);
                */
                
            }else if(cant && preCosto!=preNuev){
                precioCostoNuevo[i].cant =preNuev;
                let result=cantidad[i].cant*preNuev;
                nuevoResultado=result.toFixed(2);
                document.getElementById('precioCompra'+(i+1)).value=nuevoResultado;
                let valor=document.getElementById('precioCompra'+(i+1)).value;
                valorNum=parseFloat(valor);
                solicitud.preCompras[i].cant=valorNum;
                /*
                totalIdent=identF+1;
                productos[i].ident=totalIdent;
                console.log(solicitud);
                */
            }
        });

        document.querySelector('#cantidadProducto'+(i+1)).addEventListener('input',e=>{
            const preNuev=document.querySelector('#precioNuevo'+(i+1)).value;
            const cant=e.target.value;
            const preCosto= productos[i].precio_costo;
            cantNum=parseInt(cant);
            cantidad[i].cant=cantNum;

            const gan=document.querySelector('#ganancia'+(i+1)).value;
            const nuevGan= parseFloat(gan).toFixed(2);
            const calGan=(nuevGan/100)+1;
            gananciaS[i].cant=calGan.toFixed(4);
            //let identF=parseInt(productos[i].ident);
            //CALCULAR EL PRECIO COMPRA
            if(cant==='' || isNaN(preNuev) || preNuev==0 || cant==0){
                document.getElementById('precioCompra'+(i+1)).value='';
                solicitud.preCompras[i].cant=null;
            }else if(cant && preCosto==preNuev){
                precioCostoNuevo[i].cant=0;
                //identF=0;
                let result=cantidad[i].cant*productos[i].precio_costo;
                nuevoResultado=result.toFixed(2);
                document.getElementById('precioCompra'+(i+1)).value=nuevoResultado;
                let valor=document.getElementById('precioCompra'+(i+1)).value;
                valorNum=parseFloat(valor);
                solicitud.preCompras[i].cant=valorNum;
                /*
                productos[i].ident=identF;
                console.log(solicitud);
                */
            }else if(cant && preCosto!=preNuev){
                precioCostoNuevo[i].cant =preNuev;
                let result=cantidad[i].cant*preNuev;
                nuevoResultado=result.toFixed(2);
                document.getElementById('precioCompra'+(i+1)).value=nuevoResultado;
                let valor=document.getElementById('precioCompra'+(i+1)).value;
                valorNum=parseFloat(valor);
                solicitud.preCompras[i].cant=valorNum;
                /*
                totalIdent=identF+1;
                productos[i].ident=totalIdent;
                console.log(solicitud);
                */
            }
            /*
            console.log("precio costo: "+productos[i].precio_costo);
            console.log("precio nuevo: "+parseFloat(document.querySelector('#precioNuevo'+(i+1)).value).toFixed(2));
            console.log("cantidad: "+e.target.value);
            */
        });
        document.querySelector('#ganancia'+(i+1)).addEventListener('input',e=>{
            
            const gan=e.target.value;
            const nuevGan= parseFloat(gan).toFixed(2);
            const calGan=(nuevGan/100)+1;
            gananciaS[i].cant=calGan.toFixed(4);

        });

    }
    
    
    // Heading para Cliente en Resumen
    const headingCliente = document.createElement('H3');
    headingCliente.textContent = 'Resumen del Proveedor';
    resumen.appendChild(headingCliente);

    const nombreProveedor = document.createElement('P');
    nombreProveedor.innerHTML = `<span>Nombre del Proveedor:</span> ${nombre}`;

    const correoProveedor = document.createElement('P');
    correoProveedor.innerHTML = `<span>Correo del Proveedor:</span> ${email}`;

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
    botonGuardar.textContent = 'Guardar Solicitud';
    /*
    //para agregarle un id a esa funcion
    botonReservar.onclick = function(){
        reservarCita(id)
    };
    */
    botonGuardar.onclick = validarSolicitud;
    
    resumen.appendChild(nombreProveedor);
    resumen.appendChild(correoProveedor);
    resumen.appendChild(fechaCita);

    resumen.appendChild(botonGuardar);

}

function validarSolicitud(){
    
    //const resumen = document.querySelector('.contenido-resumen');
    const{preCompras,cantidad, gananciaS}=solicitud;
    const preCN=preCompras.map(producto=>parseFloat(producto.cant));
    const cantN=cantidad.map(producto=>parseInt(producto.cant));
    const ganA=gananciaS.map(producto=>parseFloat(producto.cant));
    // if( preCN.includes(null) || preCN.includes(NaN) || cantN.includes(NaN) || cantN.includes(null) || ganA.includes(NaN) || ganA.includes(null) || ganA.includes(1)|| ganA.includes("1.0000") ) {
    //     console.log("Faltan dat");
    // }else{
    //     console.log("Todo bien");
    // }
    // console.log(preCN);
    // console.log(cantN);
    // console.log(ganA);
    // return;
    
    // Limpiar el Contenido de Resumen
    //para saber si un valor existe en un objeto se usa includes y para saber la cantidad de un array se usa length( tambien sirve para saber si está vacío)
    if(preCN.includes(null) || preCN.includes(NaN) || cantN.includes(NaN) || cantN.includes(null) || ganA.includes(NaN) || ganA.includes(null) || ganA.includes(1) || ganA.includes("0.00")|| ganA.includes("1.0000") ) {
        mostrarAlerta('Completa todos los datos','error','.contenido-resumen',true);
        return;
    }else{
        
        guardarSolicitud(preCN,cantN,ganA);
        
    }
}

async function guardarSolicitud(preCN,cantN,ganA){
    
    const {fecha,productos,proveedor1, precioCostoNuevo}=solicitud;
    
    const idProv=proveedor1.id;
    const idProductos=productos.map(producto=>producto.id);
    const precioCosto=productos.map(producto=>parseFloat(producto.precio_costo));
    const stock=productos.map(producto=>parseInt(producto.stock));
    const precioNuevo=precioCostoNuevo.map(producto=>parseFloat(producto.cant));
    const precioU_Vent=productos.map(producto=>parseFloat(producto.precio_unitarioVenta));
    console.log(precioNuevo);
    //console.log(gananNum);
    //console.log(stock);
    //console.log(cantidad);

    //console.log(precioCosto);
    for(let i=0;i<precioNuevo.length;i++){
        if(productos[i].precio_costo==0){
            productos[i].fecha_inicial=fecha;
        }
    }
    const fechaIni= productos.map(producto=>producto.fecha_inicial);

    
    for(let i=0;i<precioNuevo.length;i++){
        if( precioNuevo[i]!==0){
            let calPrecio=(precioCosto[i]*stock[i]+precioNuevo[i]*cantN[i])/(stock[i]+cantN[i]);
            /*
            console.log(precioCosto[i]*stock[i]);
            console.log(precioNuevo[i]*solicitud.cantidad[i])
            console.log(stock[i]+solicitud.cantidad[i]);
            console.log(precioCosto);
            console.log(stock);
            console.log(precioNuevo);
            console.log(solicitud.cantidad)
            console.log(calPrecio);
            return;
            */
            productos[i].precio_costo=calPrecio.toFixed(2);
            precioCosto[i]=precioNuevo[i];
            precioU_Vent[i]=ganA[i]*productos[i].precio_costo;
            productos[i].precio_unitarioVenta=precioU_Vent[i].toFixed(2);
            productos[i].ganancia=ganA[i];
            
        }
        else{//Si el precio Costo es el mismo que el anterior
            precioU_Vent[i]=ganA[i]*precioCosto[i];
            productos[i].precio_unitarioVenta=precioU_Vent[i].toFixed(2);
            productos[i].ganancia=ganA[i];

        }

        
    }


    const nuevoCosto=productos.map(producto=>producto.precio_costo);
    const nuevPreU_Venta=productos.map(producto=>parseFloat(producto.precio_unitarioVenta));
    // console.log(cantN);
    // console.log(ganA);
    // console.log(precioCosto);
    // console.log(nuevPreU_Venta);
    // console.log(nuevoCosto);
    // return;
    //console.log(solicitud);
    //console.log(precioCosto);
    //Stock actualizado
    const nuevoStock=stock.map((valor,indice)=>valor+cantN[indice]);

    //let total=0;
    //preVentas.forEach( precios=>total+=precios);
    //console.log(total);
    let precioTotal = preCN.reduce((total, producto) => total + producto, 0); //0 es el valor inicial del total
    // console.log( precioTotal );
    // console.log(idProv);
    // console.log(idProductos);
    // console.log(cantN);
    // console.log(precioCosto);
    // console.log(nuevoStock);
    // console.log(precioNuevo);
    // console.log(nuevoCosto);
    // return;
    // console.log(fechaIni);
    // console.log(stockIni);
    // return;
    const datos= new FormData();
    //Solicitud
    //valores unitarios
    datos.append('proveedor_id',idProv);
    datos.append('fecha_solicitud',fecha);
    datos.append('precioTotal',precioTotal);

    //Detalle Solicitud
    //arreglos, por eso se manda corregir en la API con explode()
    datos.append('productos',idProductos);
    datos.append('cantidad_entrada',cantN);
    datos.append('precio_unitario',precioCosto);
    datos.append('precio_compra',preCN);

    //PRODUCTOS ACTUALIZAR
    //arreglo
    datos.append('stock',nuevoStock);
    datos.append('precio_costo',nuevoCosto);
    datos.append('ganancia',ganA);
    datos.append('precio_unitarioVenta',nuevPreU_Venta);
    datos.append('fecha_inicial',fechaIni);


    try {
        //! const url = `${location.origin}/api/solicitudes`;
        const url = '/api/solicitudes'

        const respuesta=await fetch(url,{
        method:'POST',
        body:datos //IMPORTANTE PARA PASAR LOS DATOS AL FETCH
        });

        const resultado=await respuesta.json();

        //console.log(resultado);
    
        if(resultado) {
            Swal.fire({
                icon: 'success',
                title: 'Solicitud Registrada',
                text: 'La solicitud fue registrada correctamente',
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
                text: 'Hubo un error al registrar la solicitud'
            })
        }
    
    //console.log([...datos]);
    
}
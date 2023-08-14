let paso = 1;
let fechaInput = document.querySelector('#fecha');
const resumen = document.querySelector('.contenido-resumen');

const msg = document.querySelector('#msg');
const cab = document.querySelector('#cab');

// let Vfecha;

document.addEventListener('DOMContentLoaded', function() {
    
    iniciarApp();
    consultarAPI();//backend
    if(msg!=null){
        cab.style.display='none';
    }
    
});


function iniciarApp() {
    // mostrarFecha();
    buscarPorFecha();
    mostrarSeccion();
     // Muestra y oculta las secciones, esto es para que inicie con un paso, en este caso se puso al inicio let paso=1. Por eso comienza mostrando el paso 1 de la seccion
    tabs();
    // colocarFecha();
}

// function mostrarFecha(){
//     let url = new URL(window.location.href);

//     // Obtener los parámetros de la URL como un objeto
//     let params = url.searchParams;

//     // Obtener un valor específico del parámetro
//     let paramValue = params.get('fecha');
//     // fechaNu=new Date(paramValue);
//     if(paramValue){
//         fechaInput.value = paramValue;
//     }
// }

function mostrarSeccion(){
    const seccionAnterior = document.querySelector('.mostrar');
    //IMPORTANTE: GUIATE DE <button class="actual" type="button" data-paso="1">
    // Ocultar la sección que tenga la clase de mostrar
    //se le asigna seccionAnterior como variable al que tiene como nombre mostrar en su clase
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
            //se le pone acá tambien para que cuando se de click en los botones, se actualicen los paso y determine que mostrar o no en esta funcion
        });
    });
}

function buscarPorFecha() {
    fechaInput.addEventListener('input', function(e) {
        let fechaSeleccionada = e.target.value;
        // Vfecha=fechaSeleccionada;
        
        window.location = `?fecha=${fechaSeleccionada}`;

    });
}


async function consultarAPI() {//async y await van siempre juntos, y el await hace que espere a que se termine de ejecutar una funcion

    try {
        //! const url = `${location.origin}/api/productos`;
        const url = '/api/productos';//esta es la url que se va a consumir, la url que tiene el api
        const resultado = await fetch(url);//funcion que permite consumir este los datos de la url(en este caso son de la tabla servicios)
        
        const datos = await resultado.json();//
        //console.log(productos['productos']); //con esto se puede ver los array en la consola
        mostrarProductos(datos['productos']);
        //idCliente(datos['clientes']);
    
    } catch (error) {
        console.log(error);
    }
}
function mostrarProductos(productos=[]) {
    productos.forEach( producto => {
        
        const {id, descripcion}=producto;
        const option=document.createElement('option');
        option.value = `${id}`;
        option.textContent=`${descripcion}`;
        document.querySelector('#producto').appendChild(option);
        
        
    });
    document.querySelector('#producto').addEventListener('change',e=>{
        const idPro=e.target.value;
        for(let i=0;i<productos.length;i++){
            if(idPro==productos[i].id){
                vaciarProducto();

                var div1 = document.createElement('div');
                div1.setAttribute('style', 'margin-right: 15rem; margin-left: 30rem;');

                const textoId = document.createElement('P');
                // textoId.classList.add('product');
                textoId.innerHTML = `<span>Codigo:</span> ${productos[i].id}`;
                
                const textoDescripcion = document.createElement('P');
                textoDescripcion.innerHTML = `<span>Descripcion:</span> ${productos[i].descripcion}`;

                const textoStock = document.createElement('P');
                textoStock.innerHTML = `<span>Stock:</span> ${productos[i].stock}`;

                const textoPrecioCosto = document.createElement('P');
                // textoPrecioCosto.classList.add('total');
                textoPrecioCosto.innerHTML = `<span>Precio Costo:</span> $ ${productos[i].precio_costo}`;
                
                const textoGanancia = document.createElement('P');
                textoGanancia.innerHTML = `<span>Ganancia:</span> ${ productos[i].ganancia==0 ? 0.00 : productos[i].ganancia*100-100} %`;
                
                const textoPrecioVenta = document.createElement('P');
                // textoPrecioVenta.classList.add('total');
                textoPrecioVenta.innerHTML = `<span>Precio Unitario Venta:</span> $ ${productos[i].precio_unitarioVenta}`;

                const textoFechaInicial = document.createElement('P');
                // textoPrecioVenta.classList.add('total');
                textoFechaInicial.innerHTML = `<span>Fecha Registrada:</span> ${productos[i].fecha_inicial}`;

                var div2 = document.createElement('div');

                // Crear un elemento input de tipo image
                var inputImg = document.createElement('input');
                inputImg.setAttribute('type', 'image');
                inputImg.setAttribute('style', 'cursor: default; width: 60%;');
                // Establecer el atributo src de la imagen
                inputImg.setAttribute('src', `/imagenes/${productos[i].imagen_producto}`);

                // Agregar el elemento input a algún contenedor en el documento
                
                


                div1.appendChild(textoId);
                div1.appendChild(textoDescripcion);
                div1.appendChild(textoStock);
                div1.appendChild(textoPrecioCosto);
                div1.appendChild(textoGanancia);
                div1.appendChild(textoPrecioVenta);
                div1.appendChild(textoFechaInicial);
                div2.appendChild(inputImg);

                resumen.appendChild(div1);
                resumen.appendChild(div2);

            }
        }
        

        
    });

}

function vaciarProducto() {
    // forma rapida (recomendada)
    while(resumen.firstChild) {
        resumen.removeChild(resumen.firstChild);
    }
}



// function colocarFecha(){
    
//     let url =new URL(window.location.href);
//     let params = new URLSearchParams(url.search);
//     let fecha = params.get("fecha");
//     let fechaObjeto = new Date(fecha);
//     const mes = fechaObjeto.getMonth()+1;//obtenemos el numero del mes(0=enero, febrero=1, ...), no es que reste un mes, solo considera al mes uno menos pero igual va bien
//     const dia = fechaObjeto.getDate()+1;//se le sube +2 porque newDate() te resta un dia. Y como usamos 2 new Date() le sumamos 2.
//     const year = fechaObjeto.getFullYear();
//     console.log(mes);
//     console.log(dia);
//     console.log(year);
//     let nuevF=`${dia}-${mes}-${year}`;
//     // var fechaString = "10-6-2023"; // Valor de fecha en formato incorrecto
//     let fechaPartes = nuevF.split("-"); // Dividir la cadena en partes: día, mes y año

//     // Crear un nuevo objeto de fecha en el formato correcto
//     let fechaCorrecta = new Date(fechaPartes[2], fechaPartes[1] - 1, fechaPartes[0]);

//     // Obtener la fecha en el formato "yyyy-MM-dd"
//     let fechaFormateada = fechaCorrecta.toISOString().split("T")[0];

//     // console.log( fechaFormateada); // Output: "2023-06-10" (fecha en formato correcto)
//     if(fechaObjeto){
//         fechaInput.value=fechaFormateada;
//     }
// }
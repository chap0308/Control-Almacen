let paso=1,fechaInput=document.querySelector("#fecha");const resumen=document.querySelector(".contenido-resumen"),msg=document.querySelector("#msg"),cab=document.querySelector("#cab");function iniciarApp(){buscarPorFecha(),mostrarSeccion(),tabs()}function mostrarSeccion(){const e=document.querySelector(".mostrar");e&&e.classList.remove("mostrar");const t="#paso-"+paso;document.querySelector(t).classList.add("mostrar");const n=document.querySelector(".actual");n&&n.classList.remove("actual");document.querySelector(`[data-paso="${paso}"]`).classList.add("actual")}function tabs(){document.querySelectorAll(".tabs button").forEach(e=>{e.addEventListener("click",(function(e){e.preventDefault(),paso=parseInt(e.target.dataset.paso),mostrarSeccion()}))})}function buscarPorFecha(){fechaInput.addEventListener("input",(function(e){let t=e.target.value;window.location="?fecha="+t}))}async function consultarAPI(){try{const e="/api/productos",t=await fetch(e);mostrarProductos((await t.json()).productos)}catch(e){console.log(e)}}function mostrarProductos(e=[]){e.forEach(e=>{const{id:t,descripcion:n}=e,c=document.createElement("option");c.value=""+t,c.textContent=""+n,document.querySelector("#producto").appendChild(c)}),document.querySelector("#producto").addEventListener("change",t=>{const n=t.target.value;for(let t=0;t<e.length;t++)if(n==e[t].id){vaciarProducto();var c=document.createElement("div");c.setAttribute("style","margin-right: 15rem; margin-left: 30rem;");const n=document.createElement("P");n.innerHTML="<span>Codigo:</span> "+e[t].id;const r=document.createElement("P");r.innerHTML="<span>Descripcion:</span> "+e[t].descripcion;const s=document.createElement("P");s.innerHTML="<span>Stock:</span> "+e[t].stock;const i=document.createElement("P");i.innerHTML="<span>Precio Costo:</span> $ "+e[t].precio_costo;const d=document.createElement("P");d.innerHTML=`<span>Ganancia:</span> ${0==e[t].ganancia?0:100*e[t].ganancia-100} %`;const u=document.createElement("P");u.innerHTML="<span>Precio Unitario Venta:</span> $ "+e[t].precio_unitarioVenta;const l=document.createElement("P");l.innerHTML="<span>Fecha Registrada:</span> "+e[t].fecha_inicial;var a=document.createElement("div"),o=document.createElement("input");o.setAttribute("type","image"),o.setAttribute("style","cursor: default; width: 60%;"),o.setAttribute("src","/imagenes/"+e[t].imagen_producto),c.appendChild(n),c.appendChild(r),c.appendChild(s),c.appendChild(i),c.appendChild(d),c.appendChild(u),c.appendChild(l),a.appendChild(o),resumen.appendChild(c),resumen.appendChild(a)}})}function vaciarProducto(){for(;resumen.firstChild;)resumen.removeChild(resumen.firstChild)}document.addEventListener("DOMContentLoaded",(function(){iniciarApp(),consultarAPI(),null!=msg&&(cab.style.display="none")}));
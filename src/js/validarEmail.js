(function() {
    document.addEventListener('DOMContentLoaded', function() {

        const email = {
            email: '',
            nombre: '',
            mensaje: '',
            telefono:''
        }

        // Seleccionar los elementos de la interfaz
        const inputEmail = document.querySelector('#email');
        const inputNombre = document.querySelector('#nombre');
        const inputMensaje = document.querySelector('#mensaje');
        const inputTelefono = document.querySelector('#telefono');

        const formulario = document.querySelector('#formulario');
        
        // const btnSubmit = document.querySelector('#formulario button[class="send_btn"]');
        const btnSubmit = document.querySelector('#formulario button[type="submit"]');
        const spinner = document.querySelector('#spinner');

        // Asignar eventos
        inputEmail.addEventListener('input', validar);
        inputNombre.addEventListener('input', validar);
        inputMensaje.addEventListener('input', validar);
        inputTelefono.addEventListener('input', validar);

        // btnSubmit.addEventListener('click', enviarEmail);
        formulario.addEventListener('submit', enviarEmail);//EL EVENTO SUBMIT ES PARA EL FORMULARIO, TANTO EL METODO POST COMO GET TE ENVIAN A UN ENLACE, POR ESO PONER EL preventDefault()
        

        function enviarEmail(e) {

            if(Object.values(email).includes('')) {
                e.preventDefault();//IMPORTANTEEEEEEEEEEE
                return Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Hubo un error en el envio'
                })
                
            }

            spinner.classList.add('flex');
            spinner.classList.remove('hidden');

            setTimeout(() => {
                spinner.classList.remove('flex');
                spinner.classList.add('hidden');
    
                resetFormulario();
    
                // Crear una alerta
                const alertaExito = document.createElement('P');
                alertaExito.classList.add('bg-green-500', 'text-white', 'p-2', 'text-center', 'rounded-lg', 'mt-10', 'font-bold', 'text-sm', 'uppercase');
                alertaExito.textContent = 'Mensaje enviado correctamente';
    
                formulario.appendChild(alertaExito);
                
                setTimeout(() => {
                    alertaExito.remove(); 
                    
                }, 3000);
                
            }, 3000);
            
            

        }

        function validar(e) {
            if(e.target.value.trim() === '') {
                mostrarAlerta(`El Campo ${e.target.id} es obligatorio`, e.target.parentElement);
                email[e.target.name] = '';
                comprobarEmail();
                return;
            }

            if(e.target.id === 'telefono' && !validarTelefono(e.target.value)) {
                mostrarAlerta('El telefono no es válido', e.target.parentElement);
                email[e.target.name] = '';
                comprobarEmail();
                return;
            }

            if(e.target.id === 'email' && !validarEmail(e.target.value)) {
                mostrarAlerta('El email no es válido', e.target.parentElement);
                email[e.target.name] = '';
                comprobarEmail();
                return;
            }

            if(e.target.id === 'mensaje' && !validarMensaje(e.target.value)) {
                mostrarAlerta('El mensaje debe tener más de 10 caracteres', e.target.parentElement);
                email[e.target.name] = '';
                comprobarEmail();
                return;
            }
            // console.log(email)
            limpiarAlerta(e.target.parentElement);
            

            // Asignar los valores
            email[e.target.name] = e.target.value.trim().toLowerCase();
            
            // Comprobar el objeto de email
            comprobarEmail();
        }

        function mostrarAlerta(mensaje, referencia) {
            limpiarAlerta(referencia);
            
            // Generar alerta en HTML
            const error = document.createElement('P');
            error.textContent = mensaje;
            error.classList.add('bg-red-600', 'text-white', 'p-2', 'text-center');
        
            // Inyectar el error al formulario
            referencia.appendChild(error);
        }

        function limpiarAlerta(referencia) {
            // Comprueba si ya existe una alerta
            const alerta = referencia.querySelector('.bg-red-600');
            if(alerta) {
                alerta.remove();
            }
        }

        function validarEmail(email) {
            const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
            const resultado = regex.test(email);
            return resultado;
        }

        function validarTelefono(telefono) {
            const regex =  /^9\d{8}$/;
            const resultado = regex.test(telefono);
            return resultado;
        }

        function validarMensaje(mensaje) {
            if (mensaje.length > 10) {
                return true;
            } else {
                return false;
            }
        }

        function comprobarEmail() {
            if(Object.values(email).includes('')) {
                btnSubmit.classList.add('opacity-50');
                btnSubmit.disabled = true;
                return
            } 
            btnSubmit.classList.remove('opacity-50');
            btnSubmit.disabled = false;
            
        }

        function resetFormulario() {
            // reiniciar el objeto
            email.email = '';
            email.mensaje = '';
            email.nombre = '';
            email.telefono = '';
            
            // inputEmail.value='';
            // inputNombre.value='';
            // inputMensaje.value='';
            // inputTelefono.value='';
            formulario.reset();
            comprobarEmail();
        }

    });



})()
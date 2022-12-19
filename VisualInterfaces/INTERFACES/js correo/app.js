/* Esta aplicacion debe verificar que los campos 
email, asunto y mensaje sean validos, el campo 
CC es opcional pero debe validar como email.

terminado la validacion habilita el boton de 
enviar y luego muestra el spinner con un set-
timeOut 3s para mostrar mensaje de enviado. 
*/

const d = document;
d.addEventListener( 'DOMContentLoaded', () => {
        
    //Seleccionar los inputs
    const nombreInput = d.querySelector('#email');
    const asuntoInput = d.querySelector('#asunto');
    const mensajeInput = d.querySelector('#mensaje');

    const form = d.querySelector( '#formulario' );

    const btnEnviar = d.querySelector(' #botones button[type="submit"] ');
    const btnReset = d.querySelector(' #botones button[type="reset"] ');
    const spinner = d.querySelector('#spinner');
    
    const email = {
        email: '',
        asunto: '',
        mensaje: ''
    };
     
    eventListeners();
    function eventListeners() {

        nombreInput.addEventListener('input', validarInput);
        asuntoInput.addEventListener('input', validarInput);
        mensajeInput.addEventListener('input', validarInput);
        cc.addEventListener('input', validarCC);
        
        btnReset.addEventListener('click', function( e ) {
            e.preventDefault();
            resetearForm();

        })

        form.addEventListener('submit', formSubmit );  
    };
    
    function validarInput(e) {

        if(e.target.value.trim() === '') {
            mostrarMensaje( `El ${e.target.id} es obligatorio`, e.target.parentElement);
            email[e.target.name] = '';
            validarCorreo();
            return;
        };
        
        if(e.target.id === 'email' && !validarEmail( nombreInput.value )) {
            mostrarMensaje( `El ${e.target.id} no es valido`, e.target.parentElement);
            email[e.target.name] = '';
            validarCorreo();
            return;
        };
        
        clearAlert(e.target.parentElement);
        
        //Asignar los valores al objeto email
        email[e.target.name] = e.target.value;

        //Validar email
        validarCorreo();
    };

    function validarCC(e) {
        if(e.target.value !== '' && !validarEmail( e.target.value )) {
            mostrarMensaje( `El ${e.target.id} no es valido`, e.target.parentElement);
            return
        }
        clearAlert(e.target.parentElement);
    }
    
    function validarCorreo() {

        if(  Object.values( email ).includes( '' ) ) {
            btnEnviar.disabled = true;
            btnEnviar.classList.add('opacity-50');
            return;
        }

        btnEnviar.disabled = false;
        btnEnviar.classList.remove('opacity-50');
    }
    
    function formSubmit( e ) {
        e.preventDefault();
        spinner.classList.remove('hidden');
        spinner.classList.add('flex');

        setTimeout(() => {
            spinner.classList.add('hidden');
            spinner.classList.remove('flex');
            
            resetearForm();
            
            const alerta = d.createElement( 'P' );
            alerta.classList.add( 'bg-green-500', 
                                    'text-white',
                                    'p-2',
                                    'rounded-lg',
                                    'mt-10',
                                    'font-bold',
                                    'font-sn',
                                    'uppercase',
                                    'text-center'  );
            alerta.textContent = 'El email se envio correctamente';
            form.appendChild( alerta );

            setTimeout(() => {
                alerta.remove();
            }, 3000);
        }, 3000);
    }

    
    function mostrarMensaje(mensaje, referencia) {
        
        const mensajeDiv = d.createElement( 'div' );
        mensajeDiv.textContent = mensaje;
        mensajeDiv.className = 'alerta';
        mensajeDiv.classList.add( 'bg-red-600', 'p-2', 'text-center', 'text-white');
        
        const alerta = referencia.querySelector( '.alerta' );
        
        if(!alerta) {
            referencia.appendChild( mensajeDiv );
        }
    }

    function clearAlert( referencia ) {
        const alerta = referencia.querySelector( '.alerta' );
        
        if(alerta) {
            alerta.remove();
        }
    }

    function validarEmail( email ) {
        const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/ ;
        const result = regex.test( email );
        return result;
    }

    function resetearForm() {
        
        email.email = '';
        email.asunto = '';
        email.mensaje = '';
        
        form.reset();
        validarCorreo();

    }
    
});//Fin del DOMContentLoaded
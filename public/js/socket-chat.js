var socket = io();

// lee los parametros que vienen en el URL
var params = new URLSearchParams(window.location.search);
var nombre = params.get('nombre');
var sala = params.get('sala');

if (!nombre || !sala) {
    window.location = 'index.html';
    throw new Error('El nombre y la sala son necesario');
}

//evento de una conexion valida del server de socket
socket.on('connect', function() {
    console.log('conectado');
    let usuario = {
            nombre,
            sala
        }
        //envia la informacion del usuario al servidor
    socket.emit('entrarChat', usuario, function(personas) {
        renderizarUsuarios(personas);
        listapersonas = personas
    });
});

// evento de desconecion
socket.on('disconnect', function() {
    console.log('Perdimos conexión con el servidor');
});

// Escucha/recibe los mensajes creados por otros usuarios del chat
socket.on('crearMensaje', function(mensaje) {
    renderizarMensajes(mensaje);
    scrollBottom()
});

//Recibe la lista de personas(si alguien entra o sale del chat)
socket.on('listaPersona', function(personas) {
    renderizarUsuarios(personas);
    listapersonas = personas;
});

//Recibe mensaje privado
socket.on('mensajePrivado', function(mensaje) {
    renderizarMensajes(mensaje);
    scrollBottom()
});

// Enviar información
// socket.emit('crearMensaje', {
//     mensaje: 'Hola Mundo'
// }, function(resp) {
//     console.log('crearMensaje, respuesta server: ', resp);
// });
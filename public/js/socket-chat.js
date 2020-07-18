var socket = io();

var params = new URLSearchParams(window.location.search);
var nombre = params.get('nombre');
// console.log('nombre:', nombre);
var sala = params.get('sala');
// console.log('sala:', sala);
if (!nombre || !sala) {
    window.location = 'index.html';
    throw new Error('El nombre y la sala son necesario');
}
socket.on('connect', function() {
    // console.log('conectado');
    let usuario = {
        nombre,
        sala
    }
    socket.emit('entrarChat', usuario, function(personas) {
        // console.log('entrarChat: ', personas);
        renderizarUsuarios(personas);
        listapersonas = personas
    });
});

// escuchar
socket.on('disconnect', function() {
    // console.log('Perdimos conexión con el servidor');
});

// Enviar información
// socket.emit('crearMensaje', {
//     mensaje: 'Hola Mundo'
// }, function(resp) {
//     console.log('crearMensaje, respuesta server: ', resp);
// });

// Escuchar información
socket.on('crearMensaje', function(mensaje) {
    // console.log('crearMensaje, Servidor:', mensaje);
    renderizarMensajes(mensaje);
    scrollBottom()
});

socket.on('listaPersona', function(personas) {
    // console.log('listaPersona :', personas);
    renderizarUsuarios(personas);
    listapersonas = personas;
});

socket.on('mensajePrivado', function(mensaje) {
    // console.log('mensajePrivado, Servidor:', mensaje);
    renderizarMensajes(mensaje);
    scrollBottom()
});
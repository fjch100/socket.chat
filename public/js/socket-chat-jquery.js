//lee los parametros que trae el URL
var params = new URLSearchParams(window.location.search);
var sala = params.get('sala');
var nombre = params.get('nombre');
var chatSala = document.getElementById('chatSala');
chatSala.textContent = ' ' + sala;

//referencias de Jquery
var divUsuarios = $('#divUsuarios');
var formEnviar = $('#formEnviar');
var txtMensaje = $('#txtMensaje');
var divChatbox = $('#divChatbox');

function renderizarUsuarios(personas) { //personas = [{},{},{}]
    var html = '';
    html += '<li>';
    html += '   <a href="javascript:void(0)" class="active"> Chat de <span>' + sala + '</span></a>';
    html += '</li>';

    for (let i = 0; i < personas.length; i++) {
        html += '<li>';
        html += '   <a data-id="' + personas[i].id + '" href="javascript:void(0)"><img src="assets/images/users/1.jpg" alt="user-img" class="img-circle"> <span>' + personas[i].nombre + '<small class="text-success">online</small></span></a>';
        html += '</li>';
    };
    divUsuarios.html(html);
};

//--------------- Jquery Listeners------------------------------

//evento al cliclear un usuario, para enviar un mensaje privado
// TO DO: abrir otro pagina (sala de chat) con solo los dos usuarios
// y manejar ese chat aparte
divUsuarios.on('click', 'a', function() {
    var id = $(this).data('id');
    if (!id) return;
});

//evento submit, envia el mensaje escrito al servidor  y rederiza el mensaje en la pantalla 
formEnviar.on('submit', function(e) {
    e.preventDefault();
    if (txtMensaje.val().trim().length === 0) {
        return;
    }
    // envia el mensaje al servidor
    socket.emit('crearMensaje', {
        nombre: nombre,
        mensaje: txtMensaje.val()
    }, function(mensaje) {
        txtMensaje.val('').focus();
        renderizarMensajes(mensaje);
        scrollBottom()
    });
});

function renderizarMensajes(mensaje) {
    var myself;
    if (nombre === mensaje.nombre) {
        myself = true;
    } else {
        myself = false;
    }
    var adminClass = 'info';
    if (mensaje.nombre === 'administrador') {
        adminClass = 'danger';
    }
    var html = '';
    html += myself ? '<li class=" reverse animated fadeIn">' : '<li class="animated fadeIn">';
    if (mensaje.nombre === 'administrador') {

    } else {
        html += '<div class="chat-img"><img src="assets/images/users/2.jpg" alt="user" /></div>';
    }

    html += '<div class="chat-content">';
    html += '<h5>' + mensaje.nombre + '</h5>';
    if (myself) {
        html += '<div class="box bg-success text-white">' + mensaje.mensaje + '</div>';
    } else {
        html += '<div class="box bg-light-' + adminClass + '">' + mensaje.mensaje + '</div>';
    }
    html += '</div>';
    html += '<div class="chat-time">' + new Date(mensaje.fecha).toLocaleTimeString() + '</div>';
    html += '</li>';
    divChatbox.append(html);
};

//funcion para hacer scroll automatico cuando agregamos un nuevo mensaje a la pantalla
function scrollBottom() {
    // selectors
    var newMessage = divChatbox.children('li:last-child');

    // heights
    var clientHeight = divChatbox.prop('clientHeight');
    var scrollTop = divChatbox.prop('scrollTop');
    var scrollHeight = divChatbox.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight() || 0;

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        divChatbox.scrollTop(scrollHeight);
    }
};

var listapersonas; // lista de personas actuales en el chat o sala
var txtContacto = document.getElementById('txtContacto');

//evento para buscar un contacto
txtContacto.addEventListener('keyup', function(e) {
    buscarTxt = txtContacto.value;
    regex = new RegExp(buscarTxt, 'ig');
    var listaencontrada = listapersonas.filter(persona => persona.nombre.match(regex));
    renderizarUsuarios(listaencontrada);
});
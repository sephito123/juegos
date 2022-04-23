"use strict";
exports.__esModule = true;
exports.obtenerUsuarios = exports.configurarUsuario = exports.mensaje = exports.desconectar = exports.conectarCliente = exports.usuariosConectados = void 0;
var usuarios_lista_1 = require("../clases/usuarios-lista");
var usuario_1 = require("../clases/usuario");
exports.usuariosConectados = new usuarios_lista_1.UsuariosLista();
var conectarCliente = function (cliente, io) {
    var usuario = new usuario_1.Usuario(cliente.id);
    exports.usuariosConectados.agregar(usuario);
};
exports.conectarCliente = conectarCliente;
var desconectar = function (cliente, io) {
    cliente.on('disconnect', function () {
        console.log('Cliente desconectado');
        exports.usuariosConectados.borrarUsuario(cliente.id);
        io.emit('usuarios-activos', exports.usuariosConectados.getLista());
    });
};
exports.desconectar = desconectar;
//escuchar mensajes
var mensaje = function (cliente, io) {
    cliente.on('mensaje', function (payload) {
        console.log('Mensaje recibido', payload);
        io.emit('mensaje-nuevo', payload);
    });
};
exports.mensaje = mensaje;
//configurar usuario
var configurarUsuario = function (cliente, io) {
    cliente.on('configurar-usuario', function (payload, callback) {
        exports.usuariosConectados.actualizarNombre(cliente.id, payload.nombre, payload.identificador, payload.jugador_x, payload.jugador_y, payload.imgJugador);
        io.emit('usuarios-activos', exports.usuariosConectados.getLista());
        callback({
            ok: true,
            mensaje: "Usuario ".concat((payload.nombre, payload.identificador, payload.jugador_x, payload.jugador_y, payload.imgJugador), ",configurado")
        });
        //io.emit('mensaje-nuevo',payload)
    });
};
exports.configurarUsuario = configurarUsuario;
//obtener usuarios
var obtenerUsuarios = function (cliente, io) {
    cliente.on('obtener-usuarios', function () {
        io.to(cliente.id).emit('usuarios-activos', exports.usuariosConectados.getLista());
    });
};
exports.obtenerUsuarios = obtenerUsuarios;

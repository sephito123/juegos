"use strict";
exports.__esModule = true;
exports.UsuariosLista = void 0;
var UsuariosLista = /** @class */ (function () {
    function UsuariosLista() {
        this.lista = [];
    }
    //Agregar un usuario
    UsuariosLista.prototype.agregar = function (usuario) {
        this.lista.push(usuario);
        console.log(this.lista);
        return usuario;
    };
    UsuariosLista.prototype.actualizarNombre = function (id, nombre, identificador, jugador_x, jugador_y, imgJugador) {
        for (var _i = 0, _a = this.lista; _i < _a.length; _i++) {
            var usuario = _a[_i];
            if (usuario.id === id) {
                usuario.nombre = nombre;
                usuario.identificador = identificador;
                usuario.jugador_x = jugador_x;
                usuario.jugador_y = jugador_y;
                usuario.imgJugador = imgJugador;
                break;
            }
        }
        console.log("==========Actualizar usuario=========");
        console.log(this.lista);
    };
    //  Obtener lista de usuarios
    UsuariosLista.prototype.getLista = function () {
        return this.lista.filter(function (usuario) { return usuario.nombre !== 'sin-nombre'; });
    };
    UsuariosLista.prototype.getUsuario = function (id) {
        return this.lista.find(function (usuario) { return usuario.id === id; });
    };
    // obtener usuario en sala
    UsuariosLista.prototype.getUsuariosEnSala = function (sala) {
        return this.lista.find(function (usuario) { return usuario.sala === sala; });
    };
    // Borrar Usuario
    UsuariosLista.prototype.borrarUsuario = function (id) {
        var tempUsuario = this.getUsuario(id);
        this.lista = this.lista.filter(function (usuario) { return usuario.id !== id; });
        console.log(this.lista);
        return tempUsuario;
    };
    return UsuariosLista;
}());
exports.UsuariosLista = UsuariosLista;

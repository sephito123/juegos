"use strict";
exports.__esModule = true;
var express_1 = require("express");
var environment_1 = require("../global/environment");
var socket_io_1 = require("socket.io");
var http_1 = require("http");
var socket = require("../sockets/socket");
var Server = /** @class */ (function () {
    function Server() {
        this.app = (0, express_1["default"])();
        this.port = environment_1.SERVER_PORT;
        this.httpServer = new http_1["default"].Server(this.app);
        this.io = new socket_io_1["default"].Server(this.httpServer, { cors: { origin: true, credentials: true } });
        this.escucharSockets();
    }
    Object.defineProperty(Server, "instance", {
        get: function () {
            return this._instance || (this._instance = new this());
        },
        enumerable: false,
        configurable: true
    });
    Server.prototype.escucharSockets = function () {
        var _this = this;
        console.log('Escuchando conexiones');
        // on escuchar evento
        this.io.on('connection', function (cliente) {
            console.log(cliente.id);
            //conectar cliente
            socket.conectarCliente(cliente, _this.io);
            //configurar_usuario
            socket.configurarUsuario(cliente, _this.io);
            //obtener usuarios activos
            socket.obtenerUsuarios(cliente, _this.io);
            //Mensajes
            socket.mensaje(cliente, _this.io);
            //desconectar
            socket.desconectar(cliente, _this.io);
        });
    };
    Server.prototype.start = function (callback) {
        this.httpServer.listen(this.port, callback());
    };
    return Server;
}());
exports["default"] = Server;

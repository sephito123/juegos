"use strict";
exports.__esModule = true;
var express_1 = require("express");
var server_1 = require("../clases/server");
var socket_1 = require("../sockets/socket");
var router = (0, express_1.Router)();
router.post('/mensajes', function (req, res) {
    var cuerpo = req.body.cuerpo;
    var de = req.body.de;
    var payload = {
        de: de,
        cuerpo: cuerpo
    };
    var server = server_1["default"].instance;
    server.io.emit('mensaje-nuevo', payload);
    res.json({
        ok: true,
        cuerpo: cuerpo,
        de: de
    });
});
router.post('/mensajes/:id', function (req, res) {
    var cuerpo = req.body.cuerpo;
    var de = req.body.de;
    var id = req.params.id;
    var payload = {
        de: de,
        cuerpo: cuerpo
    };
    var server = server_1["default"].instance;
    //in id se lo quita a todos
    server.io["in"](id).emit('mensaje-privado', payload);
    res.json({
        ok: true,
        cuerpo: cuerpo,
        de: de,
        id: id
    });
});
//serivcio para obtener usuarios
router.get('/usuarios', function (req, res) {
    var server = server_1["default"].instance;
    server.io.allSockets().then(function (clientes) {
        res.json({
            ok: true,
            // clientes
            clientes: Array.from(clientes)
        });
    })["catch"](function (err) {
        res.json({
            ok: false,
            err: err
        });
    });
});
//serivcio para obtener usuarios - detalle
router.get('/usuarios/detalle', function (req, res) {
    var server = server_1["default"].instance;
    server.io.allSockets().then(function (clientes) {
        res.json({
            ok: true,
            // clientes
            clientes: Array.from(socket_1.usuariosConectados.getLista())
        });
    })["catch"](function (err) {
        res.json({
            ok: false,
            err: err
        });
    });
});
exports["default"] = router;

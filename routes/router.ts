import {Router,Request,Response} from 'express';
import { Socket } from 'socket.io';
import  Server  from '../clases/server';
import { usuariosConectados } from '../sockets/socket';

const router = Router();

router.post('/mensajes',(req:Request,res:Response)=>{

    const cuerpo =req.body.cuerpo;
    const de = req.body.de;

    const payload={
        de,
        cuerpo
    }

    const server = Server.instance;

    server.io.emit('mensaje-nuevo',payload)
    res.json({
        ok:true,
        cuerpo,
        de
    });

});

router.post('/mensajes/:id',(req:Request,res:Response)=>{

    const cuerpo =req.body.cuerpo;
    const de = req.body.de;
    const id = req.params.id;

    const payload={
        de,
        cuerpo
    }

    const server = Server.instance;
    //in id se lo quita a todos
    server.io.in(id).emit('mensaje-privado',payload)

    res.json({
        ok:true,
        cuerpo,
        de,
        id
    });

});

//serivcio para obtener usuarios
router.get('/usuarios',(req:Request,res:Response)=>{


    const server = Server.instance;
    
    server.io.allSockets().then((clientes)=>{
        res.json({
            ok:true,
           // clientes
            clientes: Array.from(clientes)
        });
    }).catch((err)=>{
        res.json({
            ok:false,
            err
        })
    });
    

 
});
//serivcio para obtener usuarios - detalle
router.get('/usuarios/detalle',(req:Request,res:Response)=>{
    

    const server = Server.instance;
    
    server.io.allSockets().then((clientes)=>{
        res.json({
            ok:true,
           // clientes
            clientes: Array.from(usuariosConectados.getLista())
        });
    }).catch((err)=>{
        res.json({
            ok:false,
            err
        })
    });
    

 
});


export default router;
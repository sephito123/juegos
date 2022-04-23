 import {Socket} from 'socket.io'
 import socketIO from 'socket.io'
import { UsuariosLista } from '../clases/usuarios-lista'
import { Usuario } from '../clases/usuario';

export const usuariosConectados=new UsuariosLista();


export const conectarCliente=(cliente:Socket,io:socketIO.Server)=>{
    const usuario=new Usuario(cliente.id);
    usuariosConectados.agregar(usuario);

    
}

 export const desconectar =(cliente:Socket,io:socketIO.Server)=>{

    cliente.on('disconnect',()=>{
        console.log('Cliente desconectado')
        usuariosConectados.borrarUsuario(cliente.id);
        io.emit('usuarios-activos',usuariosConectados.getLista());
    })


 }


 //escuchar mensajes
 export const mensaje =(cliente:Socket,io:socketIO.Server)=>{

    cliente.on('mensaje',(payload:{de:string,cuerpo:string})=>{
        console.log('Mensaje recibido',payload)

        io.emit('mensaje-nuevo',payload)

    })


 }

  //configurar usuario
  export const configurarUsuario =(cliente:Socket,io:socketIO.Server)=>{

    cliente.on('configurar-usuario',(payload:{nombre:string,identificador:string,jugador_x:Number,jugador_y:Number,imgJugador:string},callback:Function)=>{
        

        usuariosConectados.actualizarNombre(cliente.id,payload.nombre,payload.identificador,payload.jugador_x,payload.jugador_y,payload.imgJugador);
        io.emit('usuarios-activos',usuariosConectados.getLista());
        callback({
            ok:true,
             mensaje:`Usuario ${payload.nombre,payload.identificador,payload.jugador_x,payload.jugador_y,payload.imgJugador},configurado`
        })
        //io.emit('mensaje-nuevo',payload)

    })



 }
 //obtener usuarios
 export const obtenerUsuarios =(cliente:Socket,io:socketIO.Server)=>{

    cliente.on('obtener-usuarios',()=>{
        

        
        io.to(cliente.id).  emit('usuarios-activos',usuariosConectados.getLista());
        

    })



 }
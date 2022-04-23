import {Usuario} from './usuario';

export class UsuariosLista{
    private lista:Usuario[]=[];

    constructor(){

    }
    //Agregar un usuario
    public agregar(usuario:Usuario){
        this.lista.push(usuario);
        console.log(this.lista);
        return usuario;
    }

    public actualizarNombre(id:string,nombre:string,identificador:string,jugador_x:Number,jugador_y:Number,imgJugador:string){
        for(let usuario of  this.lista){
            if(usuario.id===id){
                usuario.nombre=nombre;
                usuario.identificador=identificador;
                usuario.jugador_x=jugador_x;
                usuario.jugador_y=jugador_y;
                usuario.imgJugador=imgJugador;

                break;
            }
        }
        console.log("==========Actualizar usuario=========");
        console.log(this.lista);
    }

    //  Obtener lista de usuarios
    public getLista(){
        return this.lista.filter(usuario=>usuario.nombre!=='sin-nombre')
    }

    public getUsuario(id:string){
        return this.lista.find(usuario=>usuario.id===id);
    }

    // obtener usuario en sala

    public getUsuariosEnSala(sala:string){
        return this.lista.find(usuario=>usuario.sala===sala);
    }

    // Borrar Usuario
    public borrarUsuario(id:string){
        const tempUsuario=this.getUsuario(id);

        this.lista=this.lista.filter(usuario=>usuario.id !==id)
        console.log(this.lista);
        return tempUsuario;
    }

}
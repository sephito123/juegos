export class Usuario{
    public id:string;
    public identificador:string;
    public nombre:string;
    public sala:string;
    public jugador_x:Number;
    public jugador_y:Number;
    public imgJugador:string;
    constructor(id:string){
        this.id=id;
        this.nombre='sin-nombre';
        this.identificador='sin-id';
        this.sala='sin-sala';
        this.jugador_x=0;
        this.jugador_y=0;
        this.imgJugador='sin-imagen';
    }
}
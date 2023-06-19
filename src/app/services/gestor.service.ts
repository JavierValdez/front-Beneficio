import { Injectable } from '@angular/core';
import { DataService } from './data.service';
@Injectable({
  providedIn: 'root'
})
export class GestorService {

  constructor( private DataService:DataService) { }

  DataUsuario:any;
  //Crear usuario
  public crearUsuario(usuario:any){
    console.log(usuario);
    return this.DataService.crearUsuario(usuario);
  }

  //Listar usuarios
  public listarUsuarios(){
    return this.DataService.listarUsuarios();
  }

  //Actualizar usuario
  public ActualizarUsuario(usuario:any){
    console.log(usuario);
    return this.DataService.ActualizarUsuario(usuario);
  }
  //crearTrasportista
  public crearTransportista (json:any){
    console.log('En el gestor service')
    console.log(json);
    console.log('nit')
    return this.DataService.crearTransportista(json);
  }
  //getTransportista
  public getTransportista (){
    return <any> this.DataService.getTransportista();
  }
  //Login
  public Login(usuario:string, contrasena:string){
    return <any> this.DataService.Login(usuario, contrasena);
  }
  //post Transporte
  public postTransporte (json:any){
    return <any> this.DataService.postTransporte(json);
  }

  public postCuenta(json:any){
    return <any> this.DataService.postCuenta(json);
  }
  public ingresoGarita(json:any){
    return <any> this.DataService.ingresoGarita(json);
  }
  //get transportistas
  public getTransportistas(){
    return <any> this.DataService.getTransportistas();
  }
  //Eliminar transportista
  public inactivarTransportista(json:any){
    return <any> this.DataService.inactivarTransportista(json);
  }



}

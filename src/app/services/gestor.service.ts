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
  public crearTransportista (json:any,password:string){
    console.log('En el gestor service')
    console.log(json);
    console.log(password);
    console.log('nit')
    console.log(this.DataUsuario.nit);
    return this.DataService.crearTransportista(json, this.DataUsuario.nit,password);
  }
  //getTransportista
  public getTransportista (){
    return <any> this.DataService.getTransportista();
  }
  //Login
  public login (nit:string, contrasena:string){
    return <any> this.DataService.login(nit, contrasena);
  }


}

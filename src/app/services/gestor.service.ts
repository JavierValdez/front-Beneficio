import { Injectable } from '@angular/core';
import { DataService } from './data.service';
@Injectable({
  providedIn: 'root'
})
export class GestorService {

  constructor( private DataService:DataService) { }

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
  public crearTransportista (apellidos:string, nombres:string, numero_licencia:string, tipo_licencia:string,imagenBase64:string){
    console.log(apellidos, nombres, numero_licencia, tipo_licencia);
    return <any> this.DataService.crearTransportista(apellidos, nombres, numero_licencia, tipo_licencia,imagenBase64,'97954942','12345');
  }
  //getTransportista
  public getTransportista (){
    return <any> this.DataService.getTransportista();
  }


}

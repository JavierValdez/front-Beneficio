import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
//Import swal
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private httpClient:HttpClient ) { }
  //url = ' https://ws-beneficio-pvierapvaq-uc.a.run.app';
//url local
  url = 'http://localhost:8080';
  //Crear usuario
  public crearUsuario(usuario:any){
    console.log(usuario);
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpClient.post(this.url + '/create/user', usuario, { headers });
  }

  //Listar usuarios
  public listarUsuarios(){
    return this.httpClient.get(this.url + '/getAll/user');
  }
  public ActualizarUsuario(usuario:any){
    console.log(usuario);
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpClient.post(this.url + '/update/user', usuario, { headers });
  }

  //Crear trasportista recibe 4 parametros apellidos nombres numero_licencia tipo_licencia
  public crearTransportista(apellidos:string, nombres:string, numero_licencia:string, tipo_licencia:string, nit:string, contrasena:string){
    const url = `${this.url}/Transportista/InscribirTransportista`;

    let transportista = {
      numero_licencia: numero_licencia,
      nombres: nombres,
      apellidos: apellidos,
      tipo_licencia: tipo_licencia
    };
    console.log(transportista);

    const params = { nit: nit, contrasena: contrasena };

    return this.httpClient.post<any>(url, transportista, { params }).pipe(
      catchError((error: HttpErrorResponse) => {
        //formatea error.error.errores colocando saltosd e linea cada vez que encuentre -
        error.error.errores = error.error.errores.replace(/,/g, '');

        //Mensaje de error alerta
        Swal.fire({
          icon: 'error',
          title: 'Error al crear transportista:',
          html:  error.error.errores
        });
        console.log('Error al crear transportista:', error.error.errores);
        console.error('Error al crear transportista:', error);
        return throwError('Algo salió mal en la petición HTTP.');
      })
    );
  }

  //Realiza un get al catalogo:/Transportista/EncuentraTransportista
  public getTransportista(){
    const url = `${this.url}/Transportista/EncuentraTransportista`;
    return this.httpClient.get<any>(url).pipe(
      catchError((error: HttpErrorResponse) => {
        //Mensaje de error alerta
        Swal.fire({
          icon: 'error',
          title: 'Error al obtener transportista:',
          html:  error.error.errores
        });
        console.log('Error al obtener transportista:', error.error.errores);
        console.error('Error al obtener transportista:', error);
        return throwError('Algo salió mal en la petición HTTP.');
      })
    );
  }



}

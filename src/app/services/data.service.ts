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
  url = ' https://ws-beneficio-pvierapvaq-uc.a.run.app';

//url local
  //url = 'http://localhost:8080';
  //Crear usuario
  public crearUsuario(usuario:any){
    console.log(usuario);
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpClient.post(this.url + '/auth/nuevo', usuario, { headers });
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
  public crearTransportista(json:string){
     console.log('En el data service')
    const url = `${this.url}/Transportista/InscribirTransportista`;

    console.log('En el data service');
    console.log(url);
    console.log(json);


    return this.httpClient.post<any>(url, json).pipe(
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

  //Realizar login con nit y contraseña a la url /login
  public Login(usuario:string, contrasena:string){

    //Imprimir datos a enviar
    console.log(usuario, contrasena);
    const url = `${this.url}/auth/login`;
    const params = { nombreUsuario: usuario, password: contrasena };
    //Envia los datos a la url por metodo post

    return this.httpClient.post<any>(url, params).pipe(
      catchError((error: HttpErrorResponse) => {
        //Mensaje de error alerta
        Swal.fire({
          icon: 'error',
          title: 'Error al iniciar sesión:',
          html:  error.error.errores
        });
        console.log('Error al iniciar sesión:', error.error.errores);
        console.error('Error al iniciar sesión:', error);
        return throwError('Algo salió mal en la petición HTTP.');
      }
      )
    );
  }

  //metodo post para crear transporte
  public postTransporte (json:any){
    const url = `${this.url}/Transporte/InscribirTransporte`;
    return this.httpClient.post<any>(url, json).pipe(
      catchError((error: HttpErrorResponse) => {
        //Mensaje de error alerta
        Swal.fire({
          icon: 'error',
          title: 'Error al crear transporte:',
          html:  error.error.errores
        });
        console.log('Error al crear transporte:', error.error.errores);
        console.error('Error al crear transporte:', error);
        return throwError('Algo salió mal en la petición HTTP.');
      })
    );
  }
  public postCuenta (json:any){
    const url = `${this.url}/Cuenta/CrearCuenta`;
    return this.httpClient.post<any>(url, json).pipe(
      catchError((error: HttpErrorResponse) => {
        //Mensaje de error alerta
        Swal.fire({
          icon: 'error',
          title: 'Error al crear transporte:',
          html:  error.error.errores
        });
        console.log('Error al crear transporte:', error.error.errores);
        console.error('Error al crear transporte:', error);
        return throwError('Algo salió mal en la petición HTTP.');
      })
    );
  }
  public ingresoGarita (json:any){
    const url = `${this.url}/Beneficio/RegistrarIngreso`;
    return this.httpClient.post<any>(url, json).pipe(
      catchError((error: HttpErrorResponse) => {
        //Mensaje de error alerta
        Swal.fire({
          icon: 'error',
          title: 'Error al crear Ingreso:',
          html:  error.error.errores
        });
        console.log('Error al crear Ingreso:', error.error.errores);
        console.error('Error al crear Ingreso:', error);
        return throwError('Algo salió mal en la petición HTTP.');
      })
    );
  }
  //Get obtener transportistas
  public getTransportistas(){
    const url = `${this.url}/Transportista/EncuentraTransportista`;
    return this.httpClient.get<any>(url).pipe(
      catchError((error: HttpErrorResponse) => {
        //Mensaje de error alerta
        Swal.fire({
          icon: 'error',
          title: 'Error al obtener transportistas:',
          html:  error.error.errores
        });
        console.log('Error al obtener transportistas:', error.error.errores);
        console.error('Error al obtener transportistas:', error);
        return throwError('Algo salió mal en la petición HTTP.');
      })
    );
  }

  //Post Inactivar transportista
  public inactivarTransportista(json:any){
    const url = `${this.url}/Transportista/eliminarTransportista`;
    return this.httpClient.post<any>(url, json).pipe(
      catchError((error: HttpErrorResponse) => {
        //Mensaje de error alerta
        Swal.fire({
          icon: 'error',
          title: 'Error al inactivar transportista:',
          html:  error.error.errores
        });
        console.log('Error al inactivar transportista:', error.error.errores);
        console.error('Error al inactivar transportista:', error);
        return throwError('Algo salió mal en la petición HTTP.');
      })
    );
  }



}

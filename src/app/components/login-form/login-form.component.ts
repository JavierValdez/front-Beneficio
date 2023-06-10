import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { GestorService } from 'src/app/services/gestor.service';
import Swal from 'sweetalert2';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  //Envia confirmacion de logueo
  @Output() loginSuccess = new EventEmitter<any>();
  //Envia para mostrar registro
  @Output() showRegister = new EventEmitter<any>();

  role:string=""
  nit: string="";
  password: string="";
  constructor(private GestorService:GestorService ,private localStorageService: LocalStorageService) { }

  token: string | null=null;
  ngOnInit(): void {
    this.token = this.localStorageService.getToken();
    console.log('Token', this.token);
    this.localStorageService.tokenChange$.subscribe(() => {
      this.token = this.localStorageService.getToken();
      console.log('Token actualizado', this.token);
    });
  }


  login() {
    // Aquí puedes agregar la lógica para el inicio de sesión
     //envia nit y contraseña a la url /login
     //Datos a enviar
     console.log("Datos a enviar"+this.nit, this.password);
     this.GestorService.login(this.nit, this.password).subscribe(
      (response: any) => {
        //Mensaje de error si recibe Usuario o contraseña incorrectos
        if (response.error=="Usuario o contraseña incorrectos") {
          Swal.fire({
            icon: 'error',
            title: 'Error al iniciar sesión:',
            html:  response.error
          });
        }else{
        Swal.fire({
          icon: 'success',
          title: 'Bienvenido',
          html: 'Has iniciado sesión correctamente'
        });

        console.log('Bienvenido', response);
        //Guardar en localstorage
        localStorage.setItem('token', JSON.stringify(response));
        this.GestorService.DataUsuario=response;
        //Emite loginsuccess
        this.loginSuccess.emit();
      }
      }
    );
  }

  showRegistration() {
    this.showRegister.emit();
  }


}

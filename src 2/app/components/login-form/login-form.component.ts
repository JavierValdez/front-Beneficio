import { Component, EventEmitter, OnInit, Output,AfterViewInit } from '@angular/core';
import { GestorService } from 'src/app/services/gestor.service';
import Swal from 'sweetalert2';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { AuthService } from 'src/app/auth/auth.service';
declare const grecaptcha: any;

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

  usuario:string="";
  password: string="";
  constructor(private GestorService:GestorService ,private localStorageService: LocalStorageService,private Auth:AuthService  ) { }

  token: string | null=null;
  ngOnInit(): void {
    const script = document.createElement('script');
    script.src = 'https://www.google.com/recaptcha/enterprise.js';
    document.body.appendChild(script);
    this.token = this.localStorageService.getToken();
    console.log('Token', this.token);
    this.localStorageService.tokenChange$.subscribe(() => {
      this.token = this.localStorageService.getToken();
      console.log('Token actualizado', this.token);
    });
  }

  //login

  login() {
    // Aquí puedes agregar la lógica para el inicio de sesión
    // Aquí puedes agregar la lógica para el inicio de sesión
     //envia nit y contraseña a la url /login
     //Datos a enviar
      console.log("Login ");
     console.log("Datos a enviar"+this.usuario, this.password);
     this.GestorService.Login(this.usuario, this.password).subscribe(
      (response: any) => {
        //Mensaje de error si recibe Usuario o contraseña incorrectos
        if (response.error=="Usuario o contraseña incorrectos") {
          Swal.fire({
            icon: 'error',
            title: 'Error al iniciar sesión:',
            html:  response.error
          });
        }else{
        //Mensaje de bienvenida si inicia sesion correctamente

        Swal.fire({
          icon: 'success',
          title: 'Bienvenido',
          html: 'Has iniciado sesión correctamente'
        });

        console.log('Bienvenido', response.token);
        //Guarda el token en el local storage
        this.Auth.setToken(response.token);
        //Guarda el usuario en el local storage
        this.Auth.setAuthorities(response.authorities);
        //Guarda el usuario en el local storage
        this.Auth.setUsuario(this.usuario);
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

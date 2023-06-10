import { Component, OnInit } from '@angular/core';
import { GestorService } from 'src/app/services/gestor.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-gestor-component',
  templateUrl: './gestor-component.component.html',
  styleUrls: ['./gestor-component.component.css']
})
export class GestorComponentComponent implements OnInit {

    opcion1: string = 'Crear Agricultor';
    opcion2: string = 'Crear Transportista';
    opcion3: string = 'Crear Transporte';
    opcion4: string = 'Generar QR';
    opcion5: string = 'Cerrar sesión';

    color1: string = '#8B4513'; // Marrón
    color2: string = '#FFD700'; // Dorado
    color3: string = '#228B22'; // Verde
    color4: string = '#CD853F'; // Siena
    color5: string = '#A0522D'; // Marrón claro
    verOpciones: boolean = false;
    verRegistro: boolean = false;
    verLogin: boolean = true;
    verCrearTransportista: boolean = false;
    verQR: boolean = false;
    currentUser: any;
    esTrasportista: boolean = false;
    esAgricultor: boolean = false;
    esPesoCabal: boolean = false;

  constructor(private GestorService:GestorService) { }

  ngOnInit(): void {
    //Verificar si existe sesion previa en localStorage
    if (localStorage.getItem('token')) {
      this.GestorService.DataUsuario=localStorage.getItem('token');
      this.GestorService.DataUsuario=JSON.parse(this.GestorService.DataUsuario);
      this.GestorService.DataUsuario.rol=localStorage.getItem('role');
      this.currentUser =this.GestorService.DataUsuario;
      this.usuarioLogueado();
      this.validarRol();

    }
  }
  //Usuario logueado
  usuarioLogueado(){
    console.log("Confirmacion de logueo"+this.GestorService.DataUsuario)
    this.verOpciones= true;
    this.verLogin= false;
    //reinicia ver
    this.verCrearTransportista= false;
    console.log("Usuario logueado",this.currentUser)
    console.log('v1')
    this.currentUser =this.GestorService.DataUsuario;
    this.validarRol();
    //
  }
  //Cerrar sesion
  cerrarSesion(){
    //Mensaje que pregunta si esta seguro de cerrar sesion
    Swal.fire({
      title: '¿Está seguro de cerrar sesión?',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: `Cerrar sesión`,
      denyButtonText: `No cerrar sesión`,

    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        //Mensaje de confirmacion de cierre de sesion
        Swal.fire({
          icon: 'success',
          title: 'Sesión cerrada',
          text: 'Has cerrado sesión correctamente',
        })
        //Borrar token de localStorage
        localStorage.removeItem('token');
        //Ocultar opciones
        this.verOpciones= false;
        //Mostrar login
        this.verLogin= true;


      } else if (result.isDenied) {
        Swal.fire('No se ha cerrado sesión', '', 'info')
      }
    }
    )

  }

  //Ver Registro de Beneficio
  verRegistroBeneficio(){
    console.log("Registro de Beneficio")
    this.verRegistro= true;
    this.verOpciones= false;
    this.verLogin= false;


  }

  //ver crear transportista
  onVerCrearTransportista(){
    console.log("Crear Transportista")
    this.verCrearTransportista= true;
    this.verLogin= false;

  }

  //ver QR
  onVerQR(){
    if( this.currentUser.numero_licencia!=null){
    console.log("Ver QR")
    this.verQR= true;
    this.verLogin= false;
    this.verOpciones= true;
    }
  }

  //valida el rol del usuario
  validarRol(){

    console.log("Validar rol")
    console.log(this.currentUser.rol)
    if(this.currentUser.rol=="Agricultor"){
      this.esAgricultor=true;
    }else if(this.currentUser.rol=="Transportista"){
      this.esTrasportista=true;
    }else if(this.currentUser.rol=="PesoCabal"){
      this.esPesoCabal=true;
    }
  }





}

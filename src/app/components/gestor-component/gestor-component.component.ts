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
    verCrearTransporte: boolean = false;
    verCrearCuenta: boolean = false;
    verIngresoGarita: boolean = false;
    verInactivarTransportista: boolean = false;
    verRegistrarParcialidad: boolean = false;
    verListado: boolean = false;
    verQR: boolean = false;
    verPesoCabal: boolean = false;
    currentUser: any;
    esTrasportista: boolean = false;
    esAgricultor: boolean = false;
    esPesoCabal: boolean = false;
    esBeneficio: boolean = false;




    numero_licencia: any;
  constructor(private GestorService:GestorService) { }

  ngOnInit(): void {
    //Verificar si existe sesion previa en localStorage
    if(localStorage.getItem('token')!=null){
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
        localStorage.clear();

        //Ocultar opciones
        this.verOpciones= false;
        //Mostrar login
        this.verLoginn();
      } else if (result.isDenied) {
        Swal.fire('No se ha cerrado sesión', '', 'info')
      }
    }
    )
  }

verLoginn(){
  console.log("Registro de login")
  this.esAgricultor=false;
  this.esTrasportista=false;
  this.esPesoCabal=false;
  this.esBeneficio=false;
  this.verRegistro= false;
  this.verOpciones= false;
  this.verLogin= true;
  this.verCrearCuenta= false;
  this.verCrearTransporte= false;
  this.verCrearTransportista= false;
  this.verIngresoGarita= false;
  this.verInactivarTransportista= false;
  this.verRegistrarParcialidad= false;
  this.verQR= false;
  this.verPesoCabal= false;
  this.verListado= false;

}


  //Ver Registro de Beneficio
  verRegistroBeneficio(){
    console.log("Registro de Beneficio")
    this.verRegistro= true;
    this.verOpciones= false;
    this.verLogin= false;
    this.verCrearCuenta= false;
    this.verCrearTransporte= false;
    this.verCrearTransportista= false;
    this.verIngresoGarita= false;
    this.verInactivarTransportista= false;
    this.verRegistrarParcialidad= false;
    this.verQR= false;
    this.verPesoCabal= false;
    this.verListado= false;

  }

  //ver crear transportista
  onVerCrearTransportista(){
    console.log("Crear Transportista")
    this.verCrearTransportista= true;
    this.verCrearTransporte= false;
    this.verLogin= false;
    this.verCrearCuenta= false;
    this.verIngresoGarita= false;
    this.verInactivarTransportista= false;
    this.verRegistrarParcialidad= false;
    this.verQR= false;
    this.verPesoCabal= false;
    this.verListado= false;

  }
  onVerCrearTransporte(){
    console.log("Crear Transporte")
    this.verCrearTransporte= true;
    this.verCrearTransportista= false;
    this.verLogin= false;
    this.verCrearCuenta= false;
    this.verIngresoGarita= false;
    this.verInactivarTransportista= false;
    this.verRegistrarParcialidad= false;
    this.verQR= false;
    this.verPesoCabal= false;
    this.verListado= false;
  }
  onVerCrearCuenta(){
    console.log("Crear Cuenta")
    this.verCrearCuenta= true;
    this.verCrearTransporte= false;
    this.verCrearTransportista= false;
    this.verLogin= false;
    this.verIngresoGarita= false;
    this.verInactivarTransportista= false;
    this.verRegistrarParcialidad= false;
    this.verQR= false;
    this.verPesoCabal= false;
    this.verListado= false;

  }
  onVerIngresoGarita(){
    console.log("Ingreso a Garita")
    this.verIngresoGarita= true;
    this.verCrearCuenta= false;
    this.verCrearTransporte= false;
    this.verCrearTransportista= false;
    this.verLogin= false;
    this.verInactivarTransportista= false;
    this.verRegistrarParcialidad= false;
    this.verQR= false;
    this.verPesoCabal= false;
    this.verListado= false;

  }
  onVerRegistrarParcialidad(){
    console.log("Registrar Parcialidad")
    this.verRegistrarParcialidad= true;
    this.verIngresoGarita= false;
    this.verCrearCuenta= false;
    this.verCrearTransporte= false;
    this.verCrearTransportista= false;
    this.verLogin= false;
    this.verInactivarTransportista= false;
    this.verQR= false;
    this.verPesoCabal= false;
    this.verListado= false;
  }


  onVerInactivarTransportista(){
    console.log("Inactivar Transportista")
    this.verInactivarTransportista= true;
    this.verIngresoGarita= false;
    this.verCrearCuenta= false;
    this.verCrearTransporte= false;
    this.verCrearTransportista= false;
    this.verLogin= false;
    this.verRegistrarParcialidad= false;
    this.verQR= false;
    this.verPesoCabal= false;
    this.verListado= false;
  }

  //ver QR
  onVerQR(event: any){
    this.numero_licencia = event;
    console.log("Numero de licencia",this.numero_licencia)
    if( this.numero_licencia!=null){
    console.log("Ver QR")
    this.verQR= true;
    this.verLogin= false;
    this.verOpciones= true;
    this.verCrearTransportista= false;
    this.verCrearTransporte= false;
    this.verCrearCuenta= false;
    this.verIngresoGarita= false;
    this.verInactivarTransportista= false;
    this.verRegistrarParcialidad= false;
    this.verPesoCabal= false;
    this.verListado= false;
    }

  }
  onVerPesoCabal(){
    console.log("Peso Cabal")
    this.verPesoCabal= true;
    this.verQR= false;
    this.verLogin= false;
    this.verOpciones= true;
    this.verCrearTransportista= false;
    this.verCrearTransporte= false;
    this.verCrearCuenta= false;
    this.verIngresoGarita= false;
    this.verInactivarTransportista= false;
    this.verRegistrarParcialidad= false;
    this.verListado= false;
  }

  onVerListado(){
    console.log("Listado")
    this.verListado= true;
    this.verPesoCabal= false;
    this.verQR= false;
    this.verLogin= false;
    this.verOpciones= true;
    this.verCrearTransportista= false;
    this.verCrearTransporte= false;
    this.verCrearCuenta= false;
    this.verIngresoGarita= false;
    this.verInactivarTransportista= false;
    this.verRegistrarParcialidad= false;

  }

  //valida el rol del usuario
  validarRol(){
    console.log("Validar rol")
    console.log(localStorage.getItem('rol'))
    let rol = localStorage.getItem('rol');
    if(rol=='ROLE_ADMIN'){
      console.log("Es admin")
      this.esAgricultor=true;
      this.esTrasportista=true;
      this.esPesoCabal=true;
      this.verOpciones= true;
      this.verLogin= false;
      this.esBeneficio=true;
    }else if(rol=="ROLE_AGRICULTOR"){
      console.log("Es agricultor")
      this.esAgricultor=true;
      this.verOpciones= true;
      this.verLogin= false;
      this.esPesoCabal=false;
      this.esTrasportista=false;

    }else if(rol=="ROL_PESOCABAL"){
      console.log("Es pesoCabal")
      this.esPesoCabal=true;
      this.verOpciones= true;
      this.verLogin= false;
      this.esAgricultor=false;
      this.esTrasportista=false;
    }
    else if(rol=="ROLE_USER"){
      console.log("Es usuario")
      this.esBeneficio=true;
      this.verOpciones= true;
      this.verLogin= false;
      this.esAgricultor=false;
      this.esTrasportista=false;
      this.esPesoCabal=false;

    }
  }





}

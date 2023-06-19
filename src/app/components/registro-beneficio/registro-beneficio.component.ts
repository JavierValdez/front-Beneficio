import { Component, OnInit } from '@angular/core';
import { GestorService } from 'src/app/services/gestor.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro-beneficio',
  templateUrl: './registro-beneficio.component.html',
  styleUrls: ['./registro-beneficio.component.css']
})
export class RegistroBeneficioComponent implements OnInit {
  nombre: string="";
  apellido: string="";
  correo: string="";
  contrasena: string="";
  direccion: string="";
  edad: number=0;
  nit: string="";
  telefono: string="";
  nombreUsuario: string="";


  constructor(private GestorService:GestorService ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    const registroData = {
      nombre: this.nombre +this.apellido,
      email: this.correo,
      password: this.contrasena,
      direccion: this.direccion,
      fecha_creacion: new Date(),
      nit: this.nit,
      telefono: this.telefono,
      roles:[
        "admin"
      ],
      nombreUsuario: this.nombreUsuario,
};


    console.log(registroData);
    //Petición a la API
    this.GestorService.crearUsuario(registroData).subscribe(
      (res:any)=>{
        console.log(res);
        //ventana con sweetalert2 y boton aceptar que reinicia la ventana
        Swal.fire({
          title: "Usuario creado",
          text: "Usuario creado correctamente",
          icon: "success",
          confirmButtonText: "Aceptar",
        }).then((result) => {
          if (result.isConfirmed) {
            //reinicio de registro data

          }
        });







        //reinicio de registro data
        this.nombre="";
        this.apellido="";
        this.correo="";
        this.contrasena="";
        this.direccion="";
        this.edad=0;
        this.nit="";
        this.telefono="";
        this.nombreUsuario="";


      },
      (err:any)=>{
        console.log(err);
        //ventana con sweetalert2 y boton aceptar
        Swal.fire({
          title: "Error",
          text: "Error al crear el usuario",
          icon: "error",
          confirmButtonText: "Aceptar",
        });


      }
    );
    // Aquí puedes enviar los datos del formulario a tu API
  }
}

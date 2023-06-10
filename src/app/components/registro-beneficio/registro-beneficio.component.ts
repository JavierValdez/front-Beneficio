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

  constructor(private GestorService:GestorService ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    const registroData = {
      nombre: this.nombre,
      apellido: this.apellido,
      correo: this.correo,
      contrasena: this.contrasena,
      direccion: this.direccion,
      edad: this.edad,
      nit: this.nit,
      telefono: this.telefono,
      rol:"none"
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

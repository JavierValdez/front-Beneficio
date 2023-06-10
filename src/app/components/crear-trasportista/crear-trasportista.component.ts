import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgModel } from '@angular/forms'; // Importa NgModel para utilizar [(ngModel)]
import { GestorService } from 'src/app/services/gestor.service';
//Importaciond de swwtalert2
import Swal from 'sweetalert2';
@Component({
  selector: 'app-crear-trasportista',
  templateUrl: './crear-trasportista.component.html',
  styleUrls: ['./crear-trasportista.component.css']
})
export class CrearTrasportistaComponent implements OnInit {
  apellidos: string = "";
  nombres: string = "";
  numero_licencia: string = "";
  tipo_licencia: string = "";
  imagenSeleccionada: File | null = null;
  imagenBase64: any = "";
  contrasena: string = "";
  //Emite evento cuando se carga con parametros
  @Output()
  imagenCargada = new EventEmitter<string>();

  //Emite cierre de ventana
  @Output()
  closeComponent = new EventEmitter<any>();


  constructor(private gestorService: GestorService) { }

  ngOnInit(): void {
  }

  crearTransportista() {
    //console datos
    console.log("Datos del formulario");
    console.log(this.apellidos, this.nombres, this.numero_licencia, this.tipo_licencia);

    Swal.fire({
      title: 'Confirmación',
      text: 'Ingrese su contraseña para confirmar la creación del transportista',
      input: 'password',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        const password = result.value;
        // Hacer algo con la contraseña almacenada en la variable 'password'
        console.log('Contraseña ingresada:', password);

        //Conexion al servicio, funciona en caso de un error 400
        //arma el json a enviar con los datos this.apellidos, this.nombres, this.numero_licencia, this.tipo_licencia, this.imagenBase64
        let json = {
          "apellidos": this.apellidos,
          "nombres": this.nombres,
          "numero_licencia": this.numero_licencia,
          "tipo_licencia": this.tipo_licencia,
          "imagen": this.imagenBase64,
          'contrasena': this.contrasena
        }

        console.log("Json a enviar");
        console.log(json);
        console.log("Contraseña a enviar");
        console.log(password);
        try {
          this.gestorService.crearTransportista(json,password).subscribe(
            (data: any) => {
              console.log(data);
              //Evalua si la respuesta fue "El Transportista debe tener licencia tipo A"
              if (data.resultado == "El Transportista fue Inscrito Correctamente en el Beneficio") {
                //Muestra mensaje de exito y emite evento de cierre de ventana al precionar el boton
                Swal.fire({
                  icon: 'success',
                  title: 'Exito',
                  text: data.resultado
                }).then((result) => {
                  if (result.isConfirmed) {
                    this.closeComponent.emit();
                  }
                }
                );

              }
              else {
                Swal.fire({
                  icon: 'error',
                  title: 'Error',
                  text: data.resultado
                });
              }
            },
          );
        }
        catch (error) {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'El transportista no fue creado'
          });
        }

      }
    });



  }
  onImageSelected(event: any) {
    const file = event.target.files[0];

    const reader = new FileReader();
    reader.onload = () => {
      const base64String = reader.result as string;
      this.imagenBase64 = base64String.split(',')[1];
    };

    reader.readAsDataURL(file);
    //mostrar despues de 5 segundos
    setTimeout(() => {

      console.log(this.imagenBase64);
    }, 100);


  }

}

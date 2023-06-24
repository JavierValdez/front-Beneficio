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
  usuario: any = "";
  //Emite evento cuando se carga con parametros
  @Output()
  imagenCargada = new EventEmitter<string>();

  //Emite cierre de ventana
  @Output()
  closeComponent = new EventEmitter<any>();
verQR: boolean = false;


  constructor(private gestorService: GestorService) { }

  ngOnInit(): void {
  }

  crearTransportista() {
    //console datos
    console.log("Datos del formulario");
    console.log(this.apellidos, this.nombres, this.numero_licencia, this.tipo_licencia,this.usuario);

    if(this.apellidos=='' && this.nombres=='' && this.numero_licencia=='' && this.tipo_licencia=='' && this.imagenBase64==''){

      Swal.fire({
        icon: 'error',
        title: 'Campos Vacios',
        text: 'Debera llenar todos los campos'
      })
   
 
    }else if(this.nombres==''){

      Swal.fire({
        icon: 'error',
        title: 'Campos Vacios',
        text: 'Debera llenar el campo de Nombre'
      })

    }else if(this.apellidos==''){
      Swal.fire({
        icon: 'error',
        title: 'Campos Vacios',
        text: 'Debera llenar el campo de Apellido'
      })
    }
    else if(this.tipo_licencia==''){
      Swal.fire({
        icon: 'error',
        title: 'Campos Vacios',
        text: 'Debera llenar el campo de Tipo Licencia'
      })
    }
    else if(this.numero_licencia==''){
      Swal.fire({
        icon: 'error',
        title: 'Campos Vacios',
        text: 'Debera llenar el campo de Numero de licencia'
      })
    }


    else{

    

    
    // Swal.fire({


    // }).then((result) => {
    //   if (result.isConfirmed) {
        // const password = result.value;
        // Hacer algo con la contraseña almacenada en la variable 'password'
        // console.log('Contraseña ingresada:', password);

        //Conexion al servicio, funciona en caso de un error 400
        //arma el json a enviar con los datos this.apellidos, this.nombres, this.numero_licencia, this.tipo_licencia, this.imagenBase64
        let json = {
          "apellidos": this.apellidos,
          "nombres": this.nombres,
          "numero_licencia": this.numero_licencia,
          "tipo_licencia": this.tipo_licencia,
          // "imagen": this.imagenBase64,
          'usuario_creo': localStorage.getItem('usuario'),
          'foto': this.imagenBase64
        }

        console.log("Json a enviar");
        console.log(json);
        console.log("Contraseña a enviar");
        //console.log(password);
        try {
          this.gestorService.crearTransportista(json).subscribe(
            (data: any) => {
              console.log("Respuesta del servicio");
              console.log(<string>data.mensaje);
              //Evalua si la respuesta fue "El Transportista debe tener licencia tipo A"
              let mensaje = "El Transportista debe tener licencia tipo A"
              console.log(data.mensaje==mensaje);
              if (mensaje == data.mensaje) {
                Swal.fire({
                  icon: 'error',
                  title: 'Error',
                  text: data.mensaje
                });

              }else{
                Swal.fire({
                  icon: 'success',
                  title: 'Exito',
                  text: data.resultado
                }).then((result) => {
                  if (result.isConfirmed) {
                    this.closeComponent.emit(this.numero_licencia);
                  }
                }
                );
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
    }
  //   });
  // }



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

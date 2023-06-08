import { Component, OnInit } from '@angular/core';
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

  constructor(private gestorService: GestorService) { }

  ngOnInit(): void {
  }

  crearTransportista() {
    //console datos
    console.log("Datos del formulario");
    console.log(this.apellidos, this.nombres, this.numero_licencia, this.tipo_licencia);

    //Conexion al servicio, funciona en caso de un error 400
    try
    {
      this.gestorService.crearTransportista(this.apellidos, this.nombres, this.numero_licencia, this.tipo_licencia).subscribe(
        (data: any) => {
          console.log(data);
          //Evalua si la respuesta fue "El Transportista debe tener licencia tipo A"
          if (data.resultado == "El Transportista fue Inscrito Correctamente en el Beneficio")
          {
          Swal.fire({
            icon: 'success',
            title: 'Transportista creado',
            text: 'El transportista fue creado exitosamente'
          });
        }
        else
        {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: data.resultado
          });
        }
        },
      );
    }
    catch (error)
    {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'El transportista no fue creado'
      });
    }







  }
}

import { Component, OnInit } from '@angular/core';
import { GestorService } from 'src/app/services/gestor.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-inactivar-trasportista',
  templateUrl: './inactivar-trasportista.component.html',
  styleUrls: ['./inactivar-trasportista.component.css']
})
export class InactivarTrasportistaComponent implements OnInit {

  constructor(private gestorService: GestorService) { }
  licencias: any[] = [];

  ngOnInit(): void {
    this.listarTransportistas();
  }

  inactivarTransportista(licencia: any) {
    console.log(licencia);
    let json={
      "apellidos": licencia.apellidos,
      "nombres": licencia.nombres,
      "numero_licencia": licencia.numero_licencia,
      "tipo_licencia": licencia.tipo_licencia,
      "usuario_creo": licencia.usuario_creo,
    }

    this.gestorService.inactivarTransportista(json).subscribe((respuesta: any) => {
      console.log(respuesta);
      //Alerta de confirmacion
      console.log(respuesta);
      Swal.fire({
        title: 'Confirmación',
        text: respuesta.mensaje,
        icon: 'success',
        confirmButtonText: 'Aceptar'
      });
      //reinicio de formulario

      // hacer algo con la respuesta
    });
    //remover de licencias licencia
    this.licencias = this.licencias.filter((licencia: any) => licencia.numero_licencia != licencia.numero_licencia);

    // Lógica para inactivar el transportista
  }

  // Lógica para listar los transportistas
  listarTransportistas() {
    //get para obtener los transportistas
    this.gestorService.getTransportistas().subscribe((respuesta: any) => {
      console.log(respuesta);
      this.licencias = respuesta;
      //si estado es 1030 remover
      this.licencias = this.licencias.filter((licencia: any) => licencia.estado != 1030);

    }
    );
  }


}

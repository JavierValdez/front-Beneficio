import { Component, OnInit } from '@angular/core';
import { GestorService } from 'src/app/services/gestor.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-listado-cuentas',
  templateUrl: './listado-cuentas.component.html',
  styleUrls: ['./listado-cuentas.component.css']
})
export class ListadoCuentasComponent implements OnInit {
  cuentas: any=[];
  constructor(private gestorService:GestorService) { }

  ngOnInit(): void {
    this.obtenerCuentas();
  }

  //Obtener listado de cuentas
  public obtenerCuentas(){
    //pbtener usuario de local storage
    let usuario = localStorage.getItem('usuario');
    Swal.fire({
      title: 'Espere',
      text: 'Obteniendo Datos',
      icon: 'info',
      allowOutsideClick: false
    });
    Swal.showLoading();
    this.gestorService.listadoCuentas(usuario).subscribe(
      (response: any) => {
        Swal.close();
        console.log(response);
        this.cuentas = response;
      },
      (error:any) => {
        Swal.close();
        console.log(error);

      }
    );
  }

}

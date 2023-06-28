import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GestorService } from 'src/app/services/gestor.service';
import { PdfServiceService } from 'src/app/services/pdf-service.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-peso-cabal',
  templateUrl: './peso-cabal.component.html',
  styleUrls: ['./peso-cabal.component.css']
})
export class PesoCabalComponent implements OnInit {


  formulario: FormGroup | any;
  enviado = false;

  constructor(private formBuilder: FormBuilder, private gestorService: GestorService, private pdfService:PdfServiceService ) { }

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      id_cuenta: ['', Validators.required],
      matricula: ['', Validators.required],
      numero_licencia: ['', Validators.required],
      peso_marcado: ['', Validators.required],
      peso_de_camion: ['', Validators.required],
      agricultor: ['', Validators.required],
      usuario_registro_pesaje: ['', Validators.required]
    });
  }

  enviar() {
    this.enviado = true;
    //toma usuario_registro_pesaje de localstorage
    this.formulario.controls['usuario_registro_pesaje'].setValue(localStorage.getItem('usuario'));
    console.log("enviado")

    let ErroresForm = '';

    //Valida que todos los campos esten completos, de lo contrario muestra errores para cada uno con sweetalert2
    if (this.formulario.controls.matricula.value == '') {
      ErroresForm = 'Matricula vacia \n';
    }
    else if (this.formulario.controls.numero_licencia.value == '') {
      ErroresForm = ErroresForm + 'Numero de licencia vacio \n';
    }
    else if (this.formulario.controls.peso_marcado.value == '') {
      ErroresForm = ErroresForm + 'Peso marcado vacio \n';
    }
    else if (this.formulario.controls.peso_de_camion.value == '') {
      ErroresForm = ErroresForm + 'Peso de camion vacio \n';
    }
    else if (this.formulario.controls.agricultor.value == '') {
      ErroresForm = ErroresForm + 'Agricultor vacio \n';
    }
    else if (this.formulario.controls.usuario_registro_pesaje.value == '') {
      ErroresForm = ErroresForm + 'Usuario de registro de pesaje vacio \n';
    }

    if (ErroresForm != '') {
      Swal.fire({
        icon: 'error',
        title: 'Campos Vacios',
        text: ErroresForm
      })
    }
    else {
      //Envia los datos registrarPesaje() en gestor.service.ts
      this.gestorService.registrarPesaje(this.formulario.value).subscribe(
        (data: any) => {
          //Toma el mensaje de {"mensaje":"No hay registros de la cuenta Ingresada"}
          if (data.mensaje == 'Pesaje Almacenado con exito y Cuenta actualizada ') {
            Swal.fire({
              icon: 'success',
              title: 'Pesaje registrado',
              text: data.mensaje
            })
            //consultaSumatoria() en gestor.service.ts
            this.consultaEstado(this.formulario.value);

          }
          else {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: data.mensaje
            })
          }


        }
      );
    }
    console.log(this.formulario);




    // Aquí se puede enviar el formulario al servidor o realizar cualquier otra acción necesaria
  }

  //consultaSumatoria() en gestor.service.ts
  consultarSumatoria(json: any) {
    this.gestorService.consultaSumatoria(json).subscribe(
      (data: any) => {

        console.log('Impresion de datos');
        console.log(data.sumatoriaPeso);
        console.log(data.peso_total_de_envio);
        //Genera el pdf con los datos de la sumatoria
        //calculo de exceso o falta entre sumatoria de peso y peso total de envio si excede el 5%
        let porcentajeExceso=0;
        let mensaje='';
        if(data.sumatoriaPeso>data.peso_total_de_envio){

          let exceso=data.sumatoriaPeso-data.peso_total_de_envio;
          porcentajeExceso=exceso*100/data.peso_total_de_envio;
          if(porcentajeExceso>5){
            mensaje='Exceso de peso';

          }
          else{
            porcentajeExceso=0;
          }
        }
        else{
          let falta=data.peso_total_de_envio-data.sumatoriaPeso;
          porcentajeExceso=falta*100/data.peso_total_de_envio;
          if(porcentajeExceso>5){
          mensaje='Falta de peso';
          }
          else{
            porcentajeExceso=0;
          }
        }





        let datos={
          sumatoriaPeso:data.sumatoriaPeso,
          peso_total_de_envio:data.peso_total_de_envio,
          porcentajeExceso:porcentajeExceso,
          mensaje:mensaje
        }


     let html = `
        <div style="width:275px">
          <h1>Datos de Envío</h1>
          <p>Sumatoria de Peso: ${datos.sumatoriaPeso}</p>
          <p>Peso Total de Envío: ${datos.peso_total_de_envio}</p>
          <p>Porcentaje de Exceso: ${datos.porcentajeExceso}</p>
          <p>Mensaje: ${datos.mensaje}</p>
        </div>
        `;

        this.pdfService.generatePdf(html);


      }
    );
  }
  //consultaEstado() en gestor.service.ts
  consultaEstado(json: any) {
    this.gestorService.consultaEstado(json).subscribe(
      (data: any) => {
        if(data.estado=='Pesaje Finalizado'){
          //consultarSumatoria
          this.consultarSumatoria(this.formulario.value);

        }
        //imprimir valor formulario
        console.log(this.formulario.value);
        console.log('Forced to print');

      }
    );
  }


}

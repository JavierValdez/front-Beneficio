import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GestorService } from 'src/app/services/gestor.service';
import { PdfServiceService } from 'src/app/services/pdf-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registrar-parcialidad',
  templateUrl: './registrar-parcialidad.component.html',
  styleUrls: ['./registrar-parcialidad.component.css']
})
export class RegistrarParcialidadComponent implements OnInit {

  formulario: FormGroup|any ;
  enviado = false;

  constructor(private formBuilder: FormBuilder,private gestorService:GestorService,private servicioPdf:PdfServiceService ) { }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      id_parcialidad:['', Validators.required],
      cuenta: ['', Validators.required],
      matricula: ['', Validators.required],
      numero_licencia: ['', Validators.required],
      peso_de_envio: ['', Validators.required],
      usuario: ['', Validators.required]
    });
  }

  enviar() {

    this.enviado = true;
    console.log(this.formulario);
    console.log(this.formulario.value);
    //setea el valor de usuario_creo
    this.formulario.controls['usuario'].setValue(localStorage.getItem('usuario'));
    console.log("enviado")
    var id = Math.random().toString(36).substr(2, 9);
    this.formulario.controls['id_parcialidad'].setValue(id);
    console.log("enviado id",this.formulario.controls.id_parcialidad.value)

    if(
      this.formulario.controls.matricula.value==''&&
    this.formulario.controls.numero_licencia.value==''&&
    this.formulario.controls.peso_de_envio.value==''&&
    this.formulario.controls.cuenta.value==''
) {

  console.log("emtrooo")
      Swal.fire({
        icon: 'error',
        title: 'Campos Vacios',
        text: 'Debera llenar todos los campos'
      })
    }else if (this.formulario.controls.id_parcialidad.value=='') {
      console.log('entrooooooooooo Id cuenta',this.formulario.controls.id_parcialidad.value);

      Swal.fire({
        icon: 'error',
        title: 'Campos Vacios',
        text: 'Debera llenar el campo de id cuenta'
      })
    }


    else if (this.formulario.controls.matricula.value=='') {
      console.log('entroo');
      Swal.fire({
        icon: 'error',
        title: 'Campos Vacios',
        text: 'Debera llenar el campo de matricula'
      })
    }


      else if (this.formulario.controls.numero_licencia.value=='') {
        console.log('entroo');
        Swal.fire({
          icon: 'error',
          title: 'Campos Vacios',
          text: 'Debera llenar el campo de numero de licencia'
        })
      }
      else if (this.formulario.controls.peso_de_envio.value=='') {
        console.log('entroo');
        Swal.fire({
          icon: 'error',
          title: 'Campos Vacios',
          text: 'Debera llenar el campo de peso total de envio'
        })
      }
      else if (this.formulario.controls.cuenta.value=='') {
        console.log('entroo');
        Swal.fire({
          icon: 'error',
          title: 'Campos Vacios',
          text: 'Debera llenar el campo de cuenta'
        })
      }
      else{
    console.log(this.formulario.value);
    //envio de datos a gestor service

    this.gestorService.registrarParcialidad(this.formulario.value).subscribe((respuesta: any) => {
      console.log(respuesta);

      if(respuesta.mensaje!='Parcialidad Registrada con exito'){

        Swal.fire({
          icon: 'error',
          title: 'Operacion fallida,',
          text: respuesta.mensaje
        })
      }else{
      //Alerta de confirmacion con boton Descargar Constancia
      Swal.fire({
        title: 'Registro de parcialidad exitoso',
        text: '¿Desea descargar la constancia?',
        icon: 'success',
        showCancelButton: true,
        confirmButtonText: 'Descargar',
        cancelButtonText: 'No, gracias'
      }).then((result) => {
        if (result.isConfirmed) {
          //Descargar constancia
          console.log("Descargando constancia");
          console.log(this.generarHTML());
          this.servicioPdf.generatePdf(this.generarHTML());
          setTimeout(( )=>{
            this.formulario.reset();
            this.formulario.controls.id_parcialidad.value=''
            this.formulario.controls.matricula.value=''
            this.formulario.controls.numero_licencia.value=''
            this.formulario.controls.peso_de_envio.value=''
            this.formulario.controls.cuenta.value=''
            this.enviado = false;
          },2000
          );
        }else{
          this.formulario.reset();
          this.formulario.controls.id_parcialidad.value=''
          this.formulario.controls.matricula.value=''
          this.formulario.controls.numero_licencia.value=''
          this.formulario.controls.peso_de_envio.value=''
          this.formulario.controls.cuenta.value=''
          this.enviado = false;
        }
      })
    }


      //reinicio de formulario

      // hacer algo con la respuesta
    });
  }
  }
  generarHTML() {
    const titulo = 'Registro de Parcialidad';
    let html = '<h8>' + titulo + '</h9>';
    html += '<table style="margin: 0 auto; font-size: 3px;">';

    Object.keys(this.formulario.controls).forEach(key => {
      const label = key.replace('_', ' ').toUpperCase();
      const value = this.formulario.get(key).value;
      html += '<tr><td style="padding: 5px;"><strong>' + label + ':</strong></td><td style="padding: 5px;">' + value + '</td></tr>';
    });

    html += '</table>';
    return html;
  }



}

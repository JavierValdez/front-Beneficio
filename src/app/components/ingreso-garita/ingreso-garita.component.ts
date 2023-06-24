import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GestorService } from 'src/app/services/gestor.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ingreso-garita',
  templateUrl: './ingreso-garita.component.html',
  styleUrls: ['./ingreso-garita.component.css']
})
export class IngresoGaritaComponent implements OnInit {

  formulario: FormGroup | any;
  enviado = false;

  constructor(private formBuilder: FormBuilder, private gestorService: GestorService) { }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      id_cuenta: ['', Validators.required],
      id_ingreso: ['', Validators.required],
      id_parcialidad: ['', Validators.required],
      licencia_autorizada: ['', Validators.required],
      matricula_autorizada: ['', Validators.required],
      usuario_agricultor: ['', Validators.required],
      usuario_beneficio: ['', Validators.required]
    });
  }

  enviar() {
    this.enviado = true;
    console.log(this.formulario);
    console.log(this.formulario.value);
    //setea el valor de usuario_creo
    this.formulario.controls['usuario_beneficio'].setValue(localStorage.getItem('usuario'));
    console.log("enviado")
    var id = Math.random().toString(36).substr(2, 9);
    this.formulario.controls['id_ingreso'].setValue(id);
    console.log("enviado id", this.formulario.controls.id_ingreso.value)

    if (this.formulario.controls.id_cuenta.value == '' &&
      this.formulario.controls.id_parcialidad.value == '' &&
      this.formulario.controls.licencia_autorizada.value == '' &&
      this.formulario.controls.matricula_autorizada.value == '' &&
      this.formulario.controls.usuario_agricultor.value == '' &&
      this.formulario.controls.usuario_beneficio.value == ''
    ) {

      console.log("emtrooo")
      Swal.fire({
        icon: 'error',
        title: 'Campos Vacios',
        text: 'Debera llenar todos los campos'
      })
    }
    else if (this.formulario.controls.id_cuenta.value == '') {
      console.log('entroo');
      Swal.fire({
        icon: 'error',
        title: 'Campos Vacios',
        text: 'Debera llenar el campo de id cuenta'
      })
    }
    else if (this.formulario.controls.id_parcialidad.value == '') {
      console.log('entroo');
      Swal.fire({
        icon: 'error',
        title: 'Campos Vacios',
        text: 'Debera llenar el campo de id_parcialidad'
      })
    }
    else if (this.formulario.controls.licencia_autorizada.value == '') {
      console.log('entroo');
      Swal.fire({
        icon: 'error',
        title: 'Campos Vacios',
        text: 'Debera llenar el campo de licencia autorizada'
      })
    }
    else if (this.formulario.controls.matricula_autorizada.value == '') {
      console.log('entroo');
      Swal.fire({
        icon: 'error',
        title: 'Campos Vacios',
        text: 'Debera llenar el campo de matricula autorizada'
      })
    }
    else if (this.formulario.controls.usuario_agricultor.value == '') {
      console.log('entroo');
      Swal.fire({
        icon: 'error',
        title: 'Campos Vacios',
        text: 'Debera llenar el campo de Usuario agricultor'
      })
    }
    else if (this.formulario.controls.usuario_beneficio.value == '') {
      console.log('entroo');
      Swal.fire({
        icon: 'error',
        title: 'Campos Vacios',
        text: 'Debera llenar el campo de Usuario Beneficio'
      })
    }
    else {
      console.log(this.formulario.value);
      //envio de datos a gestor service

      this.gestorService.ingresoGarita(this.formulario.value).subscribe((respuesta: any) => {
        console.log(respuesta);
        //Alerta de confirmacion
        Swal.fire({
          title: 'Confirmación',
          text: respuesta.mensaje,
          icon: 'success',
          confirmButtonText: 'Aceptar'
        });
        //reinicio de formulario
        this.formulario.reset();
        this.formulario.controls.id_cuenta.value == ''
        this.formulario.controls.id_ingreso.value == ''
        this.formulario.controls.licencia_autorizada.value == ''
        this.formulario.controls.matricula_autorizada.value == ''
        this.formulario.controls.usuario_agricultor.value == ''
        this.formulario.controls.usuario_beneficio.value == ''
        this.formulario.controls.id_parcialidad.value == ''


        // hacer algo con la respuesta
      });
      // Lógica para enviar el formulario
    }


  }
}

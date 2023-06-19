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

  constructor(private formBuilder: FormBuilder,private gestorService:GestorService ) { }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      id_cuenta: ['', Validators.required],
      id_ingreso: ['', Validators.required],
      licencia_autorizada: ['', Validators.required],
      matricula_autorizada: ['', Validators.required],
      usuario_agricultor: ['', Validators.required]
    });
  }

  enviar() {
    this.enviado = true;
    console.log(this.formulario);
    console.log(this.formulario.value);
    //setea el valor de usuario_creo
    this.formulario.controls['usuario_agricultor'].setValue(localStorage.getItem('usuario'));
    console.log("enviado")
    if (this.formulario.invalid) {
      return;
    }
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
      this.enviado = false;

      // hacer algo con la respuesta
    });
    // Lógica para enviar el formulario
  }



}

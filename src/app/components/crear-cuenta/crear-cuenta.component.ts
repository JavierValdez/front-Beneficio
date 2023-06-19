import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GestorService } from 'src/app/services/gestor.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-crear-cuenta',
  templateUrl: './crear-cuenta.component.html',
  styleUrls: ['./crear-cuenta.component.css']
})
export class CrearCuentaComponent implements OnInit {

  formulario: FormGroup | any ;
  enviado = false;

  constructor(private formBuilder: FormBuilder, private gestorService:GestorService) { }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      matriculas_autorizadas: ['', Validators.required],
      numero_parcialidades: ['', Validators.required],
      peso_total_de_envio: ['', Validators.required],
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

    this.gestorService.postCuenta(this.formulario.value).subscribe((respuesta: any) => {
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
  }

}

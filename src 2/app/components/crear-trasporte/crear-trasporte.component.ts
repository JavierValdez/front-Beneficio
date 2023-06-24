import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GestorService } from 'src/app/services/gestor.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-crear-trasporte',
  templateUrl: './crear-trasporte.component.html',
  styleUrls: ['./crear-trasporte.component.css']
})
export class CrearTrasporteComponent implements OnInit {

  formulario: FormGroup | any;
  enviado = false;

  constructor(private formBuilder: FormBuilder,private gestorService: GestorService ) { }

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      color: ['', Validators.required],
      marca: ['', Validators.required],
      matricula: ['', Validators.required],
      modelo: ['', Validators.required],
      numero_ejes: ['', Validators.required],
      peso_de_camion: ['', Validators.required],
      usuario_creo: ['', Validators.required]
    });
  }

  enviar() {
    this.enviado = true;
    console.log(this.formulario);
    console.log(this.formulario.value);
    //setea el valor de usuario_creo
    this.formulario.controls['usuario_creo'].setValue(localStorage.getItem('usuario'));
    console.log("enviado")
    if (this.formulario.invalid) {
      return;
    }
    console.log(this.formulario.value);
    //envio de datos a gestor service

    this.gestorService.postTransporte(this.formulario.value).subscribe((respuesta: any) => {
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

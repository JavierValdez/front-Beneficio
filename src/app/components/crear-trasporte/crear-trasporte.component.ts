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
    console.log(this.formulario.controls.peso_de_camion.value);

    if(this.formulario.controls.peso_de_camion.value=='' && 
    this.formulario.controls.numero_ejes.value=='' &&
    this.formulario.controls.modelo.value==''&&
    this.formulario.controls.matricula.value=='' &&
    this.formulario.controls.marca.value=='' &&
    this.formulario.controls.color .value==''
     ){
      console.log("emtrooo")
      Swal.fire({
        icon: 'error',
        title: 'Campos Vacios',
        text: 'Debera llenar todos los campos'
      })
     }
    else if (this.formulario.controls.color.value=='') {
      console.log('entroo');
      Swal.fire({
        icon: 'error',
        title: 'Campos Vacios',
        text: 'Debera llenar el campo de color'
      })
    }
      else if (this.formulario.controls.marca.value=='') {
        console.log('entroo');
        Swal.fire({
          icon: 'error',
          title: 'Campos Vacios',
          text: 'Debera llenar el campo de marca'
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
      
      else if (this.formulario.controls.modelo.value=='') {
        console.log('entroo');
        Swal.fire({
          icon: 'error',
          title: 'Campos Vacios',
          text: 'Debera llenar el campo de modelo'
        })
      }
    
     
      else if(this.formulario.controls.numero_ejes.value=='') {
        console.log('entroo');
        Swal.fire({
          icon: 'error',
          title: 'Campos Vacios',
          text: 'Debera llenar el campo de numero de ejes'
        })
      }
      else if (this.formulario.controls.peso_de_camion.value=='') {
        console.log('entroo');
        Swal.fire({
          icon: 'error',
          title: 'Campos Vacios',
          text: 'Debera llenar el campo de peso'
        })
      }

    else{
    
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
      this.formulario.controls.peso_de_camion.value='';
    this.formulario.controls.numero_ejes.value='';
    this.formulario.controls.modelo.value='';
    this.formulario.controls.matricula.value='';
    this.formulario.controls.marca.value='';
    this.formulario.controls.color .value='';
      this.enviado = false;

      // hacer algo con la respuesta
    });
  }
  }
}

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
      id_cuenta:['', Validators.required],
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
    //generacion de id aleatorio unico
    var id = Math.random().toString(36).substr(2, 9);
    this.formulario.controls['id_cuenta'].setValue(id);
    console.log("enviado id",this.formulario.controls.id_cuenta.value)
    if ( this.formulario.controls.id_cuenta.value==''&&
      this.formulario.controls.matriculas_autorizadas.value==''&&
    this.formulario.controls.numero_parcialidades.value==''&&
    this.formulario.controls.peso_total_de_envio.value==''
) {

  console.log("emtrooo id")
      Swal.fire({
        icon: 'error',
        title: 'Campos Vacios',
        text: 'Debera llenar todos los campos'
      })
    }else if (this.formulario.controls.id_cuenta.value=='') {
      console.log('entrooooooooooo Id cuenta',this.formulario.controls.id_cuenta.value);

      Swal.fire({
        icon: 'error',
        title: 'Campos Vacios',
        text: 'Debera llenar el campo de id cuenta'
      })
    }


    else if (this.formulario.controls.matriculas_autorizadas.value=='') {
      console.log('entroo matriculas');
      Swal.fire({
        icon: 'error',
        title: 'Campos Vacios',
        text: 'Debera llenar el campo de matriculas autorizadas'
      })
    }


      else if (this.formulario.controls.numero_parcialidades.value=='') {
        console.log('entroo');
        Swal.fire({
          icon: 'error',
          title: 'Campos Vacios',
          text: 'Debera llenar el campo de numero de parcialidades'
        })
      }
      //Validar que parcialidades sea un numero mayor a 0
      else if (this.formulario.controls.numero_parcialidades.value<=0) {
        console.log('entroo');
        Swal.fire({
          icon: 'error',
          title: 'Campos Vacios',
          text: 'El numero de parcialidades debe ser mayor a 0'
        })
      }
      else if (this.formulario.controls.peso_total_de_envio.value=='') {
        console.log('entroo');
        Swal.fire({
          icon: 'error',
          title: 'Campos Vacios',
          text: 'Debera llenar el campo de peso total de envio'
        })
      }
      //Validar que peso total de envio sea un numero mayor a 0
      else if (this.formulario.controls.peso_total_de_envio.value<=0) {
        console.log('entroo');
        Swal.fire({
          icon: 'error',
          title: 'Campos Vacios',
          text: 'El peso total de envio debe ser mayor a 0'
        })
      }
      
      else{


    console.log(this.formulario.value);
    //envio de datos a gestor service

    this.gestorService.postCuenta(this.formulario.value).subscribe((respuesta: any) => {
      console.log(respuesta);
      //Alerta de confirmacion
      Swal.fire({
        title: 'Confirmación',
        text: respuesta.mensaje+', Cuenta No: '+ this.formulario.controls.id_cuenta.value ,
        icon: 'success',
        confirmButtonText: 'Aceptar'
      });
      //reinicio de formulario
      this.formulario.reset();
      this.formulario.controls.id_cuenta.value='';
      this.formulario.controls.matriculas_autorizadas.value='';
      this.formulario.controls.numero_parcialidades.value='';
      this.formulario.controls.peso_total_de_envio.value='';
      this.enviado = false;

      // hacer algo con la respuesta
    });
  }
}

}

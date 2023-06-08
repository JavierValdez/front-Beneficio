import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { GestorService } from '../../services/gestor.service';
@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {

  usuarioForm: FormGroup=new FormGroup({});
  mensaje: string="";

  constructor(private GestorService:GestorService,private fb: FormBuilder) { }

  ngOnInit(): void {
    this.usuarioForm = this.fb.group({
      apellido: ['', Validators.required],
      contrasena: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      direccion: ['', Validators.required],
      edad: ['', Validators.required],
      nit: ['', Validators.required],
      nombre: ['', Validators.required],
      telefono: ['', Validators.required]
    });
  }

  onSubmit(){
    console.log(this.usuarioForm.value);
    //Verifica si fue exitoso o fallido el registro y muestra una ventana emergente
    this.GestorService.ActualizarUsuario(this.usuarioForm.value).subscribe(respuesta =>{
      console.log(respuesta);
      if(respuesta){
        this.mensaje = "Usuario actualizado correctamente";
      }else{
        this.mensaje = "Error al actualizar el usuario";
      }
    }
    );

  }

}

import { Component, OnInit } from '@angular/core';
import { GestorService } from '../../services/gestor.service';
@Component({
  selector: 'app-listar-usuarios',
  templateUrl: './listar-usuarios.component.html',
  styleUrls: ['./listar-usuarios.component.css']
})
export class ListarUsuariosComponent implements OnInit {
  usuarios: any=[];
  constructor(private GestorService:GestorService) { }

  ngOnInit(): void {
    //Obtener usuarios
    this.GestorService.listarUsuarios().subscribe(respuesta =>{
      console.log(respuesta);
      this.usuarios = respuesta;
    }
    );
    
  }

}

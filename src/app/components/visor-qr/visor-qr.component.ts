import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
//Import gestor service
import { GestorService } from '../../services/gestor.service';

@Component({
  selector: 'app-visor-qr',
  templateUrl: './visor-qr.component.html',
  styleUrls: ['./visor-qr.component.css']
})
export class VisorQRComponent implements OnInit {

  transport: any;
  transportista: any= {
    "apellidos": "string",
    "estado": 0,
    "fecha_inscripcion": "2023-06-08T04:51:52.384Z",
    "fecha_modificacion": "2023-06-08T04:51:52.384Z",
    "nombres": "string",
    "numero_licencia": "string",
    "tipo_licencia": "string"
  };
  parametro1: any;
  parametro2: any;
  transportistas: any=[];
  transportes: any;

  constructor(private route: ActivatedRoute,private gestorService:GestorService ) { }

  ngOnInit(): void {
    this.parametro1 = this.route.snapshot.paramMap.get('parametro1');
    this.parametro2 = this.route.snapshot.paramMap.get('parametro2');
    //get transportista
    this.getTransportista();
    this.buscarTransportista();
    //Trasporte datos
    this.transport={
      "color": "string",
      "estado": 0,
      "fecha_inscripcion": "2023-06-08T04:52:21.657Z",
      "fecha_modificacion": "string",
      "marca": "string",
      "matricula": "string",
      "modelo": 0,
      "numero_ejes": "string",
      "peso_de_camion": 0,
      "peso_de_mercaderia": 0
    }
  }

  //Funcion para obtener datos getTransportista
  getTransportista(){
    this.gestorService.getTransportista().subscribe(
      (      res: any)=>{
        console.log('Traportista'+res);
        this.transportistas=res;

        this.buscarTransportista();
      }
    )
  }

  //Busqueda de transportista por numero de licencia y parametro 1
  buscarTransportista(){
    this.transportistas.forEach((element: any) => {
      console.log(element.numero_licencia+'---'+this.parametro1);
      console.log();
      if(element.numero_licencia==this.parametro1){
        this.transportista=element;
        console.log('Transportista encontrado');
        console.log(this.transportista);
        console.log(this.transportista.nombres);
        console.log(this.transportista.apellidos);
        console.log(this.transportista.numero_licencia);
        console.log(this.transportista.tipo_licencia);

      }
    });
  }




}

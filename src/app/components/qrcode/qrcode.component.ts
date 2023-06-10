import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-qrcode',
  templateUrl: './qrcode.component.html',
  styleUrls: ['./qrcode.component.css']
})
export class QRCODEComponent implements OnInit {
  @Input() qrdatos: string = '';

  constructor() { }
  qrdata:any;
  ngOnInit(): void {
    this.qrdata = 'https://cafetalito-3af53.web.app/Consulta/'+this.qrdatos+'/123332';
  }
  abrirPaginaWeb() {
    window.open(this.qrdata, '_blank');
  }

}

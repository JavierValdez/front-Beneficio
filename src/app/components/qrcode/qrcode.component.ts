import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-qrcode',
  templateUrl: './qrcode.component.html',
  styleUrls: ['./qrcode.component.css']
})
export class QRCODEComponent implements OnInit {

  constructor() { }
  qrdata = 'https://cafetalito-3af53.web.app/Consulta/123/123332';
  ngOnInit(): void {
  }
  abrirPaginaWeb() {
    window.open(this.qrdata, '_blank');
  }

}

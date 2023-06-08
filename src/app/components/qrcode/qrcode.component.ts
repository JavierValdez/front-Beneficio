import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-qrcode',
  templateUrl: './qrcode.component.html',
  styleUrls: ['./qrcode.component.css']
})
export class QRCODEComponent implements OnInit {

  constructor() { }
  qrdata = 'https://www.google.com';
  ngOnInit(): void {
  }
  abrirPaginaWeb() {
    window.open(this.qrdata, '_blank');
  }

}

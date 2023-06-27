import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Injectable({
  providedIn: 'root'
})
export class PdfServiceService {

  constructor() { }
  generatePdf(content: string) {
    let doc = new jsPDF('p', 'pt', 'a4');
    //doc posicion inicial
    const htmlContent=content;
    doc.html(content
      , {
        callback: (doc) => {
          doc.save('Pesaje.pdf');
        }
      });
  }

}


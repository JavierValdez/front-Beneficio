import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Injectable({
  providedIn: 'root'
})
export class PdfServiceService {

  constructor() { }
  generatePdf(title: string, content: string) {
    let doc = new jsPDF();
    //doc posicion inicial
    const htmlContent=content;
    doc.html(content
      , {
        callback: (doc) => {
          doc.save('document.pdf');
        }
      });
  }

}


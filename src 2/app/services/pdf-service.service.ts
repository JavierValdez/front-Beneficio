import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Injectable({
  providedIn: 'root'
})
export class PdfServiceService {

  constructor() { }
  generatePdf(title: string, content: string) {
    const doc = new jsPDF({
      orientation: "portrait",
      format: 'letter'
      });
    //doc posicion inicial
    const htmlContent = `
    <div style="text-align: center;">
      <h1>${title}</h1>
      ${content}
    </div>
  `;

  doc.html(htmlContent, {
    callback: (doc) => {
      doc.save('document.pdf');
    }
  });
  }

}


import { Component } from '@angular/core';
import { PDFDocument } from 'pdf-lib';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  filesToMerge: File[] = [];

  onFileSelected(event: any) {
    this.filesToMerge = event.target.files;
  }

  async mergePDFs() {
    const pdfFiles = await this.loadPdfFiles();

    if (pdfFiles.length === 0) {
      console.error('No PDF files selected');
      return;
    }

    const mergedPdf = await PDFDocument.create();

    for (const pdfDoc of pdfFiles) {
      const copiedPages = await mergedPdf.copyPages(
        pdfDoc,
        pdfDoc.getPageIndices()
      );
      copiedPages.forEach((page) => mergedPdf.addPage(page));
    }

    const mergedPdfBytes = await mergedPdf.save();
    const mergedPdfBlob = new Blob([mergedPdfBytes], {
      type: 'application/pdf',
    });
    this.downloadFile(mergedPdfBlob, 'merged.pdf');
  }

  private async loadPdfFiles(): Promise<PDFDocument[]> {
    const pdfFiles: PDFDocument[] = [];

    for (const file of this.filesToMerge) {
      const pdfBytes = await this.readFileAsArrayBuffer(file);
      const pdfDoc = await PDFDocument.load(pdfBytes);
      pdfFiles.push(pdfDoc);
    }

    return pdfFiles;
  }

  private readFileAsArrayBuffer(file: File): Promise<Uint8Array> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result instanceof ArrayBuffer) {
          resolve(new Uint8Array(reader.result));
        } else {
          reject(new Error('Failed to read file as ArrayBuffer'));
        }
      };
      reader.onerror = () => {
        reject(reader.error);
      };
      reader.readAsArrayBuffer(file);
    });
  }

  private downloadFile(blob: Blob, filename: string) {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
  }
}

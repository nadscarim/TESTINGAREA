/* eslint-disable prettier/prettier */
import { Body, Controller, Post } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as Handlebars from 'handlebars';
import * as docxPdf from 'docx-pdf';
import * as Docxtemplater from 'docxtemplater';
import { PdfMergingService } from './pdf-merging.service';

@Controller('pdf-merging')
export class PdfMergingController {
  constructor(private readonly pdfMergingService: PdfMergingService) {}

  @Post('pdf')
  async generatePdf(@Body() requestData: any) {
    // Load DOCX template
    const wordDocumentPath = path.join(__dirname, 'template.docx');
    const content = fs.readFileSync(wordDocumentPath);
    const doc = new Docxtemplater();
    doc.loadZip(content);

    // Define data to replace placeholders
    const data = requestData;

    // Register Handlebars helper to handle conditional content
    Handlebars.registerHelper('ifSignature', function (signature, options) {
      return signature ? options.fn(this) : options.inverse(this);
    });

    // Compile Handlebars template
    const template = Handlebars.compile(doc.getFullText());
    const compiledTemplate = template(data);

    // Replace content in DOCX template with compiled Handlebars template
    doc.setData(compiledTemplate);

    // Replace signature section if signature is null
    if (!data.signature) {
      doc.setData({ signature: '' }); // Provide an empty string for signature
    }

    // Render the template
    doc.render();

    // Convert DOCX to PDF
    const pdfBuffer = await docxPdf(doc);

    // Save or send the PDF buffer as needed
    fs.writeFileSync('path/to/output.pdf', pdfBuffer);

    return 'PDF generated successfully';
  }
}

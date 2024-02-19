import { Module } from '@nestjs/common';
import { PdfMergingService } from './pdf-merging.service';
import { PdfMergingController } from './pdf-merging.controller';

@Module({
  controllers: [PdfMergingController],
  providers: [PdfMergingService],
})
export class PdfMergingModule {}

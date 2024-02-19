import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PdfMergingModule } from './pdf-merging/pdf-merging.module';

@Module({
  imports: [PdfMergingModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

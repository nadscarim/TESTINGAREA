import { Test, TestingModule } from '@nestjs/testing';
import { PdfMergingController } from './pdf-merging.controller';
import { PdfMergingService } from './pdf-merging.service';

describe('PdfMergingController', () => {
  let controller: PdfMergingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PdfMergingController],
      providers: [PdfMergingService],
    }).compile();

    controller = module.get<PdfMergingController>(PdfMergingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

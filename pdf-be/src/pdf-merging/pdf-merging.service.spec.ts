import { Test, TestingModule } from '@nestjs/testing';
import { PdfMergingService } from './pdf-merging.service';

describe('PdfMergingService', () => {
  let service: PdfMergingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PdfMergingService],
    }).compile();

    service = module.get<PdfMergingService>(PdfMergingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

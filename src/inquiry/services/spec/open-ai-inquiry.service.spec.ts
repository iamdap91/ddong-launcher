import { Test, TestingModule } from '@nestjs/testing';
import { MakeInquiryService } from '../make-inquiry.service';

describe('OpenAiInquiryService', () => {
  let service: MakeInquiryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MakeInquiryService],
    }).compile();

    service = module.get(MakeInquiryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

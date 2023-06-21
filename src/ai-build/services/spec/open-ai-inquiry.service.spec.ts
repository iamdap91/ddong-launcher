import { Test, TestingModule } from '@nestjs/testing';
import { MakePostService } from '../make-post.service';

describe('OpenAiInquiryService', () => {
  let service: MakePostService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MakePostService],
    }).compile();

    service = module.get(MakePostService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

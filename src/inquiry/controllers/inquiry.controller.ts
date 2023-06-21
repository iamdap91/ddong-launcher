import { Controller, Post } from '@nestjs/common';
import { MakeInquiryService } from '../services';

@Controller('inquiries')
export class InquiryController {
  constructor(private readonly makeInquiryService: MakeInquiryService) {}

  @Post()
  async makeInquiry() {
    return await this.makeInquiryService.exec();
  }
}

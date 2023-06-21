import { Body, Controller, Post } from '@nestjs/common';
import { MakeInquiryService } from '../services';
import { MakeInquiryBody } from '../dto';

@Controller('inquiries')
export class InquiryController {
  constructor(private readonly makeInquiryService: MakeInquiryService) {}

  @Post()
  async makeInquiry(@Body() body: MakeInquiryBody) {
    return await this.makeInquiryService.exec(body);
  }
}

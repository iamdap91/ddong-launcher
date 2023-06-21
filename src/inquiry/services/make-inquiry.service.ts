import { Injectable } from '@nestjs/common';
import { OpenAiService, TranslateService } from '../../libs';
import { MakeInquiryBody } from '../dto';

@Injectable()
export class MakeInquiryService {
  constructor(
    private readonly openAiService: OpenAiService,
    private readonly translateService: TranslateService,
  ) {}

  async exec({ content }: MakeInquiryBody) {
    const contentInEng = await this.translateService.korean2English(content);
    const response = await this.openAiService.makeInquiry(contentInEng);

    return {
      content: await this.translateService.english2Korean(response),
    };
  }
}

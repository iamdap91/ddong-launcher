import { Injectable } from '@nestjs/common';
import { OpenAiService, TranslateService } from '../../libs';
import { MakePostBody, MakePostResponse } from '../dto';

@Injectable()
export class MakePostService {
  constructor(
    private readonly openAiService: OpenAiService,
    private readonly translateService: TranslateService,
  ) {}

  async exec({ content }: MakePostBody): Promise<MakePostResponse> {
    const contentInEng = await this.translateService.korean2English(content);

    return await this.openAiService.makePost(contentInEng);
  }
}

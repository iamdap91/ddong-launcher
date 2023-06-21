import { Injectable } from '@nestjs/common';
import { OpenAiService } from '@libs/open-ai';
import { TranslateService } from '@libs/translate';
import { TistoryService } from '@libs/tistory';

@Injectable()
export class WriteArticleJob {
  constructor(
    private readonly openAiService: OpenAiService,
    private readonly translateService: TranslateService,
    private readonly tistoryService: TistoryService,
  ) {}

  async exec(topic: string) {
    console.log(topic);

    const { url } = await this.openAiService.makeImage({
      n: 1,
      prompt: topic,
      size: '256x256',
    });

    console.log(url);
  }
}

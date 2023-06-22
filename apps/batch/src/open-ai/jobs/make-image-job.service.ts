import { Injectable, Logger } from '@nestjs/common';
import { OpenAiService } from '@libs/open-ai';
import { pipeline as streamPipeline } from 'node:stream/promises';
import { createWriteStream } from 'fs';
import got from 'got';
import { TranslateService } from '@libs/translate';

@Injectable()
export class MakeImageJob {
  constructor(
    private readonly openAiService: OpenAiService,
    private readonly translateService: TranslateService,
  ) {}

  async exec(topic: string) {
    const topicInEnglish = await this.translateService.korean2English(topic);
    Logger.log(`🔥topic: ${topic} start`);
    Logger.log(`🔥topic(eng): ${topicInEnglish} start`);

    const image = await this.openAiService.makeImage({
      n: 1,
      size: '256x256',
      prompt: topicInEnglish,
    });

    await streamPipeline(got.stream(image.url), createWriteStream('image.png'));
    Logger.debug(`👉image: ${image.url}, file: image.png`);
  }
}

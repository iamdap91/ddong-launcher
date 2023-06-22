import { Injectable, Logger } from '@nestjs/common';
import { OpenAiService } from '@libs/open-ai';
import { pipeline as streamPipeline } from 'node:stream/promises';
import fs from 'node:fs';
import got from 'got';

@Injectable()
export class MakeImageJob {
  constructor(private readonly openAiService: OpenAiService) {}

  async exec(topic: string) {
    Logger.log(`🔥topic: ${topic} start`);

    const image = await this.openAiService.makeImage({
      n: 1,
      size: '256x256',
      prompt: topic,
    });

    await streamPipeline(
      got.stream(image.url),
      fs.createWriteStream('image.png'),
    );
  }
}

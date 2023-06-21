import { Injectable } from '@nestjs/common';
import { Configuration, OpenAIApi } from 'openai';
import {
  MakeImageBody,
  MakeImageResponse,
  MakePostResponse,
} from '../../ai-build/dto';

@Injectable()
export class OpenAiService {
  private openAi: OpenAIApi;

  constructor() {
    const conf = new Configuration({ apiKey: process.env.OPEN_AI_API_KEY });
    this.openAi = new OpenAIApi(conf);
  }

  async makePost(content: string): Promise<MakePostResponse> {
    const chatCompletion = await this.openAi.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: `answer in following JSON format and answer in korean. {title: 'title',  tag: 'comma separated 10 keywords', content: 'answer in Semantic html'}`,
          name: 'system',
        },
        { role: 'user', content: content },
      ],
    });

    return JSON.parse(chatCompletion?.data?.choices?.[0].message?.content);
  }

  async makeImage({
    n,
    prompt,
    size,
  }: MakeImageBody): Promise<MakeImageResponse> {
    const res = await this.openAi.createImage({
      prompt,
      size,
      n,
    });

    return { url: res?.data?.data?.[0].url };
  }
}

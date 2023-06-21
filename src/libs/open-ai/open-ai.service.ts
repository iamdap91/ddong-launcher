import { Injectable } from '@nestjs/common';
import { Configuration, OpenAIApi } from 'openai';

@Injectable()
export class OpenAiService {
  private openAi: OpenAIApi;

  constructor() {
    const conf = new Configuration({ apiKey: process.env.OPEN_AI_API_KEY });
    this.openAi = new OpenAIApi(conf);
  }

  async makeInquiry(content: string): Promise<string> {
    const chatCompletion = await this.openAi.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content }],
    });

    return chatCompletion?.data?.choices?.[0].message?.content;
  }
}

import { Injectable } from '@nestjs/common';
import { Configuration, OpenAIApi } from 'openai';

@Injectable()
export class MakeInquiryService {
  private openAi: OpenAIApi;

  constructor() {
    const conf = new Configuration({ apiKey: process.env.OPEN_AI_API_KEY });
    this.openAi = new OpenAIApi(conf);
  }

  async exec() {
    const chatCompletion = await this.openAi.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'user',
          content:
            "Tell us about the most controversial of Joe Biden's recent moves.",
        },
      ],
    });

    const response = chatCompletion.data.choices[0].message;
    console.log(response);
    return response;
  }
}

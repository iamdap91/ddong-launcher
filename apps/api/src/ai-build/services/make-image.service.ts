import { Injectable } from '@nestjs/common';
import { OpenAiService } from '@libs/open-ai';
import { MakeImageBody, MakeImageResponse } from '../dto';

@Injectable()
export class MakeImageService {
  constructor(private readonly openAiService: OpenAiService) {}

  async exec(body: MakeImageBody): Promise<MakeImageResponse> {
    return await this.openAiService.makeImage(body);
  }
}

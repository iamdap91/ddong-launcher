import { Body, Controller, Post } from '@nestjs/common';
import { MakeImageService, MakePostService } from '../services';
import { MakeImageResponse, MakePostBody, MakePostResponse } from '../dto';
import { MakeImageBody } from '../dto';

@Controller('ai-builds')
export class AiBuildController {
  constructor(
    private readonly makePostInquiryService: MakePostService,
    private readonly makeImageService: MakeImageService,
  ) {}

  @Post('post')
  async makePostInquiry(@Body() body: MakePostBody): Promise<MakePostResponse> {
    return await this.makePostInquiryService.exec(body);
  }

  @Post('image')
  async makeImage(@Body() body: MakeImageBody): Promise<MakeImageResponse> {
    return await this.makeImageService.exec(body);
  }
}

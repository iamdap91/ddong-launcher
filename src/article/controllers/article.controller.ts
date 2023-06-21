import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { AttachImageService, CreateArticleService } from '../services';
import { CreateArticleDto } from '../dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('articles')
export class ArticleController {
  constructor(
    private readonly createArticleService: CreateArticleService,
    private readonly attachImageService: AttachImageService,
  ) {}

  @Post()
  async create(@Body() body: CreateArticleDto): Promise<void> {
    await this.createArticleService.exec(body);
  }

  /**
   * @deprecated - 괜히 만들었다.
   */
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    await this.attachImageService.exec(file);
  }
}

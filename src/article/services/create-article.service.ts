import { Injectable } from '@nestjs/common';
import { TistoryService } from '../../libs';
import { CreateArticleDto } from '../dto';

@Injectable()
export class CreateArticleService {
  constructor(private readonly tistoryService: TistoryService) {}

  async exec(body: CreateArticleDto): Promise<void> {
    await this.tistoryService.writePost(body);
  }
}

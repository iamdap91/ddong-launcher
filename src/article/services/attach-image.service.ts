import { Injectable } from '@nestjs/common';
import { TistoryService } from '../../libs';

@Injectable()
export class AttachImageService {
  constructor(private readonly tistoryService: TistoryService) {}

  async exec(file: Express.Multer.File): Promise<void> {
    await this.tistoryService.attachFile(file);
  }
}

import { Injectable } from '@nestjs/common';
import got, { Got } from 'got';
import { CreateArticleDto } from '../../article/dto';

@Injectable()
export class TistoryService {
  private tistoryApi: Got;
  constructor() {
    this.tistoryApi = got.extend({
      prefixUrl: ' https://www.tistory.com/apis',
    });
  }
  async writePost({ title, tag, content }: CreateArticleDto): Promise<void> {
    await this.tistoryApi.post('post/write', {
      json: {
        // required fields
        title,
        content,
        tag,
        access_token: process.env.TISTORY_ACCESS_TOKEN,
        blogName: process.env.TISTORY_BLOG_NAME,
        // optional fields
        output: 'json',
        visibility: 3,
        category: 0,
        acceptComment: 1,
      },
    });
  }

  async attachFile(file: Express.Multer.File) {
    await this.tistoryApi.post('post/attach', {
      body: file.buffer,
      json: {
        blogName: process.env.TISTORY_BLOG_NAME,
      },
    });
  }
}

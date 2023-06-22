import { Injectable } from '@nestjs/common';
import got, { Got } from 'got';
import axios from 'axios';
import { AttachImageResponse, CreatePost } from '../dto';
import { XMLParser } from 'fast-xml-parser';

@Injectable()
export class TistoryService {
  private tistoryApi: Got;
  private xmlParser: XMLParser;
  constructor() {
    this.xmlParser = new XMLParser({ parseTagValue: false });
    this.tistoryApi = got.extend({
      prefixUrl: ' https://www.tistory.com/apis',
    });
  }
  async writePost({ title, tag, content }: CreatePost): Promise<void> {
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

  async attachFileByRemoteUrl(url: string): Promise<AttachImageResponse> {
    const searchParams = new URLSearchParams({
      blogName: process.env.TISTORY_BLOG_NAME,
      access_token: process.env.TISTORY_ACCESS_TOKEN,
    });

    // 하... stream 처리 캉받는다. got 은 스트림 결과값 받기가 안좋다...
    const imageStream = await axios.get(url, { responseType: 'stream' });
    const response = await axios.postForm(
      `https://www.tistory.com/apis/post/attach?${searchParams.toString()}`,
      { uploadedfile: imageStream.data },
      {
        headers: { 'Content-Type': 'multipart/form-data' },
        responseType: 'json',
      },
    );

    return this.xmlParser.parse(response.data);
  }
}

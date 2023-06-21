import { Injectable } from '@nestjs/common';
import { OpenAiService } from '@libs/open-ai';
import { TranslateService } from '@libs/translate';
import { TistoryService } from '@libs/tistory';

@Injectable()
export class WriteArticleJob {
  constructor(
    private readonly openAiService: OpenAiService,
    private readonly translateService: TranslateService,
    private readonly tistoryService: TistoryService,
  ) {}

  async exec(topic: string) {
    const postFix = '에 대한 블로그 포스팅 주제를 10 개 뽑아줘.';
    const topics = await this.openAiService.makeTopics(topic + postFix);

    for (const topic of topics) {
      const topicInEnglish = await this.translateService.korean2English(topic);

      const [postInfo, image] = await Promise.all([
        this.openAiService.makePost(topicInEnglish),
        this.openAiService.makeImage({
          n: 1,
          size: '256x256',
          prompt: topicInEnglish,
        }),
      ]);

      await this.tistoryService.writePost({
        title: topic,
        content: `<img alt=${topic} src=${image.url}> ${postInfo.content}`,
        tag: postInfo.tag,
      });
    }
  }
}

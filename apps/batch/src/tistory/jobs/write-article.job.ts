import { Injectable, Logger } from '@nestjs/common';
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
    const postFix = '에 대한 블로그 포스팅 주제를 30 개 뽑아줘.';
    const topics = await this.openAiService.makeTopics(topic + postFix);

    for (const topic of topics) {
      try {
        Logger.log(`🔥topic: ${topic} start`);
        const topicInEnglish = await this.translateService.korean2English(
          topic,
        );

        const postInfo = await this.openAiService.makePost(topicInEnglish);
        if (!postInfo.content) {
          Logger.debug(postInfo);
          continue;
        }

        const image = await this.openAiService.makeImage({
          n: 1,
          size: '512x512',
          prompt: topicInEnglish,
        });

        const {
          tistory: { url },
        } = await this.tistoryService.attachFileByRemoteUrl(image.url);

        await this.tistoryService.writePost({
          title: topic,
          content: `<img alt=${topic} src=${url}> ${postInfo.content}`,
          tag: postInfo.tag,
        });
      } catch (e) {
        Logger.error(e);
      }
    }
  }
}

import { Command, CommandRunner } from 'nest-commander';
import { Logger } from '@nestjs/common';
import { WriteArticleJob } from '../jobs';

export enum SUB_COMMAND {
  AUTO_WRITE = 'auto-write',
}

@Command({ name: 'article', description: '똥글발사!' })
export class ArticleCommand extends CommandRunner {
  constructor(private readonly writeArticleJob: WriteArticleJob) {
    super();
  }

  async run(passedParams: string[]) {
    const [subCommand, ...topic] = passedParams;
    const requestedTopic = topic.join(' ').trim();
    Logger.debug(`subcommand: ${subCommand}, topic : '${requestedTopic}'`);

    switch (subCommand) {
      case SUB_COMMAND.AUTO_WRITE:
        return await this.writeArticleJob.exec(requestedTopic);
      default:
        return Logger.error('`subcommand`가 입력되지 않았습니다.');
    }
  }
}

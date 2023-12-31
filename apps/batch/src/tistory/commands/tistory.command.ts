import { Command, CommandRunner } from 'nest-commander';
import { Logger } from '@nestjs/common';
import { WriteArticleJob } from '../jobs';

export enum SUB_COMMAND {
  AUTO_WRITE = 'auto-write',
}

@Command({ name: 'tistory', description: '똥글발사!' })
export class TistoryCommand extends CommandRunner {
  constructor(private readonly writeArticleJob: WriteArticleJob) {
    super();
  }

  async run(passedParams: string[]) {
    const [subCommand, ...params] = passedParams;
    const topic = params.join(' ').trim();
    Logger.debug(`subcommand: ${subCommand}, topic : '${topic}'`);

    switch (subCommand) {
      case SUB_COMMAND.AUTO_WRITE:
        return await this.writeArticleJob.exec(topic);
      default:
        return Logger.error('`subcommand`가 입력되지 않았습니다.');
    }
  }
}

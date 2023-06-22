import { Command, CommandRunner } from 'nest-commander';
import { Logger } from '@nestjs/common';
import { MakeImageJob } from '../jobs';

export enum SUB_COMMAND {
  IMAGE = 'image',
}

@Command({ name: 'open-ai', description: '똥글발사!' })
export class OpenAiCommand extends CommandRunner {
  constructor(private readonly makeImageJob: MakeImageJob) {
    super();
  }

  async run(passedParams: string[]) {
    const [subCommand, ...params] = passedParams;
    const topic = params.join(' ').trim();
    Logger.debug(`subcommand: ${subCommand}, topic : '${topic}'`);

    switch (subCommand) {
      case SUB_COMMAND.IMAGE:
        return await this.makeImageJob.exec(topic);
      default:
        return Logger.error('`subcommand`가 입력되지 않았습니다.');
    }
  }
}

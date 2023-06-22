import { Module } from '@nestjs/common';
import { TistoryCommand, WriteArticleJob } from './tistory';
import { OpenAiModule } from '@libs/open-ai';
import { TranslateModule } from '@libs/translate';
import { TistoryModule } from '@libs/tistory';
import { ConfigModule } from '@nestjs/config';
import { MakeImageJob, OpenAiCommand } from './open-ai';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    OpenAiModule,
    TranslateModule,
    TistoryModule,
  ],
  providers: [
    // tistory
    WriteArticleJob,
    TistoryCommand,
    // open-ai
    OpenAiCommand,
    MakeImageJob,
  ],
})
export class BatchModule {}

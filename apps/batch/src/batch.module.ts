import { Module } from '@nestjs/common';
import { ArticleCommand, WriteArticleJob } from './article';
import { OpenAiModule } from '@libs/open-ai';
import { TranslateModule } from '@libs/translate';
import { TistoryModule } from '@libs/tistory';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    OpenAiModule,
    TranslateModule,
    TistoryModule,
  ],
  providers: [WriteArticleJob, ArticleCommand],
})
export class BatchModule {}

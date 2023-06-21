import { Module } from '@nestjs/common';
import { AiBuildModule } from './ai-build';
import { ConfigModule } from '@nestjs/config';
import { ArticleModule } from './article/article.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AiBuildModule,
    ArticleModule,
  ],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { ArticleController } from './controllers';
import { AttachImageService, CreateArticleService } from './services';
import { TistoryModule } from '@libs/tistory';

@Module({
  imports: [TistoryModule],
  controllers: [ArticleController],
  providers: [CreateArticleService, AttachImageService],
})
export class ArticleModule {}

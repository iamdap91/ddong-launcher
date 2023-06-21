import { Module } from '@nestjs/common';
import { MakeImageService, MakePostService } from './services';
import { AiBuildController } from './controllers';
import { OpenAiModule, TranslateModule } from '../../../../libs';

@Module({
  imports: [OpenAiModule, TranslateModule],
  controllers: [AiBuildController],
  providers: [MakePostService, MakeImageService],
})
export class AiBuildModule {}

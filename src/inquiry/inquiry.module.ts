import { Module } from '@nestjs/common';
import { MakeInquiryService } from './services';
import { InquiryController } from './controllers';
import { OpenAiModule, TranslateModule } from '../libs';

@Module({
  imports: [OpenAiModule, TranslateModule],
  controllers: [InquiryController],
  providers: [MakeInquiryService],
})
export class InquiryModule {}

import { Module } from '@nestjs/common';
import { MakeInquiryService } from './services';
import { InquiryController } from './controllers';

@Module({
  controllers: [InquiryController],
  providers: [MakeInquiryService],
})
export class InquiryModule {}

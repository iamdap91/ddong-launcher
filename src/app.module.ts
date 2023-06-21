import { Module } from '@nestjs/common';
import { InquiryModule } from './inquiry';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), InquiryModule],
})
export class AppModule {}

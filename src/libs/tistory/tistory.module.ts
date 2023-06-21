import { Module } from '@nestjs/common';
import { TistoryService } from './tistory.service';

@Module({
  providers: [TistoryService],
  exports: [TistoryService],
})
export class TistoryModule {}

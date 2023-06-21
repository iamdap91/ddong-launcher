import { IsString } from 'class-validator';

export class MakeInquiryBody {
  @IsString()
  content: string;
}

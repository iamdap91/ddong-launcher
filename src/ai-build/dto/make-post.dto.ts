import { IsString } from 'class-validator';

export class MakePostBody {
  @IsString()
  content: string;
}

export class MakePostResponse {
  title: string;
  tag: string;
  content: string;
}

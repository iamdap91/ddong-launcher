import { IsString } from 'class-validator';

export class CreateArticleDto {
  @IsString()
  title: string;

  @IsString()
  tag: string;

  @IsString()
  content: string;
}

import { IsNumber, IsOptional, IsString } from 'class-validator';

export class MakeImageBody {
  @IsString()
  prompt: string;

  @IsNumber()
  @IsOptional()
  n = 1;

  @IsString()
  size: '256x256' | '512x512' | '1024x1024';
}

export class MakeImageResponse {
  url: string;
}

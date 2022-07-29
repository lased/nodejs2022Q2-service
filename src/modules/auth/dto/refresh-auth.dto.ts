import { IsNotEmpty, IsString } from 'class-validator';

export class RefreshAuthDto {
  @IsNotEmpty()
  @IsString()
  refreshToken: string;
}

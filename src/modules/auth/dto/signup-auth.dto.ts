import { IsNotEmpty, IsString } from 'class-validator';

export class SignupAuthDto {
  @IsNotEmpty()
  @IsString()
  login: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}

import { IsNotEmpty, IsString, ValidateIf } from 'class-validator';

export class CreateTrackDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  duration: number;

  @IsString()
  @ValidateIf((_, value) => value !== null)
  @IsNotEmpty()
  artistId: string | null;

  @IsString()
  @ValidateIf((_, value) => value !== null)
  @IsNotEmpty()
  albumId: string | null;
}

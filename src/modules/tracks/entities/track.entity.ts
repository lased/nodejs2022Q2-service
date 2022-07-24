import { IsInt, IsString, ValidateIf } from 'class-validator';

export class Track {
  id: string;

  @IsString()
  name: string;

  @IsInt()
  duration: number;

  @IsString()
  @ValidateIf((_, value) => value !== null)
  artistId: string | null;

  @IsString()
  @ValidateIf((_, value) => value !== null)
  albumId: string | null;
}

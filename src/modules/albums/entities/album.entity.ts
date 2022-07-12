import { IsInt, IsString, ValidateIf } from 'class-validator';

export class Album {
  id: string;

  @IsString()
  name: string;

  @IsInt()
  year: number;

  @IsString()
  @ValidateIf((_, value) => value !== null)
  artistId: string | null;
}

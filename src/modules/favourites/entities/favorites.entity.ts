import { IsArray } from 'class-validator';
import { Type } from 'class-transformer';

export class Favorites {
  @IsArray()
  @Type(() => String)
  artists: string[];

  @IsArray()
  @Type(() => String)
  albums: string[];

  @IsArray()
  @Type(() => String)
  tracks: string[];
}

import { OmitType } from '@nestjs/mapped-types';
import { IsNotEmpty } from 'class-validator';

import { Artist } from '../entities/artist.entity';

export class CreateArtistDto extends OmitType(Artist, ['id']) {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  grammy: boolean;
}

import { OmitType } from '@nestjs/mapped-types';
import { IsNotEmpty } from 'class-validator';

import { Track } from '../entities/track.entity';

export class CreateTrackDto extends OmitType(Track, ['id']) {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  duration: number;

  @IsNotEmpty()
  artistId: string | null;

  @IsNotEmpty()
  albumId: string | null;
}

import { OmitType } from '@nestjs/mapped-types';
import { IsNotEmpty } from 'class-validator';

import { Album } from '../entities/album.entity';

export class CreateAlbumDto extends OmitType(Album, ['id']) {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  year: number;

  @IsNotEmpty()
  artistId: string | null;
}

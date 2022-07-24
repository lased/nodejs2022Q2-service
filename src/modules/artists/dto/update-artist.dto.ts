import { OmitType, PartialType } from '@nestjs/mapped-types';

import { Artist } from '../entities/artist.entity';

export class UpdateArtistDto extends OmitType(PartialType(Artist), ['id']) {}

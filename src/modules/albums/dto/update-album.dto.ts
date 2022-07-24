import { OmitType, PartialType } from '@nestjs/mapped-types';

import { Album } from '../entities/album.entity';

export class UpdateAlbumDto extends OmitType(PartialType(Album), ['id']) {}

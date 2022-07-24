import { OmitType, PartialType } from '@nestjs/mapped-types';

import { Track } from '../entities/track.entity';

export class UpdateTrackDto extends OmitType(PartialType(Track), ['id']) {}

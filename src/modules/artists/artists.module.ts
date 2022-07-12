import { Module } from '@nestjs/common';

import { ArtistsController } from './artists.controller';
import { AlbumsService } from '../albums/albums.service';
import { ArtistsService } from './artists.service';
import { InMemoryStore } from 'src/services';

@Module({
  controllers: [ArtistsController],
  providers: [ArtistsService, InMemoryStore, AlbumsService],
})
export class ArtistsModule {}

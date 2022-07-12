import { Module } from '@nestjs/common';

import { ArtistsService } from '../artists/artists.service';
import { AlbumsController } from './albums.controller';
import { AlbumsService } from './albums.service';
import { InMemoryStore } from 'src/services';

@Module({
  controllers: [AlbumsController],
  providers: [AlbumsService, InMemoryStore, ArtistsService],
})
export class AlbumsModule {}

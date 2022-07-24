import { forwardRef, Module } from '@nestjs/common';

import { FavoritesModule } from '../favourites/favorites.module';
import { ArtistsModule } from '../artists/artists.module';
import { AlbumsModule } from '../albums/albums.module';
import { TracksController } from './tracks.controller';
import { TracksService } from './tracks.service';
import { InMemoryStore } from 'src/services';

@Module({
  controllers: [TracksController],
  imports: [
    forwardRef(() => FavoritesModule),
    forwardRef(() => ArtistsModule),
    forwardRef(() => AlbumsModule),
  ],
  providers: [TracksService, InMemoryStore],
  exports: [TracksService],
})
export class TracksModule {}

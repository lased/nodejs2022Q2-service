import { forwardRef, Module } from '@nestjs/common';

import { ArtistsModule } from '../artists/artists.module';
import { TracksModule } from '../tracks/tracks.module';
import { AlbumsController } from './albums.controller';
import { AlbumsService } from './albums.service';
import { InMemoryStore } from 'src/services';
import { FavoritesModule } from '../favourites/favorites.module';

@Module({
  controllers: [AlbumsController],
  imports: [
    forwardRef(() => FavoritesModule),
    forwardRef(() => ArtistsModule),
    forwardRef(() => TracksModule),
  ],
  providers: [AlbumsService, InMemoryStore],
  exports: [AlbumsService],
})
export class AlbumsModule {}

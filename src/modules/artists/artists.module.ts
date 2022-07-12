import { forwardRef, Module } from '@nestjs/common';

import { FavoritesModule } from '../favourites/favorites.module';
import { ArtistsController } from './artists.controller';
import { TracksModule } from '../tracks/tracks.module';
import { AlbumsModule } from '../albums/albums.module';
import { ArtistsService } from './artists.service';
import { InMemoryStore } from 'src/services';

@Module({
  controllers: [ArtistsController],
  imports: [
    forwardRef(() => FavoritesModule),
    forwardRef(() => AlbumsModule),
    forwardRef(() => TracksModule),
  ],
  providers: [ArtistsService, InMemoryStore],
  exports: [ArtistsService],
})
export class ArtistsModule {}

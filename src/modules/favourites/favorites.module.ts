import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FavoritesController } from './favorites.controller';
import { ArtistsModule } from '../artists/artists.module';
import { AlbumsModule } from '../albums/albums.module';
import { FavoritesService } from './favorites.service';
import { TracksModule } from '../tracks/tracks.module';
import { Favorites } from './entities/favorites.entity';

@Module({
  controllers: [FavoritesController],
  imports: [
    forwardRef(() => ArtistsModule),
    forwardRef(() => AlbumsModule),
    forwardRef(() => TracksModule),
    TypeOrmModule.forFeature([Favorites]),
  ],
  providers: [FavoritesService],
  exports: [FavoritesService],
})
export class FavoritesModule {}

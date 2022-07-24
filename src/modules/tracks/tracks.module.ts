import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FavoritesModule } from '../favourites/favorites.module';
import { ArtistsModule } from '../artists/artists.module';
import { AlbumsModule } from '../albums/albums.module';
import { TracksController } from './tracks.controller';
import { TracksService } from './tracks.service';
import { Track } from './entities/track.entity';

@Module({
  controllers: [TracksController],
  imports: [
    forwardRef(() => FavoritesModule),
    forwardRef(() => ArtistsModule),
    forwardRef(() => AlbumsModule),
    TypeOrmModule.forFeature([Track]),
  ],
  providers: [TracksService],
  exports: [TracksService],
})
export class TracksModule {}

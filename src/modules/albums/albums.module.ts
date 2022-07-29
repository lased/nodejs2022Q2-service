import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ArtistsModule } from '../artists/artists.module';
import { AlbumsController } from './albums.controller';
import { AlbumsService } from './albums.service';
import { Album } from './entities/album.entity';

@Module({
  controllers: [AlbumsController],
  imports: [forwardRef(() => ArtistsModule), TypeOrmModule.forFeature([Album])],
  providers: [AlbumsService],
  exports: [AlbumsService],
})
export class AlbumsModule {}

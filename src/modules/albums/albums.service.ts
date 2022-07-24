import {
  NotFoundException,
  Injectable,
  forwardRef,
  Inject,
} from '@nestjs/common';
import { v4 } from 'uuid';

import { FavoritesService } from '../favourites/favorites.service';
import { ArtistsService } from '../artists/artists.service';
import { TracksService } from '../tracks/tracks.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { IService } from 'src/shared/service.interface';
import { Album } from './entities/album.entity';
import { MESSAGE } from './albums.constants';
import { InMemoryStore } from 'src/services';

@Injectable()
export class AlbumsService implements IService<Album> {
  constructor(
    private inMemoryStore: InMemoryStore<Album>,
    @Inject(forwardRef(() => ArtistsService))
    private artistsService: ArtistsService,
    @Inject(forwardRef(() => TracksService))
    private tracksService: TracksService,
    @Inject(forwardRef(() => FavoritesService))
    private favoritesService: FavoritesService,
  ) {}

  create({ name, artistId, year }: CreateAlbumDto) {
    const newAlbum = new Album();

    artistId && this.artistsService.findById(artistId);

    newAlbum.id = v4();
    newAlbum.name = name;
    newAlbum.year = year;
    newAlbum.artistId = artistId;

    this.inMemoryStore.create(newAlbum);

    return newAlbum;
  }

  findAll() {
    return this.inMemoryStore.findAll();
  }

  findById(id: string) {
    const album = this.inMemoryStore.findById(id);

    if (!album) {
      throw new NotFoundException(MESSAGE.NOT_FOUND);
    }

    return album;
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    this.findById(id);

    if (updateAlbumDto.artistId) {
      this.artistsService.findById(updateAlbumDto.artistId);
    }

    return this.inMemoryStore.update(id, updateAlbumDto);
  }

  updateWhere(filter: Partial<Album>, updateAlbumDto: UpdateAlbumDto) {
    const albums = this.inMemoryStore.findAll(filter);
    const result = [];

    albums.forEach((album) => {
      result.push(this.update(album.id, updateAlbumDto));
    });

    return result;
  }

  remove(id: string) {
    const deletedAlbum = this.inMemoryStore.remove(id);

    if (!deletedAlbum) {
      throw new NotFoundException(MESSAGE.NOT_FOUND);
    }

    this.tracksService.updateWhere({ albumId: id }, { albumId: null });
    this.favoritesService.removeWhere('albums', id);

    return deletedAlbum;
  }
}

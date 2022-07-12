import {
  NotFoundException,
  Injectable,
  forwardRef,
  Inject,
} from '@nestjs/common';
import { v4 } from 'uuid';

import { ArtistsService } from '../artists/artists.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';
import { MESSAGE } from './albums.constants';
import { InMemoryStore } from 'src/services';

@Injectable()
export class AlbumsService {
  constructor(
    private inMemoryStore: InMemoryStore<Album>,
    @Inject(forwardRef(() => ArtistsService))
    private artistsService: ArtistsService,
  ) {}

  async create({ name, artistId, year }: CreateAlbumDto) {
    const newAlbum = new Album();

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

    return deletedAlbum;
  }
}

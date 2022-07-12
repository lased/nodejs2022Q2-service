import {
  NotFoundException,
  Injectable,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { v4 } from 'uuid';

import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { AlbumsService } from '../albums/albums.service';
import { TracksService } from '../tracks/tracks.service';
import { Artist } from './entities/artist.entity';
import { MESSAGE } from './artists.constants';
import { InMemoryStore } from 'src/services';

@Injectable()
export class ArtistsService {
  constructor(
    private inMemoryStore: InMemoryStore<Artist>,
    @Inject(forwardRef(() => AlbumsService))
    private albumsService: AlbumsService,
    @Inject(forwardRef(() => TracksService))
    private tracksService: TracksService,
  ) {}

  create({ name, grammy }: CreateArtistDto) {
    const newArtist = new Artist();

    newArtist.id = v4();
    newArtist.name = name;
    newArtist.grammy = grammy;

    this.inMemoryStore.create(newArtist);

    return newArtist;
  }

  findAll() {
    return this.inMemoryStore.findAll();
  }

  findById(id: string) {
    const artist = this.inMemoryStore.findById(id);

    if (!artist) {
      throw new NotFoundException(MESSAGE.NOT_FOUND);
    }

    return artist;
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    this.findById(id);

    return this.inMemoryStore.update(id, updateArtistDto);
  }

  remove(id: string) {
    const deletedArtist = this.inMemoryStore.remove(id);

    if (!deletedArtist) {
      throw new NotFoundException(MESSAGE.NOT_FOUND);
    }

    this.albumsService.updateWhere({ artistId: id }, { artistId: null });
    this.tracksService.updateWhere({ artistId: id }, { artistId: null });

    return deletedArtist;
  }
}

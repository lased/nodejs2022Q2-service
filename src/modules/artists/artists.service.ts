import { ConfigService } from '@nestjs/config';
import { hash, compare } from 'bcrypt';
import { v4 } from 'uuid';
import {
  BadRequestException,
  ForbiddenException,
  NotFoundException,
  Injectable,
} from '@nestjs/common';

import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';
import { MESSAGE } from './artists.constants';
import { InMemoryStore } from 'src/services';

@Injectable()
export class ArtistsService {
  constructor(private inMemoryStore: InMemoryStore<Artist>) {}

  async create({ name, grammy }: CreateArtistDto) {
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

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    this.findById(id);

    return this.inMemoryStore.update(id, updateArtistDto);
  }

  remove(id: string) {
    const deletedArtist = this.inMemoryStore.remove(id);

    if (!deletedArtist) {
      throw new NotFoundException(MESSAGE.NOT_FOUND);
    }

    return deletedArtist;
  }
}

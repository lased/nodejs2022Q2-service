import { NotFoundException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { IService } from 'src/shared/service.interface';
import { Artist } from './entities/artist.entity';
import { MESSAGE } from './artists.constants';

@Injectable()
export class ArtistsService implements IService<Artist> {
  constructor(
    @InjectRepository(Artist) private artistRepo: Repository<Artist>,
  ) {}

  create({ name, grammy }: CreateArtistDto) {
    const newArtist = new Artist();

    newArtist.name = name;
    newArtist.grammy = grammy;

    return this.artistRepo.save(newArtist);
  }

  findAll() {
    return this.artistRepo.find();
  }

  async findById(id: string) {
    const artist = await this.artistRepo.findOne({ where: { id } });

    if (!artist) {
      throw new NotFoundException(MESSAGE.NOT_FOUND);
    }

    return artist;
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    const artist = await this.findById(id);

    await this.artistRepo.update(id, updateArtistDto);

    return Object.assign(artist, updateArtistDto);
  }

  async remove(id: string) {
    const { affected } = await this.artistRepo.delete(id);

    if (!affected) {
      throw new NotFoundException(MESSAGE.NOT_FOUND);
    }

    return true;
  }
}

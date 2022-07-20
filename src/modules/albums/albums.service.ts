import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  NotFoundException,
  Injectable,
  forwardRef,
  Inject,
} from '@nestjs/common';

import { ArtistsService } from '../artists/artists.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { IService } from 'src/shared/service.interface';
import { Album } from './entities/album.entity';
import { MESSAGE } from './albums.constants';

@Injectable()
export class AlbumsService implements IService<Album> {
  constructor(
    @InjectRepository(Album) private albumRepo: Repository<Album>,
    @Inject(forwardRef(() => ArtistsService))
    private artistsService: ArtistsService,
  ) {}

  async create({ name, artistId, year }: CreateAlbumDto) {
    const newAlbum = new Album();

    newAlbum.name = name;
    newAlbum.year = year;
    newAlbum.artistId = artistId;

    return this.albumRepo.save(newAlbum);
  }

  findAll() {
    return this.albumRepo.find();
  }

  async findById(id: string) {
    const album = await this.albumRepo.findOne({
      where: { id },
    });

    if (!album) {
      throw new NotFoundException(MESSAGE.NOT_FOUND);
    }

    return album;
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const album = await this.findById(id);
    const newAlbum = Object.assign(album, updateAlbumDto);

    await this.albumRepo.update(id, updateAlbumDto);

    return newAlbum;
  }

  async remove(id: string) {
    const { affected } = await this.albumRepo.delete(id);

    if (!affected) {
      throw new NotFoundException(MESSAGE.NOT_FOUND);
    }

    return true;
  }
}

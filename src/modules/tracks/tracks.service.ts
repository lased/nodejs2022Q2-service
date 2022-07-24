import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  NotFoundException,
  Injectable,
  Inject,
  forwardRef,
} from '@nestjs/common';

import { FavoritesService } from '../favourites/favorites.service';
import { ArtistsService } from '../artists/artists.service';
import { AlbumsService } from '../albums/albums.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { IService } from 'src/shared/service.interface';
import { Track } from './entities/track.entity';
import { MESSAGE } from './tracks.constants';

@Injectable()
export class TracksService implements IService<Track> {
  constructor(
    @InjectRepository(Track) private trackRepo: Repository<Track>,
    @Inject(forwardRef(() => ArtistsService))
    private artistsService: ArtistsService,
    @Inject(forwardRef(() => AlbumsService))
    private albumsService: AlbumsService,
  ) {}

  async create({ name, artistId, albumId, duration }: CreateTrackDto) {
    const newTrack = new Track();

    newTrack.name = name;
    newTrack.albumId = albumId;
    newTrack.artistId = artistId;
    newTrack.duration = duration;

    return this.trackRepo.save(newTrack);
  }

  findAll() {
    return this.trackRepo.find();
  }

  async findById(id: string) {
    const track = await this.trackRepo.findOne({
      where: { id },
    });

    if (!track) {
      throw new NotFoundException(MESSAGE.NOT_FOUND);
    }

    return track;
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    const track = await this.findById(id);
    const newTrack = Object.assign(track, updateTrackDto);

    await this.trackRepo.update(id, updateTrackDto);

    return newTrack;
  }

  async remove(id: string) {
    const { affected } = await this.trackRepo.delete(id);

    if (!affected) {
      throw new NotFoundException(MESSAGE.NOT_FOUND);
    }

    return true;
  }
}

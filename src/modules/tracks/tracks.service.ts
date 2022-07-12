import {
  NotFoundException,
  Injectable,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { v4 } from 'uuid';

import { ArtistsService } from '../artists/artists.service';
import { AlbumsService } from '../albums/albums.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';
import { MESSAGE } from './tracks.constants';
import { InMemoryStore } from 'src/services';

@Injectable()
export class TracksService {
  constructor(
    private inMemoryStore: InMemoryStore<Track>,
    @Inject(forwardRef(() => ArtistsService))
    private artistsService: ArtistsService,
    @Inject(forwardRef(() => AlbumsService))
    private albumsService: AlbumsService,
  ) {}

  create({ name, artistId, albumId, duration }: CreateTrackDto) {
    const newTrack = new Track();

    artistId && this.artistsService.findById(artistId);
    albumId && this.albumsService.findById(albumId);

    newTrack.id = v4();
    newTrack.name = name;
    newTrack.albumId = albumId;
    newTrack.artistId = artistId;
    newTrack.duration = duration;

    this.inMemoryStore.create(newTrack);

    return newTrack;
  }

  findAll() {
    return this.inMemoryStore.findAll();
  }

  findById(id: string) {
    const track = this.inMemoryStore.findById(id);

    if (!track) {
      throw new NotFoundException(MESSAGE.NOT_FOUND);
    }

    return track;
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    this.findById(id);

    if (updateTrackDto.artistId) {
      this.artistsService.findById(updateTrackDto.artistId);
    }
    if (updateTrackDto.albumId) {
      this.albumsService.findById(updateTrackDto.albumId);
    }

    return this.inMemoryStore.update(id, updateTrackDto);
  }

  updateWhere(filter: Partial<Track>, updateTrackDto: UpdateTrackDto) {
    const tracks = this.inMemoryStore.findAll(filter);
    const result = [];

    tracks.forEach((album) => {
      result.push(this.update(album.id, updateTrackDto));
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

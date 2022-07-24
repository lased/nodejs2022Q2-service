import {
  NotFoundException,
  Injectable,
  Inject,
  forwardRef,
  UnprocessableEntityException,
} from '@nestjs/common';

import { FavoritesResponse } from './entities/favorites.response';
import { ArtistsService } from '../artists/artists.service';
import { Artist } from '../artists/entities/artist.entity';
import { AlbumsService } from '../albums/albums.service';
import { TracksService } from '../tracks/tracks.service';
import { Album } from '../albums/entities/album.entity';
import { Track } from '../tracks/entities/track.entity';
import { IService } from 'src/shared/service.interface';
import { Favorites } from './entities/favorites.entity';
import { MESSAGE } from './favorites.constants';
import { InMemoryStore } from 'src/services';

type IDType = { id: string };
type StoreType = Record<keyof FavoritesResponse, InMemoryStore<IDType>>;

@Injectable()
export class FavoritesService {
  private inMemoryStore: StoreType;

  constructor(
    @Inject(forwardRef(() => ArtistsService))
    private artistsService: ArtistsService,
    @Inject(forwardRef(() => AlbumsService))
    private albumsService: AlbumsService,
    @Inject(forwardRef(() => TracksService))
    private tracksService: TracksService,
  ) {
    this.inMemoryStore = {
      artists: new InMemoryStore(),
      albums: new InMemoryStore(),
      tracks: new InMemoryStore(),
    };
  }

  getFavorites(): FavoritesResponse {
    const albums = this.asyncQueries<Album>(
      this.inMemoryStore.albums,
      this.albumsService,
    );
    const artists = this.asyncQueries<Artist>(
      this.inMemoryStore.artists,
      this.artistsService,
    );
    const tracks = this.asyncQueries<Track>(
      this.inMemoryStore.tracks,
      this.tracksService,
    );

    return {
      albums,
      artists,
      tracks,
    };
  }

  add(type: keyof Favorites, id: string) {
    const store = this.inMemoryStore[type];
    const service = this[`${type}Service`];

    try {
      service.findById(id);
    } catch {
      throw new UnprocessableEntityException(MESSAGE.NOT_EXISTS(id, type));
    }

    const exists = store.findById(id);

    if (!exists) {
      store.create({ id });
    }

    return id;
  }

  remove(type: keyof Favorites, id: string) {
    const store = this.inMemoryStore[type];
    const entry = store.findById(id);

    if (!entry) {
      throw new NotFoundException(MESSAGE.NOT_FOUND(id, type));
    }

    store.remove(id);

    return id;
  }

  removeWhere(type: keyof Favorites, id: string) {
    const store = this.inMemoryStore[type];
    const entry = store.findById(id);

    if (entry) {
      return store.remove(id);
    }

    return null;
  }

  private asyncQueries<T>(store: InMemoryStore<IDType>, service: IService<T>) {
    const list = store.findAll();
    const result = list.map((item) => service.findById(item.id)) as T[];

    return result;
  }
}

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  NotFoundException,
  Injectable,
  Inject,
  forwardRef,
  UnprocessableEntityException,
} from '@nestjs/common';

import { ArtistsService } from '../artists/artists.service';
import { AlbumsService } from '../albums/albums.service';
import { TracksService } from '../tracks/tracks.service';
import { Favorites } from './entities/favorites.entity';
import { MESSAGE } from './favorites.constants';

type FavoriteType = keyof Omit<Favorites, 'id'>;

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(Favorites) private favoritesRepo: Repository<Favorites>,
    @Inject(forwardRef(() => ArtistsService))
    private artistsService: ArtistsService,
    @Inject(forwardRef(() => AlbumsService))
    private albumsService: AlbumsService,
    @Inject(forwardRef(() => TracksService))
    private tracksService: TracksService,
  ) {}

  async getFavorites() {
    const favs = await this.favoritesRepo.findOne({
      where: {},
      relations: ['artists', 'albums', 'tracks'],
    });

    return favs || { artists: [], albums: [], tracks: [] };
  }

  async add(type: FavoriteType, id: string) {
    const service = this[`${type}Service`];

    try {
      const entity = await service.findById(id);
      let favorite = await this.favoritesRepo.findOne({ where: {} });

      if (!favorite) {
        favorite = new Favorites();
      }
      if (!favorite[type]) {
        favorite[type] = [];
      }

      favorite[type].push(entity as any);
      await this.favoritesRepo.save(favorite);

      return id;
    } catch {
      throw new UnprocessableEntityException(MESSAGE.NOT_EXISTS(id, type));
    }
  }

  async remove(type: FavoriteType, id: string) {
    const favorites = await this.getFavorites();
    const indexEntity = favorites[type].findIndex((entity) => entity.id === id);

    if (indexEntity === -1) {
      throw new NotFoundException(MESSAGE.NOT_FOUND(id, type));
    }

    delete favorites[type][indexEntity];
    await this.favoritesRepo.save(favorites);

    return id;
  }
}

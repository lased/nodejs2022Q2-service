import { ArtistsModule } from './artists/artists.module';
import { AlbumsModule } from './albums/albums.module';
import { TracksModule } from './tracks/tracks.module';
import { UsersModule } from './users/users.module';
import { FavoritesModule } from './favourites/favorites.module';

export default [
  UsersModule,
  ArtistsModule,
  AlbumsModule,
  TracksModule,
  FavoritesModule,
];

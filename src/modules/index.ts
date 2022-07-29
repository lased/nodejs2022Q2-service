import { FavoritesModule } from './favourites/favorites.module';
import { ArtistsModule } from './artists/artists.module';
import { AlbumsModule } from './albums/albums.module';
import { TracksModule } from './tracks/tracks.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

export default [
  AuthModule,
  UsersModule,
  ArtistsModule,
  AlbumsModule,
  TracksModule,
  FavoritesModule,
];

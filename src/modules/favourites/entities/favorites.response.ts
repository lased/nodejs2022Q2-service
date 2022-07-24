import { Artist } from 'src/modules/artists/entities/artist.entity';
import { Album } from 'src/modules/albums/entities/album.entity';
import { Track } from 'src/modules/tracks/entities/track.entity';

export class FavoritesResponse {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}

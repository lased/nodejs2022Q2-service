import { Exclude } from 'class-transformer';
import {
  JoinColumn,
  OneToOne,
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';

import { Artist } from 'src/modules/artists/entities/artist.entity';
import { Album } from 'src/modules/albums/entities/album.entity';
import { Track } from 'src/modules/tracks/entities/track.entity';
import { User } from 'src/modules/users/entities/user.entity';

@Entity('favorites')
export class Favorites {
  @PrimaryGeneratedColumn('uuid')
  @Exclude()
  id: string;

  // @OneToOne(() => User, { onDelete: 'CASCADE' })
  // @JoinColumn()
  // user: User;

  @ManyToMany(() => Artist, { cascade: true })
  @JoinTable()
  artists: Artist[];

  @ManyToMany(() => Album, { cascade: true })
  @JoinTable()
  albums: Album[];

  @ManyToMany(() => Track, { cascade: true })
  @JoinTable()
  tracks: Track[];
}

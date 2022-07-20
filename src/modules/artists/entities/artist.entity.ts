import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Album } from 'src/modules/albums/entities/album.entity';
import { Track } from 'src/modules/tracks/entities/track.entity';
import { Exclude } from 'class-transformer';

@Entity('artists')
export class Artist {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('boolean')
  grammy: boolean;

  @OneToMany(() => Album, (album) => album.artist, { cascade: true })
  @Exclude()
  albums: Album[];

  @OneToMany(() => Track, (track) => track.artist, { cascade: true })
  @Exclude()
  tracks: Track[];
}

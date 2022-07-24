import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class favorites1658680913456 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
    await queryRunner.createTable(
      new Table({
        name: 'favorites',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isNullable: false,
            default: 'uuid_generate_v4()',
          },
        ],
      }),
      true,
    );
    await queryRunner.createTable(
      new Table({
        name: 'favorites_albums_albums',
        columns: [
          {
            name: 'favoritesId',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'albumsId',
            type: 'uuid',
            isNullable: false,
          },
        ],
      }),
      true,
    );
    await queryRunner.createTable(
      new Table({
        name: 'favorites_artists_artists',
        columns: [
          {
            name: 'favoritesId',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'artistsId',
            type: 'uuid',
            isNullable: false,
          },
        ],
      }),
      true,
    );
    await queryRunner.createTable(
      new Table({
        name: 'favorites_tracks_tracks',
        columns: [
          {
            name: 'favoritesId',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'tracksId',
            type: 'uuid',
            isNullable: false,
          },
        ],
      }),
      true,
    );
    await queryRunner.query(`
      CREATE INDEX "IDX_4f68d4e307c3df157487b5f5c9" ON public.favorites_albums_albums USING btree ("albumsId");
      CREATE INDEX "IDX_caee2f2437cd634201109549c2" ON public.favorites_albums_albums USING btree ("favoritesId");
      ALTER TABLE ONLY public.favorites_albums_albums
        ADD CONSTRAINT "FK_4f68d4e307c3df157487b5f5c94" FOREIGN KEY ("albumsId") REFERENCES public.albums(id) ON UPDATE CASCADE ON DELETE CASCADE;
      ALTER TABLE ONLY public.favorites_albums_albums
          ADD CONSTRAINT "FK_caee2f2437cd634201109549c20" FOREIGN KEY ("favoritesId") REFERENCES public.favorites(id) ON UPDATE CASCADE ON DELETE CASCADE;


      CREATE INDEX "IDX_660eecabb197df0e6b0835554f" ON public.favorites_artists_artists USING btree ("artistsId");
      CREATE INDEX "IDX_80db6cf8e0b60a21a82563d6b4" ON public.favorites_artists_artists USING btree ("favoritesId");
      ALTER TABLE ONLY public.favorites_artists_artists
        ADD CONSTRAINT "FK_660eecabb197df0e6b0835554f6" FOREIGN KEY ("artistsId") REFERENCES public.artists(id) ON UPDATE CASCADE ON DELETE CASCADE;
      ALTER TABLE ONLY public.favorites_artists_artists
        ADD CONSTRAINT "FK_80db6cf8e0b60a21a82563d6b48" FOREIGN KEY ("favoritesId") REFERENCES public.favorites(id) ON UPDATE CASCADE ON DELETE CASCADE;

      CREATE INDEX "IDX_a68f39bdfc7688558ab5a2f389" ON public.favorites_tracks_tracks USING btree ("tracksId");
      CREATE INDEX "IDX_cdb702f7ae63243bc8ffda8e0a" ON public.favorites_tracks_tracks USING btree ("favoritesId");
      ALTER TABLE ONLY public.favorites_tracks_tracks
        ADD CONSTRAINT "FK_a68f39bdfc7688558ab5a2f3892" FOREIGN KEY ("tracksId") REFERENCES public.tracks(id) ON UPDATE CASCADE ON DELETE CASCADE;
      ALTER TABLE ONLY public.favorites_tracks_tracks
        ADD CONSTRAINT "FK_cdb702f7ae63243bc8ffda8e0aa" FOREIGN KEY ("favoritesId") REFERENCES public.favorites(id) ON UPDATE CASCADE ON DELETE CASCADE;


      INSERT INTO public.favorites(id) VALUES ('0b9762b8-5e1e-4a76-9cad-001003cde440');

      INSERT INTO public.favorites_tracks_tracks("favoritesId", "tracksId") 
        VALUES 
          ('0b9762b8-5e1e-4a76-9cad-001003cde440', 'b6563c55-2ea3-4ce1-a8c1-6877e349bcf3'),
          ('0b9762b8-5e1e-4a76-9cad-001003cde440', 'b962dea7-031c-4bd2-9d76-68a1b4b0cee4'),
          ('0b9762b8-5e1e-4a76-9cad-001003cde440', '5a9bb592-ba87-47bf-975e-4d49ecafed24');
          
      INSERT INTO public.favorites_artists_artists("favoritesId", "artistsId") 
        VALUES 
          ('0b9762b8-5e1e-4a76-9cad-001003cde440', '1f817a3d-24d1-4257-9b13-717495c0486d'),
          ('0b9762b8-5e1e-4a76-9cad-001003cde440', '744024fb-9e45-4d04-818a-6ca1cf484602'),
          ('0b9762b8-5e1e-4a76-9cad-001003cde440', 'f4dc23dd-a05b-4037-b321-3f876c3cca31');

      INSERT INTO public.favorites_albums_albums("favoritesId", "albumsId") 
        VALUES 
          ('0b9762b8-5e1e-4a76-9cad-001003cde440', 'b90bbee1-9617-48d9-b5ad-4dbe9c06e53e'),
          ('0b9762b8-5e1e-4a76-9cad-001003cde440', '61918975-3c1b-4a9c-80f6-ff80c641a50e'),
          ('0b9762b8-5e1e-4a76-9cad-001003cde440', '27b2e133-ec99-4194-9b24-b3b70d111506');
      `);
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('favorites');
    await queryRunner.dropTable('favorites_albums_albums');
    await queryRunner.dropTable('favorites_artists_artists');
    await queryRunner.dropTable('favorites_tracks_tracks');
  }
}

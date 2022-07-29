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
            isPrimary: true,
          },
          {
            name: 'albumsId',
            type: 'uuid',
            isNullable: false,
            isPrimary: true,
          },
        ],
        foreignKeys: [
          {
            columnNames: ['favoritesId'],
            referencedTableName: 'favorites',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
          },
          {
            columnNames: ['albumsId'],
            referencedTableName: 'albums',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
          },
        ],
        indices: [
          { columnNames: ['favoritesId'] },
          { columnNames: ['albumsId'] },
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
            isPrimary: true,
          },
          {
            name: 'artistsId',
            type: 'uuid',
            isNullable: false,
            isPrimary: true,
          },
        ],
        foreignKeys: [
          {
            columnNames: ['favoritesId'],
            referencedTableName: 'favorites',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
          },
          {
            columnNames: ['artistsId'],
            referencedTableName: 'artists',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
          },
        ],
        indices: [
          { columnNames: ['favoritesId'] },
          { columnNames: ['artistsId'] },
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
            isPrimary: true,
          },
          {
            name: 'tracksId',
            type: 'uuid',
            isNullable: false,
            isPrimary: true,
          },
        ],
        foreignKeys: [
          {
            columnNames: ['favoritesId'],
            referencedTableName: 'favorites',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
          },
          {
            columnNames: ['tracksId'],
            referencedTableName: 'tracks',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
          },
        ],
        indices: [
          { columnNames: ['favoritesId'] },
          { columnNames: ['tracksId'] },
        ],
      }),
      true,
    );
    await queryRunner.query(`
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

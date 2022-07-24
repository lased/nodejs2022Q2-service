import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class tracks1658680906657 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
    await queryRunner.createTable(
      new Table({
        name: 'tracks',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isNullable: false,
            default: 'uuid_generate_v4()',
          },
          {
            name: 'name',
            type: 'character varying',
            isNullable: false,
          },
          {
            name: 'duration',
            type: 'numeric',
            isNullable: false,
          },
          {
            name: 'albumId',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'artistId',
            type: 'uuid',
            isNullable: true,
          },
        ],
      }),
      true,
    );
    await queryRunner.query(`
      ALTER TABLE ONLY public.tracks
        ADD CONSTRAINT "FK_5c52e761792791f57de2fec342d" FOREIGN KEY ("albumId") REFERENCES public.albums(id) ON DELETE SET NULL;

      ALTER TABLE ONLY public.tracks
        ADD CONSTRAINT "FK_62f595181306916265849fced48" FOREIGN KEY ("artistId") REFERENCES public.artists(id) ON DELETE SET NULL;

      INSERT INTO public.tracks(id, name, duration, "albumId", "artistId")
        VALUES 
          ('b6563c55-2ea3-4ce1-a8c1-6877e349bcf3', 'track 1', 120, 'b90bbee1-9617-48d9-b5ad-4dbe9c06e53e', '1f817a3d-24d1-4257-9b13-717495c0486d'),
          ('b962dea7-031c-4bd2-9d76-68a1b4b0cee4', 'track 2', 135, '61918975-3c1b-4a9c-80f6-ff80c641a50e', '744024fb-9e45-4d04-818a-6ca1cf484602'),
          ('5a9bb592-ba87-47bf-975e-4d49ecafed24', 'track 3', 234, '27b2e133-ec99-4194-9b24-b3b70d111506', 'f4dc23dd-a05b-4037-b321-3f876c3cca31')
    `);
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('tracks');
  }
}

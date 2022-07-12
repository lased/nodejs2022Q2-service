import { Module } from '@nestjs/common';

import { ArtistsController } from './artists.controller';
import { ArtistsService } from './artists.service';
import { InMemoryStore } from 'src/services';

@Module({
  controllers: [ArtistsController],
  providers: [ArtistsService, InMemoryStore],
})
export class ArtistsModule {}

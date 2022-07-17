import { Module } from '@nestjs/common';
import { ArtistService } from './services/artist.service';
import { ArtistController } from './controller/artist.controller';

@Module({
  providers: [ArtistService],
  controllers: [ArtistController],
})
export class ArtistModule {}

import { Module } from '@nestjs/common';
import { TrackController } from './controllers/track.controller';
import { TrackService } from './sevices/track.service';
import { FavoritesService } from '../favorites/services/favorites.service';
import { AlbumService } from '../album/services/album.service';
import { ArtistService } from '../artist/services/artist.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [TrackController],
  providers: [
    TrackService,
    FavoritesService,
    AlbumService,
    ArtistService,
    PrismaService,
  ],
})
export class TrackModule {}

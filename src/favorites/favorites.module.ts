import { Module } from '@nestjs/common';
import { FavoritesService } from './services/favorites.service';
import { FavoritesController } from './controller/favorites.controller';
import { ArtistService } from '../artist/services/artist.service';
import { TrackService } from '../track/sevices/track.service';
import { AlbumService } from '../album/services/album.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  providers: [
    FavoritesService,
    ArtistService,
    TrackService,
    AlbumService,
    PrismaService,
  ],
  controllers: [FavoritesController],
})
export class FavoritesModule {}

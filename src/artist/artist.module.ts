import { Module } from '@nestjs/common';
import { ArtistService } from './services/artist.service';
import { ArtistController } from './controller/artist.controller';
import { FavoritesService } from '../favorites/services/favorites.service';
import { AlbumService } from '../album/services/album.service';
import { TrackService } from '../track/sevices/track.service';

@Module({
  providers: [ArtistService, FavoritesService, AlbumService, TrackService],
  controllers: [ArtistController],
})
export class ArtistModule {}

import { Module } from '@nestjs/common';
import { AlbumController } from './controller/album.controller';
import { AlbumService } from './services/album.service';
import { FavoritesService } from '../favorites/services/favorites.service';
import { ArtistService } from '../artist/services/artist.service';
import { TrackService } from '../track/sevices/track.service';

@Module({
  controllers: [AlbumController],
  providers: [AlbumService, FavoritesService, ArtistService, TrackService],
})
export class AlbumModule {}

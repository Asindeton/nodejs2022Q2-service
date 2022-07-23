import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { ErrorResponseMessage } from '../../shared/error.interface';
import { v4 as uuidv4 } from 'uuid';
import { ICreateTrackDto, ITrack } from '../interface/track.interface';
import { FavoritesService } from '../../favorites/services/favorites.service';
import { AlbumService } from '../../album/services/album.service';
import { ArtistService } from '../../artist/services/artist.service';

@Injectable()
export class TrackService {
  static tracks: ITrack[] = [];
  constructor(
    @Inject(forwardRef(() => ArtistService))
    private artistService: ArtistService,
    @Inject(forwardRef(() => AlbumService))
    private albumService: AlbumService,
    @Inject(forwardRef(() => FavoritesService))
    private favoritesService: FavoritesService,
  ) {}
  getAllTrack() {
    return TrackService.tracks;
  }

  getTrackByID(id: string): ITrack {
    const findTrack = TrackService.tracks.find((user) => user.id == id);
    if (findTrack) {
      return findTrack;
    } else {
      throw new HttpException(
        ErrorResponseMessage.TRACK_NOT_FOUNDED,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  createTrack({ name, duration, albumId, artistId }: ICreateTrackDto) {
    const newTrack: ITrack = {
      id: uuidv4(), // uuid v4
      name,
      duration,
      albumId: albumId ?? null,
      artistId: artistId ?? null,
    };
    TrackService.tracks.push(newTrack);
    return newTrack;
  }

  updateTrack(
    id: string,
    { name, duration, albumId, artistId }: ICreateTrackDto,
  ): ITrack {
    const indexOfTrack = TrackService.tracks.findIndex((user) => user.id == id);
    if (indexOfTrack !== -1) {
      const oldTrackData = TrackService.tracks[indexOfTrack];

      TrackService.tracks[indexOfTrack] = {
        id: oldTrackData.id,
        name: name ?? oldTrackData.name,
        duration: duration ?? oldTrackData.duration,
        albumId: albumId ?? oldTrackData.albumId,
        artistId: artistId ?? oldTrackData.artistId,
      };

      return TrackService.tracks[indexOfTrack];
    } else {
      throw new HttpException(
        ErrorResponseMessage.TRACK_NOT_FOUNDED,
        HttpStatus.NOT_FOUND,
      );
    }
  }
  deleteTrack(id) {
    const indexOfTrack = TrackService.tracks.findIndex(
      (track) => track.id == id,
    );
    if (indexOfTrack == -1) {
      throw new HttpException(
        ErrorResponseMessage.TRACK_NOT_FOUNDED,
        HttpStatus.NOT_FOUND,
      );
    }

    FavoritesService.favorites.tracks =
      FavoritesService.favorites.tracks.filter((el) => el.id !== id);

    const removedTrack = TrackService.tracks.splice(indexOfTrack, 1)[0];

    if (removedTrack) {
      return removedTrack;
    }
  }
}

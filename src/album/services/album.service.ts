import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { ICreateAlbumDto, IAlbum } from '../interface/album.interface';
import { ErrorResponseMessage } from '../../shared/error.interface';
import { v4 as uuidv4 } from 'uuid';
import { FavoritesService } from '../../favorites/services/favorites.service';
import { TrackService } from '../../track/sevices/track.service';
import { ArtistService } from '../../artist/services/artist.service';

@Injectable()
export class AlbumService {
  static album: IAlbum[] = [];
  constructor(
    @Inject(forwardRef(() => ArtistService))
    private artistService: ArtistService,
    @Inject(forwardRef(() => TrackService))
    private trackService: TrackService,
    @Inject(forwardRef(() => FavoritesService))
    private favoritesService: FavoritesService,
  ) {}
  getAllAlbum() {
    return AlbumService.album;
  }

  getAlbumByID(id: string): IAlbum {
    const findAlbum = AlbumService.album.find((user) => user.id == id);
    if (findAlbum) {
      return findAlbum;
    } else {
      throw new HttpException(
        ErrorResponseMessage.ALBUM_NOT_FOUNDED,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  createAlbum({ name, artistId, year }: ICreateAlbumDto) {
    const newAlbum: IAlbum = {
      id: uuidv4(), // uuid v4
      name,
      year,
      artistId: artistId ?? null,
    };
    AlbumService.album.push(newAlbum);
    return newAlbum;
  }

  updateAlbum(id: string, { name, artistId, year }: ICreateAlbumDto): IAlbum {
    const indexOfAlbum = AlbumService.album.findIndex((user) => user.id == id);
    if (indexOfAlbum !== -1) {
      const oldAlbumData = AlbumService.album[indexOfAlbum];

      AlbumService.album[indexOfAlbum] = {
        id: oldAlbumData.id,
        name: name ?? oldAlbumData.name,
        year: year ?? oldAlbumData.year,
        artistId: artistId ?? oldAlbumData.artistId,
      };

      return AlbumService.album[indexOfAlbum];
    } else {
      throw new HttpException(
        ErrorResponseMessage.ALBUM_NOT_FOUNDED,
        HttpStatus.NOT_FOUND,
      );
    }
  }
  deleteAlbum(id) {
    const indexOfAlbum = AlbumService.album.findIndex(
      (track) => track.id == id,
    );
    if (indexOfAlbum == -1) {
      throw new HttpException(
        ErrorResponseMessage.ALBUM_NOT_FOUNDED,
        HttpStatus.NOT_FOUND,
      );
    }

    TrackService.tracks.forEach((el, index) => {
      if (el.albumId === id) {
        TrackService.tracks[index].albumId = null;
      }
    });

    FavoritesService.favorites.albums =
      FavoritesService.favorites.albums.filter((el) => el.id !== id);

    const removedAlbum = AlbumService.album.splice(indexOfAlbum, 1)[0];
    if (removedAlbum) {
      return removedAlbum;
    }
  }
}

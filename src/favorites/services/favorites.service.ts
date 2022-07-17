import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { IFavoritesRepsonse } from '../interface/favorites.interface';
import { ErrorResponseMessage } from '../../shared/error.interface';
import { ArtistService } from '../../artist/services/artist.service';
import { AlbumService } from '../../album/services/album.service';
import { TrackService } from '../../track/sevices/track.service';

@Injectable()
export class FavoritesService {
  constructor(
    @Inject(forwardRef(() => ArtistService))
    private artistService: ArtistService,
    @Inject(forwardRef(() => AlbumService))
    private albumService: AlbumService,
    @Inject(forwardRef(() => TrackService))
    private trackService: TrackService,
  ) {}
  static favorites: IFavoritesRepsonse = {
    artists: [],
    albums: [],
    tracks: [],
  };
  getAllFavorites() {
    return FavoritesService.favorites;
  }
  addFavorites(path, id) {
    switch (path) {
      case 'artist':
        const dataArtist = this.artistService.getAllArtists();
        const findArtist = dataArtist.find((el) => el.id == id);
        if (findArtist !== undefined) {
          return FavoritesService.favorites.artists.push(findArtist);
        }
      case 'album':
        const dataAlbum = this.albumService.getAllAlbum();
        const findAlbum = dataAlbum.find((el) => el.id == id);
        if (findAlbum !== undefined) {
          return FavoritesService.favorites.albums.push(findAlbum);
        }

      case 'track':
        const dataTrack = this.trackService.getAllTrack();
        const findTrack = dataTrack.find((el) => el.id == id);
        if (findTrack !== undefined) {
          return FavoritesService.favorites.tracks.push(findTrack);
        }
      default:
        throw new HttpException(
          ErrorResponseMessage.ITEM_NOT_FOUNDED,
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
    }
  }
  deleteFavorites(path, id) {
    const indexOfFavorites = FavoritesService.favorites[`${path}s`].findIndex(
      (elem) => elem.id == id,
    );

    if (indexOfFavorites == -1) {
      throw new HttpException(
        ErrorResponseMessage.IS_NOT_FAVORITE,
        HttpStatus.NOT_FOUND,
      );
    }

    const removedID = FavoritesService.favorites[`${path}s`].splice(
      indexOfFavorites,
      1,
    )[0];
    if (removedID) {
      return removedID;
    }
  }
}

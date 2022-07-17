import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { ErrorResponseMessage } from '../../shared/error.interface';
import { v4 as uuidv4 } from 'uuid';
import { IArtist, ICreateArtistDto } from '../interface/artist.interface';
import { AlbumService } from '../../album/services/album.service';
import { FavoritesService } from '../../favorites/services/favorites.service';
import { TrackService } from '../../track/sevices/track.service';

@Injectable()
export class ArtistService {
  static artists: IArtist[] = [];

  constructor(
    @Inject(forwardRef(() => AlbumService))
    private albumService: AlbumService,
    @Inject(forwardRef(() => TrackService))
    private trackService: TrackService,
    @Inject(forwardRef(() => FavoritesService))
    private favoritesService: FavoritesService,
  ) {}
  getAllArtists() {
    return ArtistService.artists;
  }

  getArtistByID(id: string): IArtist {
    const findArtist = ArtistService.artists.find((artist) => artist.id == id);
    if (findArtist) {
      return findArtist;
    } else {
      throw new HttpException(
        ErrorResponseMessage.ARTIST_NOT_FOUNDED,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  createArtist({ name, grammy }: ICreateArtistDto) {
    const newArtist: IArtist = {
      id: uuidv4(), // uuid v4
      name,
      grammy,
    };
    ArtistService.artists.push(newArtist);
    return newArtist;
  }

  updateArtist(id: string, { name, grammy }: ICreateArtistDto): IArtist {
    const indexOfArtist = ArtistService.artists.findIndex(
      (artist) => artist.id == id,
    );
    if (indexOfArtist !== -1) {
      const oldArtistData = ArtistService.artists[indexOfArtist];

      ArtistService.artists[indexOfArtist] = {
        id: oldArtistData.id,
        name: name ?? oldArtistData.name,
        grammy: grammy ?? oldArtistData.grammy,
      };

      return ArtistService.artists[indexOfArtist];
    } else {
      throw new HttpException(
        ErrorResponseMessage.ARTIST_NOT_FOUNDED,
        HttpStatus.NOT_FOUND,
      );
    }
  }
  deleteArtist(id) {
    const indexOfArtist = ArtistService.artists.findIndex(
      (artist) => artist.id == id,
    );
    if (indexOfArtist == -1) {
      throw new HttpException(
        ErrorResponseMessage.TRACK_NOT_FOUNDED,
        HttpStatus.NOT_FOUND,
      );
    }
    TrackService.tracks.forEach((el, index) => {
      if (el.artistId === id) {
        TrackService.tracks[index].artistId = null;
      }
    });
    FavoritesService.favorites.artists =
      FavoritesService.favorites.artists.filter((el) => el.id !== id);
    const removedArtist = ArtistService.artists.splice(indexOfArtist, 1)[0];
    if (removedArtist) {
      return removedArtist;
    }
  }
}

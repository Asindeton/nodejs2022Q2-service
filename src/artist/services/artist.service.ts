import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ErrorResponseMessage } from '../../shared/error.interface';
import { v4 as uuidv4 } from 'uuid';
import { IArtist, ICreateArtistDto } from '../interface/artist.interface';

@Injectable()
export class ArtistService {
  private readonly artists: IArtist[] = [];

  getAllArtists() {
    return this.artists;
  }

  getArtistByID(id: string): IArtist {
    const findArtist = this.artists.find((artist) => artist.id == id);
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
    this.artists.push(newArtist);
    return newArtist;
  }

  updateArtist(id: string, { name, grammy }: ICreateArtistDto): IArtist {
    const indexOfArtist = this.artists.findIndex((artist) => artist.id == id);
    if (indexOfArtist !== -1) {
      const oldArtistData = this.artists[indexOfArtist];

      this.artists[indexOfArtist] = {
        id: oldArtistData.id,
        name: name ?? oldArtistData.name,
        grammy: grammy ?? oldArtistData.grammy,
      };

      return this.artists[indexOfArtist];
    } else {
      throw new HttpException(
        ErrorResponseMessage.ARTIST_NOT_FOUNDED,
        HttpStatus.NOT_FOUND,
      );
    }
  }
  deleteArtist(id) {
    const indexOfArtist = this.artists.findIndex((artist) => artist.id == id);
    if (indexOfArtist == -1) {
      throw new HttpException(
        ErrorResponseMessage.TRACK_NOT_FOUNDED,
        HttpStatus.NOT_FOUND,
      );
    }

    const removedArtist = this.artists.splice(indexOfArtist, 1)[0];
    if (removedArtist) {
      return removedArtist;
    }
  }
}

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ICreateAlbumDto, IAlbum } from '../interface/album.interface';
import { ErrorResponseMessage } from '../../shared/error.interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AlbumService {
  private readonly album: IAlbum[] = [];

  getAllAlbum() {
    return this.album;
  }

  getAlbumByID(id: string): IAlbum {
    const findAlbum = this.album.find((user) => user.id == id);
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
    this.album.push(newAlbum);
    return newAlbum;
  }

  updateAlbum(id: string, { name, artistId, year }: ICreateAlbumDto): IAlbum {
    const indexOfAlbum = this.album.findIndex((user) => user.id == id);
    if (indexOfAlbum !== -1) {
      const oldAlbumData = this.album[indexOfAlbum];

      this.album[indexOfAlbum] = {
        id: oldAlbumData.id,
        name: name ?? oldAlbumData.name,
        year: year ?? oldAlbumData.year,
        artistId: artistId ?? oldAlbumData.artistId,
      };

      return this.album[indexOfAlbum];
    } else {
      throw new HttpException(
        ErrorResponseMessage.ALBUM_NOT_FOUNDED,
        HttpStatus.NOT_FOUND,
      );
    }
  }
  deleteAlbum(id) {
    const indexOfAlbum = this.album.findIndex((track) => track.id == id);
    if (indexOfAlbum == -1) {
      throw new HttpException(
        ErrorResponseMessage.ALBUM_NOT_FOUNDED,
        HttpStatus.NOT_FOUND,
      );
    }

    const removedAlbum = this.album.splice(indexOfAlbum, 1)[0];
    if (removedAlbum) {
      return removedAlbum;
    }
  }
}

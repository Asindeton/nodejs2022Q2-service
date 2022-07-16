import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ErrorResponseMessage } from '../../shared/error.interface';
import { v4 as uuidv4 } from 'uuid';
import { ICreateTrackDto, ITrack } from '../interface/track.interface';

@Injectable()
export class TrackService {
  private readonly tracks: ITrack[] = [];

  getAllTrack() {
    return this.tracks;
  }

  getTrackByID(id: string): ITrack {
    const findTrack = this.tracks.find((user) => user.id == id);
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
    this.tracks.push(newTrack);
    return newTrack;
  }

  updateTrack(
    id: string,
    { name, duration, albumId, artistId }: ICreateTrackDto,
  ): ITrack {
    const indexOfTrack = this.tracks.findIndex((user) => user.id == id);
    if (indexOfTrack !== -1) {
      const oldTrackData = this.tracks[indexOfTrack];

      this.tracks[indexOfTrack] = {
        id: oldTrackData.id,
        name: name ?? oldTrackData.name,
        duration: duration ?? oldTrackData.duration,
        albumId: albumId ?? oldTrackData.albumId,
        artistId: artistId ?? oldTrackData.artistId,
      };

      return this.tracks[indexOfTrack];
    } else {
      throw new HttpException(
        ErrorResponseMessage.TRACK_NOT_FOUNDED,
        HttpStatus.NOT_FOUND,
      );
    }
  }
  deleteTrack(id) {
    const indexOfTrack = this.tracks.findIndex((track) => track.id == id);
    console.log(indexOfTrack);
    if (indexOfTrack == -1) {
      throw new HttpException(
        ErrorResponseMessage.TRACK_NOT_FOUNDED,
        HttpStatus.NOT_FOUND,
      );
    }

    const removedTrack = this.tracks.splice(indexOfTrack, 1)[0];
    if (removedTrack) {
      return removedTrack;
    }
  }
}

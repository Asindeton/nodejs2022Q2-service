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
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class TrackService {
  constructor(
    @Inject(forwardRef(() => FavoritesService))
    private favoritesService: FavoritesService,
    private prisma: PrismaService,
  ) {}
  async getAllTrack() {
    return await this.prisma.track.findMany();
  }

  async getTrackByID(id: string) {
    const findTrack = await this.prisma.track.findFirst({ where: { id } });
    if (findTrack) {
      return findTrack;
    } else {
      throw new HttpException(
        ErrorResponseMessage.TRACK_NOT_FOUNDED,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async createTrack({ name, duration, albumId, artistId }: ICreateTrackDto) {
    return await this.prisma.track.create({
      data: { name, duration, albumId, artistId },
    });
  }

  async updateTrack(
    id: string,
    { name, duration, albumId, artistId }: ICreateTrackDto,
  ): Promise<ITrack> {
    const indexOfTrack = await this.prisma.track.findFirst({ where: { id } });
    if (indexOfTrack) {
      return await this.prisma.track.update({
        where: { id },
        data: { name, duration, albumId, artistId },
      });
    } else {
      throw new HttpException(
        ErrorResponseMessage.TRACK_NOT_FOUNDED,
        HttpStatus.NOT_FOUND,
      );
    }
  }
  async deleteTrack(id) {
    const indexOfArtist = await this.prisma.track.findFirst({ where: { id } });
    if (!indexOfArtist) {
      throw new HttpException(
        ErrorResponseMessage.TRACK_NOT_FOUNDED,
        HttpStatus.NOT_FOUND,
      );
    }

    await this.favoritesService.deleteFavorites('track', id);
    const removedTrack = await this.prisma.track.delete({ where: { id } });
    if (removedTrack) {
      return removedTrack;
    }
  }
}

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
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class AlbumService {
  constructor(
    @Inject(forwardRef(() => FavoritesService))
    private favoritesService: FavoritesService,
    public prisma: PrismaService,
  ) {}

  async getAllAlbum() {
    return await this.prisma.album.findMany();
  }

  async getAlbumByID(id: string) {
    const findAlbum = this.prisma.album.findFirst({ where: { id } });
    if (findAlbum) {
      return findAlbum;
    } else {
      throw new HttpException(
        ErrorResponseMessage.ALBUM_NOT_FOUNDED,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async createAlbum({ name, artistId, year }: ICreateAlbumDto) {
    return await this.prisma.album.create({ data: { name, artistId, year } });
  }

  async updateAlbum(id: string, { name, artistId, year }: ICreateAlbumDto) {
    const indexOfAlbum = await this.prisma.album.findFirst({ where: { id } });
    if (indexOfAlbum) {
      return await this.prisma.album.update({
        where: { id },
        data: { name, artistId, year },
      });
    } else {
      throw new HttpException(
        ErrorResponseMessage.ALBUM_NOT_FOUNDED,
        HttpStatus.NOT_FOUND,
      );
    }
  }
  async deleteAlbum(id) {
    const removedAlbum = await this.prisma.album.findFirst({ where: { id } });
    if (!removedAlbum) {
      throw new HttpException(
        ErrorResponseMessage.ALBUM_NOT_FOUNDED,
        HttpStatus.NOT_FOUND,
      );
    }

    await this.favoritesService.deleteFavorites('album', id);
    if (removedAlbum) {
      return this.prisma.album.delete({ where: { id } });
    }
  }
}

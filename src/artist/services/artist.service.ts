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
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ArtistService {
  constructor(
    @Inject(forwardRef(() => FavoritesService))
    private favoritesService: FavoritesService,
    private prisma: PrismaService,
  ) {}
  async getAllArtists() {
    return await this.prisma.artist.findMany();
  }

  async getArtistByID(id: string) {
    const findArtist = await this.prisma.artist.findFirst({ where: { id } });
    if (findArtist) {
      return findArtist;
    } else {
      throw new HttpException(
        ErrorResponseMessage.ARTIST_NOT_FOUNDED,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async createArtist({ name, grammy }: ICreateArtistDto) {
    return await this.prisma.artist.create({ data: { name, grammy } });
  }

  async updateArtist(id: string, { name, grammy }: ICreateArtistDto) {
    const artist = await this.prisma.artist.findFirst({ where: { id } });

    if (artist) {
      return await this.prisma.artist.update({
        where: { id },
        data: { name, grammy },
      });
    } else {
      throw new HttpException(
        ErrorResponseMessage.ARTIST_NOT_FOUNDED,
        HttpStatus.NOT_FOUND,
      );
    }
  }
  async deleteArtist(id) {
    const indexOfArtist = await this.prisma.artist.findFirst({ where: { id } });
    if (!indexOfArtist) {
      throw new HttpException(
        ErrorResponseMessage.TRACK_NOT_FOUNDED,
        HttpStatus.NOT_FOUND,
      );
    }
    await this.favoritesService.deleteFavorites('artist', id);
    const removedArtist = await this.prisma.artist.delete({ where: { id } });
    if (removedArtist) {
      return removedArtist;
    }
  }
}

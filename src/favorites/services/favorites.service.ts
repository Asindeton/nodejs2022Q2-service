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
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class FavoritesService {
  constructor(private prisma: PrismaService) {}
  async getAllFavorites() {
    const favs = await this.prisma.favorite.findMany({
      select: {
        artists: { select: { id: true, name: true, grammy: true } },
        albums: {
          select: { id: true, name: true, year: true, artistId: true },
        },
        tracks: {
          select: {
            id: true,
            name: true,
            duration: true,
            artistId: true,
            albumId: true,
          },
        },
      },
    });

    return {
      artists: favs.length && favs[0].artists ? favs[0].artists : [],
      albums: favs.length && favs[0].albums ? favs[0].albums : [],
      tracks: favs.length && favs[0].tracks ? favs[0].tracks : [],
    };
  }

  async addFavorites(path, id) {
    switch (path) {
      case 'artist':
        const dataArtist = await this.prisma.artist.findFirst({
          where: { id },
        });
        if (dataArtist) {
          const favsArtist = await this.prisma.favorite.findMany();
          if (!favsArtist.length) {
            const createdFavs = await this.prisma.favorite.create({ data: {} });
            await this.prisma.artist.update({
              where: { id },
              data: { favoriteId: createdFavs.id },
            });
          } else {
            await this.prisma.artist.update({
              where: { id },
              data: { favoriteId: favsArtist[0].id },
            });
          }
        }
      case 'album':
        const dataAlbum = await this.prisma.album.findFirst({
          where: { id },
        });
        if (dataAlbum) {
          const favsAlbum = await this.prisma.favorite.findMany();
          if (!favsAlbum.length) {
            const createdFavs = await this.prisma.favorite.create({ data: {} });
            await this.prisma.album.update({
              where: { id },
              data: { favoriteId: createdFavs.id },
            });
          } else {
            await this.prisma.album.update({
              where: { id },
              data: { favoriteId: favsAlbum[0].id },
            });
          }
        }
      case 'track':
        const trackAlbum = await this.prisma.track.findFirst({
          where: { id },
        });
        if (trackAlbum) {
          const favsTrack = await this.prisma.favorite.findMany();
          if (!favsTrack.length) {
            const createdFavs = await this.prisma.favorite.create({ data: {} });
            await this.prisma.track.update({
              where: { id },
              data: { favoriteId: createdFavs.id },
            });
          } else {
            await this.prisma.track.update({
              where: { id },
              data: { favoriteId: favsTrack[0].id },
            });
          }
        }
      default:
        throw new HttpException(
          ErrorResponseMessage.ITEM_NOT_FOUNDED,
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
    }
  }
  async deleteFavorites(path, id) {
    await this.prisma[path].update({
      where: { id },
      data: { favoriteId: { set: null } },
    });

    // const haveFavorite = FavoritesService.favorites[`${path}s`].findIndex(
    //   (elem) => elem.id == id,
    // );
    //
    // if (indexOfFavorites == -1) {
    //   throw new HttpException(
    //     ErrorResponseMessage.IS_NOT_FAVORITE,
    //     HttpStatus.NOT_FOUND,
    //   );
    // }
    //
    // const removedID = FavoritesService.favorites[`${path}s`].splice(
    //   indexOfFavorites,
    //   1,
    // )[0];
    //
    // if (removedID) {
    //   return removedID;
    // }
  }
}

import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { FavoritesService } from '../services/favorites.service';
import { IFavoritesRepsonse } from '../interface/favorites.interface';

@Controller('favs')
export class FavoritesController {
  constructor(private favoritesService: FavoritesService) {}

  @Get()
  async getAllUsers(): Promise<IFavoritesRepsonse> {
    return this.favoritesService.getAllFavorites();
  }

  @Post(':elem/:id')
  @HttpCode(HttpStatus.CREATED)
  async createUser(@Param() params) {
    return this.favoritesService.addFavorites(params.elem, params.id);
  }

  @Delete(':elem/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteUserById(@Param() params) {
    return this.favoritesService.deleteFavorites(params.elem, params.id);
  }
}

import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { TrackService } from '../sevices/track.service';
import { ITrack } from '../interface/track.interface';
import { CreateTrackDto } from '../dto/createTrack.dto';

@Controller('track')
export class TrackController {
  constructor(private trackService: TrackService) {}

  @Get()
  async getAllUsers(): Promise<ITrack[]> {
    return this.trackService.getAllTrack();
  }

  @Get(':id')
  async getUserById(@Param() params): Promise<ITrack> {
    return this.trackService.getTrackByID(params.id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createUser(@Body() createTrackDto: CreateTrackDto): Promise<ITrack> {
    return this.trackService.createTrack(createTrackDto);
  }

  @Put(':id')
  async updateUserPassword(
    @Param() params,
    @Body() createTrackDto: CreateTrackDto,
  ) {
    return this.trackService.updateTrack(params.id, createTrackDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteUserById(@Param() params) {
    return this.trackService.deleteTrack(params.id);
  }
}

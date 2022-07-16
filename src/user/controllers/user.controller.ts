import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  HttpStatus,
  HttpCode,
  Put,
  Delete,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { IUserResponse } from '../interface/user.interface';
import { CreateUserDto } from '../dto/createUser.dto';
import { UpdateUserDto } from '../dto/updateUser.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async getAllUsers(): Promise<IUserResponse[]> {
    return this.userService.getAllUsers();
  }

  @Get(':id')
  async getUserById(@Param() params): Promise<IUserResponse> {
    return this.userService.getUserByID(params.id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<IUserResponse> {
    return this.userService.createUser(createUserDto);
  }

  @Put(':id')
  async updateUserPassword(
    @Param() params,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.updateUserPassword(params.id, updateUserDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteUserById(@Param() params) {
    return this.userService.deleteUser(params.id);
  }
}

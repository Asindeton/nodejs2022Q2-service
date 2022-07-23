import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  ICreateUserDto,
  IUpdatePasswordDto,
} from '../interface/user.interface';
import { ErrorResponseMessage } from '../../shared/error.interface';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(public prisma: PrismaService) {}

  async getAllUsers() {
    const usersResponse = await this.prisma.user.findMany();
    return usersResponse.map((user) => {
      delete user.password;
      return user;
    });
  }

  async getUserByID(id: string) {
    const findUser = await this.prisma.user.findFirst({ where: { id } });

    if (findUser) {
      delete findUser.password;
      return findUser;
    } else {
      throw new HttpException(
        ErrorResponseMessage.USER_NOT_FOUNDED,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async createUser({ login, password }: ICreateUserDto) {
    const user = await this.prisma.user.create({
      data: { login, password },
    });

    if (user) {
      delete user.password;
      return {
        ...user,
        createdAt: new Date(user.createdAt).getTime(),
        updatedAt: new Date(user.createdAt).getTime(),
      };
    }
  }

  async updateUserPassword(
    id: string,
    { oldPassword, newPassword }: IUpdatePasswordDto,
  ) {
    const userById = await this.prisma.user.findFirst({ where: { id } });

    if (userById) {
      if (userById.password == oldPassword) {
        await this.prisma.user.update({
          where: { id },
          data: {
            password: newPassword,
            version: { increment: 1 },
          },
        });

        const userResponse = await this.prisma.user.findFirst({
          where: { id },
        });
        if (userResponse) {
          delete userResponse.password;
          return {
            ...userResponse,
            createdAt: new Date(userResponse.createdAt).getTime(),
            updatedAt: new Date(userResponse.updatedAt).getTime(),
          };
        }
      } else {
        throw new HttpException(
          ErrorResponseMessage.USER_PASSWORD_INCORRECT,
          HttpStatus.FORBIDDEN,
        );
      }
    } else {
      throw new HttpException(
        ErrorResponseMessage.USER_NOT_FOUNDED,
        HttpStatus.NOT_FOUND,
      );
    }
  }
  async deleteUser(id) {
    const haveUser = await this.prisma.user.findFirst({ where: { id } });
    if (haveUser) {
      const removedUser = await this.prisma.user.delete({ where: { id } });
      delete removedUser.password;
      return removedUser;
    }
    throw new HttpException(
      ErrorResponseMessage.USER_NOT_FOUNDED,
      HttpStatus.NOT_FOUND,
    );
  }
}

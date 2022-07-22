import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  ICreateUserDto,
  IUpdatePasswordDto,
  IUser,
  IUserResponse,
} from '../interface/user.interface';
import { v4 as uuidv4 } from 'uuid';
import { ErrorResponseMessage } from '../../shared/error.interface';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from '../dto/createUser.dto';

@Injectable()
export class UserService {
  constructor(public prisma: PrismaService) {}

  // private readonly users: IUser[] = [];

  // const user = await this.prisma.user.create({
  //   data: createUserDto,
  // });
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

    return user;
  }

  async updateUserPassword(
    id: string,
    { oldPassword, newPassword }: IUpdatePasswordDto,
  ) {
    return await this.prisma.user.findFirst({ where: { id } });

    // const indexOfUser = this.users.findIndex((user) => user.id == id);

    // if (indexOfUser !== -1) {
    //   const oldUserData = this.users[indexOfUser];
    //   if (oldUserData.password == oldPassword) {
    //     this.users[indexOfUser] = {
    //       ...oldUserData,
    //       password: newPassword,
    //       version: oldUserData.version + 1,
    //       updatedAt: new Date().getTime(),
    //     };
    //     const userResponse = Object.assign({}, this.users[indexOfUser]);
    //     if (userResponse) {
    //       delete userResponse.password;
    //       return userResponse;
    //     }
    //   } else {
    //     throw new HttpException(
    //       ErrorResponseMessage.USER_PASSWORD_INCORRECT,
    //       HttpStatus.FORBIDDEN,
    //     );
    //   }
    // } else {
    //   throw new HttpException(
    //     ErrorResponseMessage.USER_NOT_FOUNDED,
    //     HttpStatus.NOT_FOUND,
    //   );
    // }
  }
  deleteUser(id) {
    return this.prisma.user.delete({ where: { id } });
    throw new HttpException(
      ErrorResponseMessage.USER_NOT_FOUNDED,
      HttpStatus.NOT_FOUND,
    );
  }
}

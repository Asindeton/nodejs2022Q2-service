import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  ICreateUserDto,
  IUpdatePasswordDto,
  IUser,
  IUserResponse,
} from '../interface/user.interface';
import { v4 as uuidv4 } from 'uuid';
import { ErrorResponseMessage } from '../../shared/error.interface';

@Injectable()
export class UserService {
  private readonly users: IUser[] = [];

  getAllUsers() {
    const usersResponse: IUserResponse[] = this.users.map((user) => {
      delete user.password;
      return user;
    });
    return usersResponse;
  }

  getUserByID(id: string): IUserResponse {
    const findUser = this.users.find((user) => user.id == id);
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

  createUser({ login, password }: ICreateUserDto) {
    const newUserResponse: IUserResponse = {
      id: uuidv4(), // uuid v4
      login,
      version: 1,
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime(),
    };

    this.users.push({ ...newUserResponse, password });
    return newUserResponse;
  }

  updateUserPassword(
    id: string,
    { oldPassword, newPassword }: IUpdatePasswordDto,
  ): IUserResponse {
    const indexOfUser = this.users.findIndex((user) => user.id == id);
    if (indexOfUser !== -1) {
      const oldUserData = this.users[indexOfUser];
      if (oldUserData.password == oldPassword) {
        this.users[indexOfUser] = {
          ...oldUserData,
          password: newPassword,
          version: oldUserData.version + 1,
          updatedAt: new Date().getTime(),
        };
        const userResponse = Object.assign({}, this.users[indexOfUser]);
        if (userResponse) {
          delete userResponse.password;
          return userResponse;
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
  deleteUser(id) {
    const indexOfUser = this.users.findIndex((user) => user.id == id);
    const removedUser = this.users.splice(indexOfUser, 1)[0];
    if (removedUser) {
      delete removedUser.password;
      return removedUser;
    }
    throw new HttpException(
      ErrorResponseMessage.USER_NOT_FOUNDED,
      HttpStatus.NOT_FOUND,
    );
  }
}

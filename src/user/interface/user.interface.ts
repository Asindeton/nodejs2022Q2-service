export interface IUser extends IUserResponse {
  password: string;
}

export interface IUserResponse {
  id: string; // uuid v4
  login: string;
  version: number; // integer number, increments on update
  createdAt: number; // timestamp of creation
  updatedAt: number; // timestamp of last update
}

export interface ICreateUserDto {
  login: string;
  password: string;
}
export interface IUpdatePasswordDto {
  oldPassword: string; // previous password
  newPassword: string; // new password
}

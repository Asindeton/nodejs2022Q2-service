export interface JwtPayload {
  login: string;
  userId: string;
}

export interface JWTResponse {
  accessToken: string;
  refreshToken: string;
}

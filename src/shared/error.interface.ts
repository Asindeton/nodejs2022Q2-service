export enum ErrorResponseMessage {
  USER_NOT_FOUNDED = 'User not founded',
  USER_ID_IS_INVALID = 'Id is invalid (not uuid)',
  USER_PASSWORD_INCORRECT = 'Password incorrect',
  TRACK_NOT_FOUNDED = 'Track not founded',
  ARTIST_NOT_FOUNDED = 'Artist not founded',
  ALBUM_NOT_FOUNDED = 'Artist not founded',
  IS_NOT_FAVORITE = 'Corresponding item is not favorite',
  ITEM_NOT_FOUNDED = 'Item does not exist',
}
export enum AuthErrors {
  INCORRECT_BODY = 'Request body does not contain required fields',
  NO_REFRESH_TOKEN = 'No refreshToken in body',
  INVALID_CREDENTIALS = 'Incorrect login credentials',
  UNAUTHORIZED = 'Unauthorized: invalid authentication credentials',
  REFRESH_EXPIRED = 'Refresh token expired',
  REFRESH_MALFORMED = 'Refresh token malformed',
}

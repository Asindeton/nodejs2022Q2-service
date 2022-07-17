export interface IArtist extends ICreateArtistDto {
  id: string; // uuid v4
}
export interface ICreateArtistDto {
  name: string;
  grammy: boolean;
}

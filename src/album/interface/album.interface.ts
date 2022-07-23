export interface IAlbum extends ICreateAlbumDto {
  id: string; // uuid v4
}
export interface ICreateAlbumDto {
  name: string;
  year: number;
  artistId: string; // refers to Artist
}

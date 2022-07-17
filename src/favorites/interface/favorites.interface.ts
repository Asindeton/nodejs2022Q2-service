import { IArtist } from '../../artist/interface/artist.interface';
import { IAlbum } from '../../album/interface/album.interface';
import { ITrack } from '../../track/interface/track.interface';

export interface IFavoritesRepsonse {
  artists: IArtist[];
  albums: IAlbum[];
  tracks: ITrack[];
}

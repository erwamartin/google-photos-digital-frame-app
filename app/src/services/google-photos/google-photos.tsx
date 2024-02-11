const Photos = require('googlephotos-api');
import GoogleSignIn from '../google-login';

const maxAlbumsPerQuery = 50;

class GooglePhotos {
  _googlePhotosApi: any = null;
  _accessToken: string = '';
  _currentToken: string = '';
  _albums: any[] = [];

  init = async (accessToken: string) => {
    this._accessToken = accessToken;
    this.googlePhotosApi();
  }

  googlePhotosApi() {
    if (!this._googlePhotosApi) {
      this._googlePhotosApi = new Photos(this._accessToken);
    }
    return this._googlePhotosApi;
  }

  async verifyLogin() {
    await GoogleSignIn.getCurrentUserInfo();
  }

  async getAllAlbums(length: number = 10, startFromToken: boolean = false) {
    await this.verifyLogin();

    try {
      const googlePhotosApi = this.googlePhotosApi();
      if (!googlePhotosApi) {
        console.error('Error in GooglePhotos.getAlbums: googlePhotosApi is null');
        return [];
      }

      if (!startFromToken) {
        this._albums = [];
        this._currentToken = '';
      }
      
      const queryAlbums = [];
      while (queryAlbums.length < length) {
        let nextPageToken = startFromToken || queryAlbums.length > 0 ? this._currentToken : '';

        const response = await googlePhotosApi.albums.list(length >= maxAlbumsPerQuery ? maxAlbumsPerQuery : length, nextPageToken) as any;
        const apiAlbums = response?.data?.albums;
        if (!apiAlbums) {
          console.error('Error in GooglePhotos.getAlbums: cannot find albums', response);
          return [];
        }

        if (apiAlbums.length === 0) {
          break;
        }

        // Prevent duplicates
        for (const apiAlbum of apiAlbums) {
          if (!this._albums.find((album) => album.id === apiAlbum.id) && apiAlbum?.title?.length > 0) {
            queryAlbums.push(apiAlbum);
            this._albums.push(apiAlbum);
          }
        }
        this._currentToken = response?.data?.nextPageToken;
      }

      return this._albums;
    } catch (error) {
      console.error('Error in GooglePhotos.getAlbums: ', error);
      throw error;
    }
  }

  async getAlbum(id: string) {
    await this.verifyLogin();

    try {
      if (!this._googlePhotosApi) {
        console.error('Error in GooglePhotos.getAlbum: googlePhotosApi is null');
        return null;
      }

      const response = await this._googlePhotosApi.albums.get(id) as any;
      const apiAlbum = response?.data;
      if (!apiAlbum) {
        console.error('Error in GooglePhotos.getAlbum: cannot find album', response);
        return null;
      }

      return apiAlbum;
    } catch (error) {
      console.error('Error in GooglePhotos.getAlbum: ', error);
      throw error;
    }
  }

  async getAlbums(albums: string[]) {
    await this.verifyLogin();

    try {
      if (!this._googlePhotosApi) {
        console.error('Error in GooglePhotos.getAlbums: googlePhotosApi is null');
        return [];
      }

      const apiAlbums = [];
      for (const albumId of albums) {
        const album = await this.getAlbum(albumId);
        if (album) {
          apiAlbums.push(album);
        }
      }

      return apiAlbums;
    } catch (error) {
      console.error('Error in GooglePhotos.getAlbums: ', error);
      throw error;
    }
  }

  async getAlbumPhotos(id: string, length: number = 10, startFromToken: boolean = false) {
    await this.verifyLogin();

    try {
      const googlePhotosApi = this.googlePhotosApi();
      if (!googlePhotosApi) {
        console.error('Error in GooglePhotos.getAlbums: googlePhotosApi is null');
        return [];
      }

      const apiPhotos: any[] = [];
      let nextPageToken = startFromToken ? this._currentToken : '';
      while (apiPhotos.length < length) {
        const response = await googlePhotosApi.mediaItems.search(
          id,
          length >= maxAlbumsPerQuery ? maxAlbumsPerQuery : length,
          nextPageToken
        ) as any;
        const apiPhotosResponse = response?.data?.mediaItems;
        if (!apiPhotosResponse) {
          console.error('Error in GooglePhotos.getAlbumPhotos: cannot find photos', response);
          return [];
        }

        if (apiPhotosResponse.length === 0) {
          break;
        }

        // Prevent duplicates
        for (const apiPhoto of apiPhotosResponse) {
          if (!apiPhotos.find((photo) => photo.id === apiPhoto.id)) {
            apiPhotos.push(apiPhoto);
          }
        }
        nextPageToken = response?.data?.nextPageToken;
      }

      return apiPhotos;
    } catch (error) {
      console.error('Error in GooglePhotos.getAlbumPhotos: ', error);
      throw error;
    }
  }

  async getAlbumPhotosByIds(ids: string[] = []) {
    await this.verifyLogin();
    
    try {
      const apiPhotos = [];
      for (const id of ids) {
        if (!id) {
          continue;
        }
        const photos = await this.getAlbumPhotos(id, 10);
        apiPhotos.push(...photos);
      }
      return apiPhotos;
    } catch (error) {
      console.error('Error in GooglePhotos.getAlbumPhotosByIds: ', error);
      throw error;
    }
  }

  getPhotoUrl = (url: string, width: number, height: number) => {
    return url + '?=w' + width * 4 + '-h' + height * 4;
  }

}

const GooglePhotosInstance = new GooglePhotos();

export default GooglePhotosInstance;
const Photos = require('googlephotos-api');

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

  async getAlbums(length: number = 10, startFromToken: boolean = false) {
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
            console.log('Adding album: ', apiAlbum);
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

  async getAlbumPhotos(id: string, length: number = 10, startFromToken: boolean = false) {
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
            console.log('Adding photo: ', apiPhoto);
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

  getPhotoUrl = (url: string, width: number, height: number) => {
    return url + '?=w' + width * 4 + '-h' + height * 4;
  }

}

const GooglePhotosInstance = new GooglePhotos();

export default GooglePhotosInstance;
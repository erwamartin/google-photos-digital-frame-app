const Photos = require('googlephotos-api');

const maxAlbumsPerQuery = 50;

class GooglePhotos {
  googlePhotosApi: any = null;
  currentToken: string = '';
  albums: any[] = [];

  init = async (accessToken: string) => {
    this.googlePhotosApi = new Photos(accessToken);
  }

  async getAlbums(length: number = 10, startFromToken: boolean = false) {
    try {
      if (!this.googlePhotosApi) {
        console.error('Error in GooglePhotos.getAlbums: googlePhotosApi is null');
        return [];
      }

      if (!startFromToken) {
        this.albums = [];
        this.currentToken = '';
      }
      
      const queryAlbums = [];
      while (queryAlbums.length < length) {
        let nextPageToken = startFromToken || queryAlbums.length > 0 ? this.currentToken : '';

        const response = await this.googlePhotosApi.albums.list(length >= maxAlbumsPerQuery ? maxAlbumsPerQuery : length, nextPageToken) as any;
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
          if (!this.albums.find((album) => album.id === apiAlbum.id) && apiAlbum?.title?.length > 0) {
            console.log('Adding album: ', apiAlbum);
            queryAlbums.push(apiAlbum);
            this.albums.push(apiAlbum);
          }
        }
        this.currentToken = response?.data?.nextPageToken;
      }

      return this.albums;
    } catch (error) {
      console.error('Error in GooglePhotos.getAlbums: ', error);
      throw error;
    }
  }

}

const GooglePhotosInstance = new GooglePhotos();

export default GooglePhotosInstance;
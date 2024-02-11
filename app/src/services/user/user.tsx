

import MemoryStorage from '@services/memory-storage';

class User {
  async getAlbums() : Promise<string[]> {
    return await MemoryStorage.get('selectedAlbums') as string[];
  }

  async setAlbums(albums: string[]) {
    await MemoryStorage.set('selectedAlbums', albums);
  }

  async hasSelectedAlbums() : Promise<boolean> {
    const albums = await this.getAlbums();
    return albums && albums.length > 0;
  }
}

const UserInstance = new User();

export default UserInstance;
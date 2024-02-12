

import MemoryStorage from '@services/memory-storage';
import GoogleLogin, { UserInfo } from '@services/google-login';

class User {

  // Core user functionalities

  async getUser(): Promise<UserInfo | null> {
    return await GoogleLogin.getCurrentUserInfo();
  }

  async signOut() {
    await GoogleLogin.signOut();
  }

  // User's albums

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
import AsyncStorage from '@react-native-async-storage/async-storage';

class Storage {
  async get(key: string) {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value === null) {
        return null;
      }
      return JSON.parse(value);
    } catch (error) {
      console.error('Error in Storage.get: ', error);
      return null;
    }
  }

  async set(key: string, value: any) {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (error) {
      console.error('Error in Storage.set: ', error);
    }
  }

  async remove(key: string) {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error('Error in Storage.remove: ', error);
    }
  }
}

const StorageInstance = new Storage();

export default StorageInstance;
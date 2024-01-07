import config from 'react-native-config';

import { 
  GoogleSignin,
  GoogleSigninButton,
  statusCodes
} from '@react-native-google-signin/google-signin';

class GoogleLogin {
  userInfo: any = null;
  _onLoginCallback: Function | null = null;

  async init(scopes: string[] = []) {
    GoogleSignin.configure({
      iosClientId: config.GOOGLE_IOS_CLIENT_ID,
      scopes: ['profile', 'email', ...scopes],
    });

    await this.getCurrentUserInfo();
    if (this.isSignedIn()) {
      this._onLoginCallback?.call(this);
    }
  }

  onLogin(callback: Function) {
    this._onLoginCallback = callback;
  }

  isSignedIn() {
    try {
      return GoogleSignin.isSignedIn();
    } catch (error) {
      console.error('Error in GoogleLogin.isSignedIn: ', error);
      return false;
    }
  }

  async getCurrentUserInfo() {
    try {
      const userInfo = await GoogleSignin.signInSilently();
      this.userInfo = userInfo;
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_REQUIRED) {
        // user has not signed in yet
      } else {
        console.error('Error in GoogleLogin.getCurrentUserInfo: ', error);
      }
    }
  };

  async signIn() {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      this.userInfo = userInfo;
      
      this._onLoginCallback?.call(this);
    } catch (error) {
      console.error('Error in GoogleLogin.signIn: ', error);
      throw error;
    }
  }

  async getTokens() {
    try {
      const tokens = await GoogleSignin.getTokens();
      return tokens;
    } catch (error) {
      console.error('Error in GoogleLogin.getTokens: ', error);
      throw error;
    }
  }
}

const GoogleLoginInstance = new GoogleLogin();

export default GoogleLoginInstance;
export { GoogleSigninButton };
import { firebase } from '../../services/firebase';
export interface IUser {
  email?: string | null;
  uid?: string | null;
  name?: string | null;
}

export interface IContext extends IUser{
  fullUserInfo: firebase.auth.UserCredential | null | undefined;
  signInWithEmail: (email: string, password: string) => Promise<void | unknown>;
  logout: () => void;
}

export interface IAuthProvider {
  children: JSX.Element;
}
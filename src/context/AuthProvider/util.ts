import { IUser } from "./types";
import { firebase } from '../../services/firebase';

export function setUserLocalStorage (user: IUser | null) { // Saves the state of user in the browser.
  localStorage.setItem('u', JSON.stringify(user));
}
export function setFullUserLocalStorage (user: firebase.auth.UserCredential | null) { // Saves the state of user in the browser.
  localStorage.setItem('full_u', JSON.stringify(user));
}

export function getUserLocalStorage () { // Return the user logged if is exists ou null if not.
  const json = localStorage.getItem('u');

  if(!json) {
    return null;
  }

  const user = JSON.parse(json);

  return user ?? null;
}

export function getFullUserLocalStorage () { // Return the user logged if is exists ou null if not.
  const json = localStorage.getItem('full_u');

  if(!json) {
    return null;
  }

  const user = JSON.parse(json);

  return user ?? null;
}
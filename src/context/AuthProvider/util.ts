import { Api } from "../../services/api";
import { IUser } from "./types";

export function setUserLocalStorage (user: IUser | null) { // Saves the state of user in the browser.
  localStorage.setItem('u', JSON.stringify(user));
}

export function getUserLocalStorage () { // Return the user logged if is exists ou null if not.
  const json = localStorage.getItem('u');

  if(!json) {
    return null;
  }

  const user = JSON.parse(json);

  return user ?? null;
}

export async function LoginRequest ( email: string, password: string) { // The function that in fact makes the login. This function can be called in multiple files.
  try {
    const request = await Api.post('login', { email, password });
    return request.data;
  } catch (error) {
    return null;
  }
}
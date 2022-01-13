import React, { createContext, useEffect, useState } from 'react';
import { IAuthProvider, IContext, IUser } from './types';
import { getUserLocalStorage, LoginRequest, setUserLocalStorage } from './util';

import { firebase, auth } from '../../services/firebase';

export const AuthContext = createContext<IContext>( {} as IContext ); // Create the Authentication Context

export const AuthProvider = ({ children }: IAuthProvider) => {

  const [ user, setUser ] = useState<IUser | null>(); // Create the state used to store the logged user info

  useEffect(() => {
    const user = getUserLocalStorage()

    if(user) {
      setUser(user);
    }
  }, [])

  // The AuthContext expects 2 functions (as estipulated in types.ts)

  async function authenticate (email: string, password: string){ // Login function
    const response = await LoginRequest(email, password); // Get the response from the api that have been contacted by LoginRequest
    const payload = { token: response.token, email: response.email }; // Save the res content

    setUser(payload); // Save the state of the new logged user
    setUserLocalStorage(payload) // Save the state of the user
  }

  async function logout (){ // Logout function
    setUser(null); // Reset the user state
    setUserLocalStorage(null); // Reset the local storage
  }

  async function signInWithGoogle(email: string, password: string) {
    auth.signInWithEmailAndPassword(email, password).then(user => {
      console.log(user)
		})
  }
  

  return (
    // Here ew export the Authentication Context (AuthContext) passing 3 values: the state (user) and the 2 functions that was expected
    <AuthContext.Provider value={{ ...user, authenticate, signInWithGoogle, logout}}> 
      { children }
    </AuthContext.Provider>
  )
}
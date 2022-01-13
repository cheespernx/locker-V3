import React, { createContext, useEffect, useState } from 'react';
import { IAuthProvider, IContext, IUser } from './types';
import { getUserLocalStorage, setUserLocalStorage } from './util';

import { auth, firebase } from '../../services/firebase';

export const AuthContext = createContext<IContext>( {} as IContext ); // Create the Authentication Context

export const AuthProvider = ({ children }: IAuthProvider) => {

  const [ user, setUser ] = useState<IUser | null>(); // Create the state used to store the logged user info
  const [ fullUserInfo, setFullUserInfo ] = useState<firebase.auth.UserCredential | null>(); // Create the state used to store the

  useEffect(() => {
    const user = getUserLocalStorage()

    if(user) {
      setUser(user);
    }
  }, [])

  // The AuthContext expects 2 functions (as estipulated in types.ts)
  async function logout (){ // Logout function
    setUser(null); // Reset the user state
    setUserLocalStorage(null); // Reset the local storage
    setFullUserInfo(null); // Reset the full user information
  }

  async function signInWithEmail(email: string, password: string) {
    await auth.signInWithEmailAndPassword(email, password)
      .then(userCredentials => {

        const user = userCredentials.user;
        const userInfo = { email: user?.email, uid: user?.uid, name: user?.displayName };
        
        setUser(userInfo); // Save the state of the new logged user
        setUserLocalStorage(userInfo) // Save the state of the user
        setFullUserInfo(userCredentials); // Save the complete information of user
        
      }).catch(error => {
        throw new Error(error.code);
      })
  }
  

  return (
    // Here we export the Authentication Context (AuthContext) passing 3 values: the state (user) and the 3 functions that was expected
    <AuthContext.Provider value={{ ...user, fullUserInfo, signInWithEmail, logout}}> 
      { children }
    </AuthContext.Provider>
  )
}
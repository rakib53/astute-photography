import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import React, { createContext, useEffect, useState } from "react";
import app from "../firebase/firebase.init";

export const Context = createContext();
const authentication = getAuth(app);

const CreateContext = ({ children }) => {
  const [user, setUser] = useState();
  const [loader, setLoader] = useState(true);
  const [expandMenu, setExpandMenu] = useState(false);

  const googleAuthProvider = new GoogleAuthProvider();

  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(authentication, email, password);
  };

  const addedUserName = (userName) => {
    return updateProfile(authentication.currentUser, {
      displayName: userName,
    });
  };

  const LoginWithGoogle = () => {
    setLoader(true);
    return signInWithPopup(authentication, googleAuthProvider);
  };

  const logInUser = (email, password) => {
    setLoader(true);
    return signInWithEmailAndPassword(authentication, email, password);
  };

  const signOutUser = () => {
    return signOut(authentication);
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(authentication, (currentUser) => {
      setUser(currentUser);
      setLoader(false);
    });

    return () => unSubscribe();
  }, []);

  return (
    <Context.Provider
      value={{
        user,
        loader,
        expandMenu,
        setExpandMenu,
        createUser,
        addedUserName,
        logInUser,
        signOutUser,
        LoginWithGoogle,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default CreateContext;

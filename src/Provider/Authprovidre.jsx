import { createContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";

import axios from "axios";
import app from "../Firebase/Firebase";
import useAxiosCommon from "../Hooks/useAxiosCommon";

export const AuthContext = createContext(null);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const axiosCommon = useAxiosCommon()
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const resetPassword = (email) => {
    setLoading(true);
    return sendPasswordResetEmail(auth, email);
  };

  const logOut = async () => {
    setLoading(true);
    return signOut(auth);
  };

  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  const saveUser = async (curUser) => {
    const currentUser = {
      name: curUser?.displayName,
      email: curUser?.email,
      role: "user",
      status: "Verified",
    };

    const { data: userData } = await axios.post(
      `${import.meta.env.VITE_API_URL}/user`,
      currentUser
    );
    console.log(userData)
    // return userData;
  };


  // onAuthStateChange
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      // console.log(currentUser)
      if (currentUser) {
        saveUser(currentUser);
        setLoading(false);
        setUser(currentUser)

        // Prepare userInfo payload
        const userInfo = { email: currentUser.email };

        // Make a POST request to the server to get the JWT
        axiosCommon.post("/jwt", userInfo)
          .then(res => {
            if (res.data.token) {
              localStorage.setItem("access_token", res.data.token);
            }
          })
      } else {
        localStorage.removeItem("access_token")
      }
    });
    return () => {
      return unsubscribe();
    };
  }, [axiosCommon]);

  const authInfo = {
    user,
    loading,
    setLoading,
    createUser,
    signIn,
    signInWithGoogle,
    resetPassword,
    logOut,
    updateUserProfile,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

// AuthProvider.propTypes = {
//   // Array of children.
//   children: PropTypes.object,
// };

export default AuthProvider;

import { useState, useEffect } from "react";
import firebase, { User } from "service/firebase";

const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleUser = (user: User | null) => {
    if (user) {
      setUser(user);
    } else {
      setUser(null);
    }
    setIsLoading(false);
  };

  const signIn = () => {
    firebase
      .auth()
      .signInWithPopup(new firebase.auth.GithubAuthProvider())
      .then((res) => handleUser(res.user))
      .catch((error) => console.log(error));
  };

  const signOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => handleUser(null));
  };

  useEffect(() => {
    const unsubscribe = firebase.auth().onIdTokenChanged(handleUser);
    return () => unsubscribe();
  }, []);

  return { user, isLoading, signIn, signOut };
};

export default useAuth;

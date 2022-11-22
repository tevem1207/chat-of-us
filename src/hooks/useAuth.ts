import { useState, useEffect } from "react";
import firebase from "service/firebase";

export const useAuth = () => {
  const [user, setUser] = useState<firebase.User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleUser = (user: firebase.User | null) => {
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

// const useAuth = () => {
//   const [name, setName] = useState();

//   const getProvider = (providerName: string) => {
//     switch (providerName) {
//       case "Google":
//         return googleProvider;
//       case "Github":
//         return githubProvider;
//       default:
//         throw new Error(`${providerName} is unknown provider.`);
//     }
//   };

//   const login = useCallback((providerName: string) => {
//     const provider = getProvider(providerName);
//     return firebaseAuth.signInWithPopup(provider);
//   }, []);

//   const logout = useCallback(() => firebaseAuth.signOut(), []);

//   const onAuthChange = (callback: (user: firebase.User | null) => void) => {
//     firebaseAuth.onAuthStateChanged((user) => {
//       callback(user);
//     });
//   };

//   return login;
// };

export default useAuth;

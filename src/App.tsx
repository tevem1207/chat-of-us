import React from "react";
import "App.scss";
import useAuth from "hooks/useAuth";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function App() {
  const { user, signIn, signOut } = useAuth();

  return (
    <div className="App">
      {user && user.displayName}
      <li>
        <button onClick={signIn}>로긴</button>
      </li>
      <li>
        <button onClick={signOut}>로가웃</button>
      </li>
    </div>
  );
}

export default App;

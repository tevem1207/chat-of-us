import React from "react";
import "App.scss";
import useAuth from "hooks/useAuth";
import Auth from "components/Auth/Auth";
import Chat from "components/Chat/Chat";

function App() {
  const { user, signIn, signOut } = useAuth();

  return (
    <div className="App">
      <Auth user={user} signIn={signIn} signOut={signOut} />
      {user && <Chat user={user} />}
    </div>
  );
}

export default App;

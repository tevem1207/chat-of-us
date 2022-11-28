import { BrowserRouter } from "react-router-dom";
import "App.scss";
import "./components/Chat/chat.scss";
import useAuth from "hooks/useAuth";
import Auth from "components/Auth/Auth";
import Chat from "components/Chat/Chat";

function App() {
  const { user, signIn, signOut, changeName } = useAuth();

  return (
    <BrowserRouter>
      <div className="App">
        <Auth
          user={user}
          signIn={signIn}
          signOut={signOut}
          changeName={changeName}
        />
        {user && <Chat user={user} />}
      </div>
    </BrowserRouter>
  );
}

export default App;

import { BrowserRouter } from "react-router-dom";
import "App.scss";
import "./components/Chat/chat.scss";
import useAuth from "hooks/useAuth";
import useCloudMessage from "hooks/useCloudMessage";
import Auth from "components/Auth/Auth";
import Chat from "components/Chat/Chat";

function App() {
  const { user, signIn, signOut, changeName } = useAuth();
  const { sendCloudMessage } = useCloudMessage(user);

  return (
    <BrowserRouter>
      <div className="App">
        <Auth
          user={user}
          signIn={signIn}
          signOut={signOut}
          changeName={changeName}
        />
        {user && <Chat user={user} sendCloudMessage={sendCloudMessage} />}
      </div>
    </BrowserRouter>
  );
}

export default App;

import { useState } from "react";
import { User } from "service/firebase";

interface AuthProps {
  user: User | null;
  signIn: () => void;
  signOut: () => void;
  changeName: (newName: string) => void;
}

function Auth({ user, signIn, signOut, changeName }: AuthProps) {
  const [newName, setNewName] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const onMenuHandler = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <div className="auth">
        <div className="header">
          <div className="chatroom-title">채팅방</div>
          <div className="menu-icon">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Hamburger_icon.svg/330px-Hamburger_icon.svg.png"
              alt="hamburger-icon"
              onClick={onMenuHandler}
            />
          </div>
        </div>
      </div>
      <div
        className={menuOpen ? "side-menu open" : "side-menu close"}
        onClick={onMenuHandler}
      >
        <div className="menu-inner">
          <div>지금 나는... "{user && user.displayName}"</div>
          {user ? (
            <>
              <input
                type="text"
                value={newName}
                onChange={(event) => {
                  setNewName(event.target.value);
                }}
              />
              <button onClick={() => changeName(newName)}>닉넴 바꾸기</button>
              <button onClick={signOut}>로가웃</button>
            </>
          ) : (
            <button onClick={signIn}>로긴</button>
          )}
        </div>
      </div>
    </>
  );
}

export default Auth;

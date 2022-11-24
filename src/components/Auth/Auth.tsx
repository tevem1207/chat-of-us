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

  return (
    <div>
      <div>{user && user.displayName}</div>
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
  );
}

export default Auth;

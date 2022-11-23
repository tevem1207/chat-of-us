import React from "react";
import { User } from "service/firebase";

interface AuthProps {
  user: User | null;
  signIn: () => void;
  signOut: () => void;
}

function Auth({ user, signIn, signOut }: AuthProps) {
  return (
    <div>
      <div>{user && user.displayName}</div>
      {user ? (
        <button onClick={signOut}>로가웃</button>
      ) : (
        <button onClick={signIn}>로긴</button>
      )}
    </div>
  );
}

export default Auth;

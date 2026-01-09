import { AuthContext } from "./AuthContext";
import { useState } from "react";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuth, setIsAuth] = useState(false);

  return (
    <AuthContext.Provider
      value={{ user, setUser, isAuth, setIsAuth }}
    >
      {children}
    </AuthContext.Provider>
  );
};

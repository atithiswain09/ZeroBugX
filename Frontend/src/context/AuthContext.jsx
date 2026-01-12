import { AuthContext } from "./AuthContext";
import { useState } from "react";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuth, setIsAuth] = useState(false);
  const [appLoaded, setappLoaded] = useState(false);
  return (
    <AuthContext.Provider
      value={{ user, setUser, isAuth, setIsAuth,appLoaded,setappLoaded }}
    >
      {children}
    </AuthContext.Provider>
  );
};

import { createContext, useState, useCallback, useMemo } from "react";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuth, setIsAuth] = useState(false);
  const [appLoaded, setAppLoaded] = useState(false);

  const login = useCallback(
    (userData) => {
      setUser(userData);
      setIsAuth(true);
    },
    [setUser, setIsAuth]
  );

  const logout = useCallback(() => {
    setUser(null);
    setIsAuth(false);
  }, [setUser, setIsAuth]);

  const value = useMemo(
    () => ({
      user,
      setUser,
      isAuth,
      setIsAuth,
      appLoaded,
      setAppLoaded,
      login,
      logout,
    }),
    [user, isAuth, appLoaded, login, logout, setUser, setIsAuth, setAppLoaded]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

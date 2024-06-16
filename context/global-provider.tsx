import React, { PropsWithChildren, createContext, useContext, useEffect, useState } from "react";

import { CurrentUser, getCurrentUser } from "../lib/appwrite";

interface GlobalContextValue {
  isLogged: boolean;
  user: CurrentUser | null;
  isLoading: boolean;
  setIsLogged: (value: boolean) => void;
  setUser: (value: CurrentUser) => void;
}

const GlobalContext = createContext({} as GlobalContextValue);
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }: PropsWithChildren) => {
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState<CurrentUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      setIsLoading(true);
      try {
        const res = await getCurrentUser();
        if (res) {
          setIsLogged(true);
          setUser(res);
        } else {
          setIsLogged(false);
          setUser(null);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    getUser();
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        isLogged,
        user,
        isLoading,
        setIsLogged,
        setUser,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
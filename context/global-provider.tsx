import React, { PropsWithChildren, createContext, useContext, useEffect, useState } from "react";

import { CurrentUser, getCurrentUser } from "../lib/appwrite";

interface GlobalContextValue {
  user: CurrentUser | null;
  isLoading: boolean;
  setUser: (value: CurrentUser | null) => void;
}

const GlobalContext = createContext({} as GlobalContextValue);
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<CurrentUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      setIsLoading(true);
      try {
        const res = await getCurrentUser();
        if (res) {
          setUser(res);
        } else {
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
        user,
        isLoading,
        setUser,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
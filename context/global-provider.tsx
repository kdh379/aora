import React, { PropsWithChildren, createContext, useContext, useEffect, useState } from "react";

import { User, getCurrentUser } from "../lib/appwrite";

interface GlobalContextValue {
  user: User | null;
  isLoading: boolean;
  setUser: (value: User | null) => void;
}

const GlobalContext = createContext({} as GlobalContextValue);
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User | null>(null);
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
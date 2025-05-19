import { createContext, useState, ReactNode, useContext } from 'react';

type User = {
  userName: string;
};

type ContextType = {
  user: User;
  setUser: (user: User) => void;
};

const UserContext = createContext<ContextType>({
  user: { userName: '' },
  setUser: () => {}, // Заглушка
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>({ userName: '' });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);


export const CostAndCategory = createContext<costAndCategory>({
  costAndCategory: [],
})

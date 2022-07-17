import { createContext, useContext, useEffect, useState } from 'react';
import { fetchUsers } from '../api/user.api';
import { User } from '../models/user.model';
import { useSessionContext } from './session.context';

export const UserContext = createContext({ } as { users: User[], setUsers: (users: User[]) => void });

export const useUserContext = () => useContext(UserContext);

export function UserProvider({ children }: { children: any }) {

  const sessionContext = useSessionContext();

  const [userState, setUserState] = useState<User[]>([]);

  const setUsers = (users: User[]): void => {
    setUserState(users);
  };

  const setupUsers = async () => {
    fetchUsers()
      .then((response) => response.data)
      .then((data) => setUsers(data))
      .catch((error: any) => console.error(error.response.data));
  };

  useEffect(() => {
    if (sessionContext.isLoggedIn) {
      setupUsers();
    } else {
      setUsers([]);
    }
  }, [sessionContext.isLoggedIn]);

  return (
    <UserContext.Provider value={{ users: userState, setUsers }}>
      {children}
    </UserContext.Provider>
  );
};

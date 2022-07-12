import { createContext } from 'react';

export const sessionContext = createContext({ user: {}, isLoggedIn: false });


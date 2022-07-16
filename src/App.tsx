import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RequireAuth from './components/auth/RequireAuth';
import Dashboard from './components/Dashboard';
import LoginForm from './components/LoginForm';
import Navbar from './components/Navbar';
import { SessionContext, SessionUser, useSessionContext, SessionContextUser } from './context/session.context';

const App: React.FC = () => {

  const sessionContext = useSessionContext();

  const [userState, setUserState] = useState<SessionContextUser>({
    isLoggedIn: sessionContext.isLoggedIn,
    user: sessionContext.user,
  });

  const setUser = (isLoggedIn: boolean, data: SessionUser): void => {
    setUserState({
      isLoggedIn,
      user: {
        '_id': data._id,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        role: data.role,
        workouts: data.workouts,
      } as SessionUser,
    });
  };

  return (
    <Router>
      <SessionContext.Provider value={{ ...userState, setUser }}>
        <Navbar />
        <Routes>
          {/* Public Routes */}
          <Route path='/login' element={<LoginForm />} />

          {/* Private Routes */}
          <Route element={<RequireAuth isLoggedIn={userState.isLoggedIn} />}>
            <Route path='/' element={<Dashboard />} />
            <Route path='*' element={<p>Yooooooo</p>} />
          </Route>
        </Routes>
      </SessionContext.Provider>
    </Router>
  );
}

export default App;

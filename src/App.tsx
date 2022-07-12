import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RequireAuth from './components/auth/RequireAuth';
import LoginForm from './components/LoginForm';
import Navbar from './components/Navbar';
import { sessionContext } from './context/session.context';

const App: React.FC = () => {

  const [userState, setUserState] = useState({ user: {}, isLoggedIn: false });

  return (
    <Router>
      <sessionContext.Provider value={ userState }>
        <Navbar />
        <Routes>
          <Route path='/login' element={<LoginForm />} />

          <Route element={<RequireAuth isLoggedIn={userState.isLoggedIn} />}>
            <Route path='/' element={<p>Hello World</p>} />
          </Route>
        </Routes>
      </sessionContext.Provider>
    </Router>
  );
}

export default App;

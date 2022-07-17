import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RequireAuth from './components/auth/RequireAuth';
import Dashboard from './components/Dashboard';
import LoginForm from './components/LoginForm';
import Navbar from './components/Navbar';
import UserDashboard from './components/user/UserDashboard';
import { ExerciseProvider } from './context/exercise.context';
import { SessionProvider } from './context/session.context';
import { UserProvider } from './context/user.context';

const App: React.FC = () => {
  return (
    <Router>
      <SessionProvider>
        <UserProvider>
          <ExerciseProvider>
            <Navbar />
            <Routes>
              {/* Public Routes */}
              <Route path='/login' element={<LoginForm />} />

              {/* Private Routes */}
              <Route element={<RequireAuth />}>
                <Route path='/' element={<Dashboard />} />
                <Route path='/users' element={<UserDashboard />} />
                <Route path='*' element={<p>Yooooooo</p>} />
              </Route>
            </Routes>
          </ExerciseProvider>
        </UserProvider>
      </SessionProvider>
    </Router>
  );
}

export default App;

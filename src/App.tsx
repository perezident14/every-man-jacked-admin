import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RequireAuth from './components/auth/RequireAuth';
import Dashboard from './components/Dashboard';
import ExerciseDashboard from './components/exercise/ExerciseDashboard';
import ExerciseEditor from './components/exercise/ExerciseEditor';
import ExerciseFormCreate from './components/exercise/ExerciseFormCreate';
import FeedbackAlert from './components/FeedbackAlert';
import LoginForm from './components/LoginForm';
import Navbar from './components/Navbar';
import UserDashboard from './components/user/UserDashboard';
import UserEditor from './components/user/UserEditor';
import UserFormCreate from './components/user/UserFormCreate';
import { ExerciseProvider } from './context/exercise.context';
import { FeedbackProvider } from './context/feedback.context';
import { SessionProvider } from './context/session.context';
import { UserProvider } from './context/user.context';

const App: React.FC = () => {
  return (
    <Router>
      <SessionProvider>
        <UserProvider>
          <ExerciseProvider>
            <FeedbackProvider>
              <Navbar />
              <Routes>
                {/* Public Routes */}
                <Route path='/login' element={<LoginForm />} />

                {/* Private Routes */}
                <Route element={<RequireAuth />}>
                  <Route path='/' element={<Dashboard />} />
                  <Route path='/users' element={<UserDashboard />} />
                  <Route path='/users/new' element={<UserFormCreate />} />
                  <Route path='/users/:id' element={<UserEditor />} />
                  <Route path='/exercises' element={<ExerciseDashboard />} />
                  <Route path='/exercises/new' element={<ExerciseFormCreate />} />
                  <Route path='/exercises/:id' element={<ExerciseEditor />} />
                  <Route path='*' element={<p>Yooooooo</p>} />
                </Route>
              </Routes>
              <FeedbackAlert />
            </FeedbackProvider>
          </ExerciseProvider>
        </UserProvider>
      </SessionProvider>
    </Router>
  );
}

export default App;

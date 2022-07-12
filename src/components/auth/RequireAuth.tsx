import { Navigate, Outlet } from 'react-router-dom';

const RequireAuth = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  if (!isLoggedIn) {
    return <Navigate to='/login' />;
  }
  return <Outlet />;
}

export default RequireAuth;

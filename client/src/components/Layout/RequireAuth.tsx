import { Navigate, Outlet } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

const RequireAuth = () => {
  const { isAuthenticated } = useApp();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default RequireAuth;

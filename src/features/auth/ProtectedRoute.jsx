import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthContext';
import LoadingSpinner from '../../components/UI/LoadingSpinner';

const ProtectedRoute = ({ requiredRole = 'admin' }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner size="large" />;
  }

  if (!user || (requiredRole && user.role !== requiredRole)) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
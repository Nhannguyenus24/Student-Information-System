import { Navigate } from 'react-router-dom';
// hooks
import useAuth from '../hooks/useAuth';

// ----------------------------------------------------------------------

export default function GuestGuard({ children }) {
  const { isAuthenticated, user } = useAuth();

  if (isAuthenticated) {
    return <Navigate to={`/${user?.role}`} />;
  }

  return <>{children}</>;
}

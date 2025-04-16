import { useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
// hooks
import useAuth from '../hooks/useAuth';
// pages
import Login from '../pages/authentication/Login';
// components
import LoadingScreen from '../components/LoadingScreen';
import Page404 from '../pages/Page404';

// ----------------------------------------------------------------------


export default function AuthGuard({ children }) {
  const { isAuthenticated, isInitialized, user  } = useAuth();
  const { pathname } = useLocation();
  const [requestedLocation, setRequestedLocation] = useState(null);

//   if (!isInitialized) {
//     return <LoadingScreen />;
//   }
//   if (!isAuthenticated) {
//     if (pathname !== requestedLocation) {
//       setRequestedLocation(pathname);
//     }
//     return <Login />;
//   }

//   if (requestedLocation && pathname.includes(user?.role.toLowerCase())) {
//     setRequestedLocation(null);
//     return <Navigate to={requestedLocation} />;
//   }
//   else if (!pathname.includes(user?.role.toLowerCase())) {
//     return <Page404 />;
//   }

  return <>{children}</>;
}

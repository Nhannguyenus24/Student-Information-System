import { useContext } from 'react';
//
// import { AuthContext } from '../contexts/OutlookContext';
// import { AuthContext } from '../contexts/Auth0Context';
import { AuthContext } from '../contexts/JWTContext'; // this code for jwt
// import { AuthContext } from '../contexts/FirebaseContext';
// import { AuthContext } from '../contexts/AwsCognitoContext';

// ----------------------------------------------------------------------

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('Auth context must be use inside AuthProvider');
  return context;
};

export default useAuth;
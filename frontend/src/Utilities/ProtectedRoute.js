import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from 'context/Auth/index';

// middleware for the protected route
const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);

  return user ? children : <Navigate to="/" />;
};

export default ProtectedRoute;

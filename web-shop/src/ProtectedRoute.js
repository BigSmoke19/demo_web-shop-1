import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from './usercontext';

const ProtectedRoute = ({ children }) => {
  const [{useremail,setUserEmail},{isadmin,setIsAdmin}] = useContext(UserContext);

  if (!isadmin) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;

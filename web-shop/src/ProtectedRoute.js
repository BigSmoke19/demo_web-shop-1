import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    let isAdmin = false;
    if(localStorage.getItem('isadmin') === "1"){
        isAdmin = true;
    }  
  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;

// import React from 'react'
// import { Outlet } from 'react-router-dom'

// const PrivateROute = ({allowedRoled}) => {
//   return <Outlet/>
// }

// export default PrivateROute

import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/userContext";

const PrivateROute = ({ allowedRoled }) => {
  const { user, loading } = useContext(UserContext);

  if (loading) return null;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoled && !allowedRoled.includes(user.role)) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default PrivateROute;

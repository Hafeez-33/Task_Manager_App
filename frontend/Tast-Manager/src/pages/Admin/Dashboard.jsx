import React from 'react'
import useUserAuth from '../../hooks/useUserAuth';
import { useContext } from 'react';
import { UserContext } from '../../context/userContext';
import DashboardLayout from '../../components/inputs/DashboardLayout';

const Dashboard = () => {
  useUserAuth();

  const {user} = useContext(UserContext)
  return (
    <DashboardLayout>Dashboard</DashboardLayout>
  )
}

export default Dashboard
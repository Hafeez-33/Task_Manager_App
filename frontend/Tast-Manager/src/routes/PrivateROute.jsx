import React from 'react'
import { Outlet } from 'react-router-dom'

const PrivateROute = ({allowedRoled}) => {
  return <Outlet/>
}

export default PrivateROute
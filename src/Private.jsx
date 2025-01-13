import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

const Private = () => {
    let isUserLogin = localStorage.getItem('username');

  return <>{isUserLogin ? <Outlet /> : <Navigate to={'/login'} />}</>
}

export default Private
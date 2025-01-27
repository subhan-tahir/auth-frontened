import React from 'react'
import { Navigate, Outlet, useNavigate } from 'react-router-dom';

const Private = () => {
  let navigate = useNavigate();
    let tokenInJson = localStorage.getItem('token');
    if(tokenInJson){
      const {token , exptime} = JSON.parse(tokenInJson);
      console.log('exptime---',token, exptime);
      //currentTime represents the current time in milliseconds.
      const currentTime = new Date().getTime();  // Current time in milliseconds

      if (currentTime > exptime) {
          localStorage.removeItem('token');
          navigate('/login');
        console.log('Token has expired');
      } else {
        console.log('Token is still valid');
      }
    }

  return <>{tokenInJson ? <Outlet /> : <Navigate to={'/login'} />}</>
}

export default Private


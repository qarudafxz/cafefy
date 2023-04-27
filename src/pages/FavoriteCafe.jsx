import React, { useState, useEffect } from 'react'
import { SESSION_TOKEN } from '../helpers/sessionToken.js';
import LoggedInNavbar from '../components/LoggedInNavbar';

function FavoriteCafe() {
  const session_token = SESSION_TOKEN;

  useEffect(() => {
    if(!session_token)
      window.location.href = "/auth/login";
  },[])
  
  return (
    <div>
      <LoggedInNavbar />
    </div>
  )
}

export default FavoriteCafe
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import LoggedInNavbar from '../components/LoggedInNavbar'
import StarRating from '../components/StarRating'
import { getUserId } from '../helpers/getUserId.js';
import { buildUrl } from '../utils/buildUrl.js';
import { SESSION_TOKEN } from '../private/sessionToken';

function Rate() {
  const { id: cafeID } = useParams();
  const [ rating, setRating ] = useState(0);
  const [ comment, setComment ] = useState('');
  const session_token = SESSION_TOKEN;
  const userID = getUserId();

  const handleRating = async () => {
    try {
      await fetch(buildUrl(`/cafes/rate/${cafeID}`), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId: userID,
          rate: rating,
          comment
        })
      })
    } catch(err) {
      console.log(err);
    }
  }

  useEffect(() => {
    if(!session_token) 
      window.location.href = '/auth/login';
  }, [])

  return (
    <div className="font-primary">
     <LoggedInNavbar />
     <div className="xxxsm: flex flex-col gap-4 bg-white rounded-lg mx-xxxsm">
       <div className="">
          <h1 className="flex flex-row gap-2">Rate this cafe</h1>
       </div>
     </div>
    </div>
  )
}

export default Rate
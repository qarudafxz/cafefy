import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import LoggedInNavbar from '../components/LoggedInNavbar'
import StarRating from '../components/StarRating'
import { getUserId } from '../helpers/getUserId.js';
import { buildUrl } from '../utils/buildUrl.js';
import { SESSION_TOKEN } from '../private/sessionToken';
import { HiOutlinePencilAlt } from 'react-icons/hi';
import Footer from '../components/Footer';

function Rate() {
  const navigate = useNavigate();
  const { id: cafeID } = useParams();
  const [ rating, setRating ] = useState(0);
  const [ comment, setComment ] = useState('');
  const [ cafeDeets, setCafeDeets ] = useState({});
  const session_token = SESSION_TOKEN;
  const userID = getUserId();

  const getCafeDetails = async () => {
    try {
      const response = await fetch(buildUrl(`/cafes/cafe/${cafeID}`))
      const details = await response.json();
      setCafeDeets(details);
    } catch(err) {
      console.log(err);
    }
  }

  const handleRating = async (e) => {
    e.preventDefault();
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

      navigate(`/cafe/${cafeDeets.name}/${cafeID}`);
    } catch(err) {
      console.log(err);
    }
  }

  useEffect(() => {
    if(!session_token) 
      window.location.href = '/auth/login';

    getCafeDetails();
  }, [])

  return (
    <div className="font-primary">
     <LoggedInNavbar />
     <div className="xxxsm: flex flex-col gap-4 bg-white rounded-lg mx-xxxsm p-4">
       <div className="xxxsm: flex flex-row gap-2 items-center">
        <HiOutlinePencilAlt size={42} className="bg-brown rounded-md text-white pt-3 pl-2"/>
        <p className="xxxsm: w-4/12 leading-4">Cafe <span className="text-brown font-bold text-lg">Review</span></p>
       </div>
       <img src={cafeDeets.logo} alt={cafeDeets.cafeName} className="xxxsm: mt-4"/>
       <div className="xxxsm: flex flex-col mt-10">
        <form onSubmit={handleRating}>
          <p>Cafe</p>
          <h1 className="xxxsm: text-2xl font-bold my-2">{cafeDeets.name}</h1>
          <p className="xxxsm: my-2">Rate</p>
          <StarRating setRating={setRating} rating={rating}/>
          <p className="xxxsm: my-2">Review</p>
          <textarea className="outline rounded-md text-xs pl-2 py-2 w-full h-9/12 focus:border-none" onChange={(e) => setComment(e.target.value)}></textarea>
          <button className="bg-brown text-white font-bold xxxsm:w-full py-2 rounded-md mt-4">Submit</button>
        </form>
       </div>
     </div>
     <Footer />
    </div>
  )
}

export default Rate
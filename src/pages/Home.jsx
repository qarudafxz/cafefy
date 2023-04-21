import React, { useEffect } from 'react'
import Navbar from '../components/Navbar';
import Bg from '../assets/bg.svg';
import { getUserId } from '../helpers/getUserId.js';

import TopCafes from '../components/TopCafes';
import CafeStories from '../components/CafeStories';
import NewsLetter from '../components/NewsLetter';
import Footer from '../components/Footer';

const userID = getUserId();

const checkIfUserLoggedIn = () => { 
  if(userID) {
    window.location.href = '/cafes';
  } else {
    window.location.href = 'auth/login';
  }
}

// useEffect(() => {
//   checkIfUserLoggedIn();
// },[])

function Home() {
  return (
    <div>
      <div>
        <Navbar />
        <img src={Bg} className="absolute inset-0 h-max w-full object-cover" />
        {/* Hero Section */}
        <div className="xxxsm:mx-xxxsm flex flex-col gap-6">
          <h1 className="xxxsm: mt-6 relative font-primary text-4xl font-extrabold text-white">Let’s explore and start cafe hopping.</h1>
          <p className="xxxsm: relative font-primary text-sm text-white">Check out all the listed cafes we have from within <span className="font-bold">Butuan City</span>, Philippines</p>
          <button className="xxxsm:mt-4 relative font-primary text-md text-white font-bold bg-secondary py-2 rounded-md" onClick={checkIfUserLoggedIn}>Find Cafes</button>
        </div>
      </div>
      <div className="xxxsm: flex flex-col">
        <TopCafes />
        <div className="xxxsm: mt-32 flex flex-col gap-4">
          <CafeStories />
          <NewsLetter />
        </div>
        <Footer />
      </div>
    </div>
  )
}


export default Home
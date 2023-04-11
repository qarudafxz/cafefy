import React from 'react'
import Navbar from '../components/Navbar';
import Bg from '../assets/bg.svg';

import TopCafes from '../components/TopCafes';
function Home() {
  return (
    <div>
      <div>
        <Navbar />
        <img src={Bg} className="absolute inset-0 h-max w-full object-cover" />
        {/* Hero Section */}
        <div className="xxxsm:mx-xxxsm flex flex-col gap-6">
          <h1 className="xxxsm: mt-6 relative z-10 font-primary text-4xl font-extrabold text-white">Let’s explore and start cafe hopping.</h1>
          <p className="xxxsm: relative z-10 font-primary text-sm text-white">Check out all the listed cafes we have from within <span className="font-bold">Butuan City</span>, Philippines</p>
          <button className="xxxsm:mt-4 relative z-10 font-primary text-md text-white font-bold bg-secondary py-2 rounded-md">Find Cafes</button>
        </div>
      </div>
      <TopCafes />
    </div>
  )
}


export default Home
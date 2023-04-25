import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';

import TopLoadingBar from 'react-top-loading-bar';

import LoggedInNavbar from '../components/LoggedInNavbar';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import { SESSION_TOKEN } from '../private/sessionToken'

function About() {
  const [ progress, setProgress ] = useState(0);
  const location = useLocation();

  useEffect(() => {
    setProgress(30);

    setTimeout(() => {
      setProgress(100);
    }, 1200);
  }, [location])

  const session_token = SESSION_TOKEN;
  return (
    <div className="font-primary">
        <TopLoadingBar
          color='#8b2801'
          progress={progress}
          onLoaderFinished={() => setProgress(0)}
        />
      { session_token ? <LoggedInNavbar /> : <Navbar /> }
      {/* Content */}
      <div>
        <div className="bg-brown p-20 md:px-48">
          <div className="flex flex-row gap-2 items-center">
            <div className="bg-primary w-8 h-12"></div>
            <h1 className="text-2xl font-extrabold text-primary sm:text-5xl">What is <span className="text-white">Cafefy?</span></h1>
          </div>
        </div>
      {/* Text */}
        <div className="flex flex-col gap-14 mt-20 text-justify text-[#696969] xxxsm:mx-xxxsm md:px-56 text-xl">
          <p>Welcome to Cafefy, a personal web project created by <span className="font-bold">Francis Tin-ao</span> as a platform to promote local cafes in Butuan City. The project was developed using the MERN tech stack (MongoDB, Express, ReactJS, NodeJS) with tailwindCSS as its styling framework. This project was made for the purpose of practicing programming skills and for fun.</p>
          <p>Cafefy aims to provide users with constructive criticism about local cafes in Butuan City by allowing them to rate and comment on each cafe's offerings. This project is an opportunity for locals and tourists alike to discover new cafes and learn about the unique experiences each cafe offers.</p>
          <p>Disclaimer: All ratings and comments provided in Cafefy are for entertainment purposes only. Cafefy does not intend to ruin the image of any advertised cafe. The project's primary objective is to provide an avenue for locals and tourists to explore and appreciate the coffee scene in Butuan City.</p>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default About
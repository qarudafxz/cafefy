import { useState, useEffect } from 'react';
import { RxHamburgerMenu } from 'react-icons/rx';
import { SiCoffeescript } from 'react-icons/si';
import { AiTwotoneHome, AiFillHeart } from 'react-icons/ai';
import { HiInformationCircle } from 'react-icons/hi';
import { MdPermContactCalendar } from 'react-icons/md';
import { MdClose } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { buildUrl } from '../utils/buildUrl.js';
import Logo from '../assets/logo.png';
import { getUserId } from '../helpers/getUserId.js';

const LoggedInNavbar = () => {
  const [ isNavbarClicked, setIsNavbarClicked ] = useState(false);
  const [ userDeets, setUserDeets ] = useState({});
  const userID = getUserId();
  
  const getData = async () => {
    try {
      const response = await fetch(buildUrl(`/users/profile/${userID}`))
      const deets = await response.json();
      setUserDeets(deets);
    } catch(e) {
      console.log(e);
    }
  }

  const toggleLogout = () => {
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('token_expiration')
    sessionStorage.removeItem('user')
    sessionStorage.removeItem('userID')

    window.location.href = "/";
  }

  useEffect(() => {
    getData();
  },[])

  return (
    <nav className="xxxsm:py-6 relative z-10">
      <div className="xxxsm: mx-xxxsm flex flex-row justify-between">
        <motion.div 
          whileHover={{
            scale: 1.19,
            transition: { duration: 0.4 }
          }}
          >
          <Link to="/home"><img src={Logo} alt="logo" className="xxxsm:w-25 h-6"/></Link>  
        </motion.div>
        <button onClick={() => setIsNavbarClicked(!isNavbarClicked)} className="relative z-20">
          {isNavbarClicked ? <MdClose className="xxxsm:text-white text-2xl font-semibold" /> : <RxHamburgerMenu className="xxxsm:text-white text-2xl font-semibold" />}
        </button>
      </div>
      <AnimatePresence>
        {
          isNavbarClicked && (
            <motion.div
              initial={{ y: -1000 }}
              animate={{ y: 0}}
              exit={{ y: -1000}}
              transition={{ duration: 0.3 }}
              className="absolute top-0 bg-primary w-full max-h-96 shadow-md px-8 py-4 rounded-b-2xl"
            >
              <div className="flex flex-col gap-4 mt-14">
                <form>
                  <div className="flex flex-row gap-4">
                    <input type="text" placeholder='Search cafes' className="w-9/12 py-2 pl-6 rounded-3xl focus:outline-none bg-transparent border border-white font-primary text-white"/>
                    <Link to={{
                      pathname: `/profile/${userID}`,
                      state: { userID: userID }
                    }}><img src={userDeets.profilePic} alt={userDeets.firstName + " " + userDeets.lastName} className="xxxsm: w-11 rounded-full"/></Link>
                  </div>
                </form>
                <div className="flex flex-col gap-2 cursor-pointer text-white text-sm">
                  <div className="flex flex-row items-center">
                    <AiTwotoneHome className="text-xl mr-2" />
                    <Link to="/home">Home</Link>
                  </div>
                  <div className="flex flex-row items-center">
                    <SiCoffeescript className="text-xl mr-2" />
                    <Link to="/cafes">Cafes</Link>
                  </div>
                  <div className="flex flex-row items-center">
                    <HiInformationCircle className="text-xl mr-2" />
                    <Link to="/cafes">About</Link>
                  </div>
                  <div className="flex flex-row items-center">
                    <AiFillHeart className="text-xl mr-2" />
                    <Link to="/cafes">Favourite Cafes</Link>
                  </div>
                  <div className="flex flex-row items-center">
                    <MdPermContactCalendar className="text-xl mr-2" />
                    <Link to="/cafes">Contact</Link>
                  </div>
                <button className="bg-brown rounded-3xl py-1 font-bold text-lg" onClick={toggleLogout}>Logout</button>
                </div>
              </div>
            </motion.div>
          )
        }
      </AnimatePresence>
    </nav>
  )
}

export default LoggedInNavbar
import { useState, useEffect } from 'react';
import { RxHamburgerMenu } from 'react-icons/rx';
import { SiCoffeescript } from 'react-icons/si';
import { AiFillHeart } from 'react-icons/ai';
import { HiInformationCircle } from 'react-icons/hi';
import { MdPermContactCalendar } from 'react-icons/md';
import { MdClose } from 'react-icons/md';
import { BiLogOut } from 'react-icons/bi';
import { FiSettings } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { buildUrl } from '../utils/buildUrl.js';
import Logo from '../assets/logo.png';
import { getUserId } from '../helpers/getUserId.js';

const LoggedInNavbar = () => {
  const [ isNavbarClicked, setIsNavbarClicked ] = useState(false);
  const [ isDropDownClicked , setIsDropDownClicked ] = useState(false);
  const [ isLoaded, setIsLoaded ] = useState(false);

  const [ userDeets, setUserDeets ] = useState({});
  const userID = getUserId();
  
  const getData = async () => {
    setIsLoaded(true)
    try {
      const response = await fetch(buildUrl(`/users/profile/${userID}`))
      const deets = await response.json()
      setUserDeets(deets)
      setIsLoaded(false)
    } catch(e) {
      console.log(e);
    }
  }

  const toggleLogout = () => {
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('token_expiration')
    sessionStorage.removeItem('user')
    sessionStorage.removeItem('userID')
    window.location.reload();
  }

  useEffect(() => {
    getData();
  },[])

  return (
    <nav className="xxxsm:py-6 relative z-10 md:mx-24 xxl:mx-56">
      <div className="xxxsm: mx-xxxsm flex flex-row justify-between items-center md:-mx-10">
        <motion.div 
          whileHover={{
            scale: 1.19,
            transition: { duration: 0.4 }
          }}
          >
          <Link to="/cafes"><img src={Logo} alt="logo" className="xxxsm:w-25 h-6"/></Link>  
        </motion.div>
        <button onClick={() => setIsNavbarClicked(!isNavbarClicked)} className="relative z-20 md:hidden">
          {isNavbarClicked ? <MdClose className="xxxsm:text-white text-2xl font-semibold" /> : <RxHamburgerMenu className="xxxsm:text-white text-2xl font-semibold" />}
        </button>
        {/* Desktop Logged In Navbar */}
         <div className="xxxsm:hidden md:flex flex-row gap-4 font-primary text-white items-center sm:text-xs lg:text-lg gap-7">
            <input type="text" placeholder='Search cafes' className="py-2 pl-6 rounded-xl focus:outline-none bg-transparent border border-white font-primary text-white"/>
            <Link to="/cafes" className="font-semibold hover:text-brown duration-150">Cafes</Link>
            <Link to="" className="font-semibold hover:text-brown duration-150">Favourite Cafes</Link>
            <Link to="" className="font-semibold hover:text-brown duration-150">About</Link>
            <Link to="" className="font-semibold hover:text-brown duration-150">Contact</Link>
          
            { !isLoaded ? (
              <div className="flex flex-row gap-8 items-center border border-[#8b2801] py-2 px-4 rounded-md">
                <Link to={{
                pathname: `/profile/${userID}`,
                state: { userID: userID }
                }}>
                  <h1 className="font-extrabold">{userDeets.firstName}</h1>
                </Link>
                <img src={userDeets.profilePic} alt={userDeets.firstName + " " + userDeets.lastName} className="w-11 rounded-full cursor-pointer" onClick={() => setIsDropDownClicked(!isDropDownClicked)}/>
              </div>
            ):
            (
              <h1 className="flex flex-row gap-8 items-center border border-[#8b2801] py-2 px-4 rounded-md">Loading...</h1>
            )}
          </div>
      </div>
      <AnimatePresence>
        {
          isDropDownClicked && (
            <motion.div
              initial={{ y: -1000 }}
              animate={{ y: 80, x:40}}
              exit={{ y: -1000}}
              transition={{ duration: 0.3 }}
              className="absolute top-0 right-0 bg-brown w-2/12 max-h-96 rounded-b-2xl shadow-lg py-4"
            >
              <div className="md:flex flex-col gap-2 text-white">
                <div className="flex flex-row items-center px-8 py-4 hover:bg-[#552b1a] duration-200 w-full py-2 cursor-pointer">
                  <FiSettings className="text-xl mr-2" />
                  <Link to="/profile/edit" className="font-semibold">Account Settings</Link>
                </div>
                <button 
                  className="flex flex-row items-center px-8 py-4 hover:bg-[#552b1a] duration-200 w-full py-2 cursor-pointer"
                  onClick={toggleLogout}>
                  <BiLogOut className="text-xl mr-2" />
                  <p className="font-semibold">Logout</p>
                </button>
              </div>
            </motion.div>
          )
        }
      </AnimatePresence>
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
                    <SiCoffeescript className="text-xl mr-2" />
                    <Link to="/cafes">Cafes</Link>
                  </div>
                  <div className="flex flex-row items-center">
                    <AiFillHeart className="text-xl mr-2" />
                    <Link to="/cafes">Favourite Cafes</Link>
                  </div>
                  <div className="flex flex-row items-center">
                    <HiInformationCircle className="text-xl mr-2" />
                    <Link to="/cafes">About</Link>
                  </div>
                  <div className="flex flex-row items-center">
                    <MdPermContactCalendar className="text-xl mr-2" />
                    <Link to="/cafes">Contact</Link>
                  </div>
                <button className="bg-brown rounded-3xl py-1 font-bold text-lg text-ellipsis" onClick={toggleLogout}>Logout</button>
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
import { useState, useEffect } from 'react';
import { RxHamburgerMenu } from 'react-icons/rx';
import { SiCoffeescript } from 'react-icons/si';
import { HiInformationCircle } from 'react-icons/hi';
import { MdPermContactCalendar } from 'react-icons/md';
import { MdClose } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from '../assets/logo.png';

const Navbar = () => {
  const [ isNavbarClicked, setIsNavbarClicked ] = useState(false);

  return (
    <nav className="xxxsm:py-6 relative z-10 md:mx-24 xxl:mx-56">
        <div className="xxxsm: mx-xxxsm flex flex-row justify-between items-center md:-mx-10">
          <motion.div 
            whileHover={{
              scale: 1.19,
              transition: { duration: 0.4 }
            }}
            >
            <Link to="/"><img src={Logo} alt="logo" className="xxxsm:w-25 h-6"/></Link>  
          </motion.div>
          <button onClick={() => setIsNavbarClicked(!isNavbarClicked)} className="xxxsm: relative z-20 md:hidden">
            {isNavbarClicked ? <MdClose className="xxxsm:text-white text-2xl font-semibold" /> : <RxHamburgerMenu className="xxxsm:text-white text-2xl font-semibold" />}
          </button>

          {/* Desktop Navbar */}
          <div className="xxxsm:hidden md:flex flex-row gap-4 font-primary text-white items-center sm:text-xs lg:text-lg gap-7">
            <input type="text" placeholder='Search cafes' className="py-2 pl-6 rounded-xl focus:outline-none bg-transparent border border-white font-primary text-white"/>
            <Link to="/cafes" className="font-semibold hover:text-brown duration-150">Cafes</Link>
            <Link to="/about" className="font-semibold hover:text-brown duration-150">About</Link>
            <Link to="/auth/login" className="text-brown font-semibold border border-[#8b2801] py-2 px-6 rounded-full hover:duration-200">Log in</Link>
            <Link to="/auth/register" className="text-primary font-semibold bg-brown py-2 px-4 rounded-full sm:">Register</Link>
          </div>
        </div>
        <AnimatePresence>
          {
            isNavbarClicked && (
              <motion.div
                initial={{ y: -1000 }}
                animate={{ y: 0}}
                exit={{ y: -1000 }}
                transition={{ duration: 0.3 }}
                className="absolute top-0 bg-primary w-full shadow-md px-8 py-4 rounded-b-2xl"
              >
                <div className="flex flex-col gap-4 mt-14 sm:px-32">
                  <form>
                    <input type="text" placeholder='Search cafes' className="w-full py-2 pl-6 rounded-3xl focus:outline-none bg-transparent border border-white font-primary text-white"/>
                  </form>
                  <div className="flex flex-row gap-4 place-content-center cursor-pointer">
                    <Link to="/auth/login"><button className="border border-[#8b2801] text-[#8b2801] text-lg font-main font-semibold px-4 py-2 rounded-3xl">Login</button></Link>
                    <Link to="/auth/register"><button className="bg-[#8b2801] text-primary text-lg font-main font-semibold px-4 py-2 rounded-3xl">Register</button></Link>
                  </div>

                  <div className="flex flex-col gap-2 cursor-pointer text-white text-sm pb-10">
                    <div className="flex flex-row items-center">
                      <SiCoffeescript className="text-xl mr-2" />
                      <Link to="/cafes">Cafes</Link>
                    </div>
                    <div className="flex flex-row items-center">
                      <HiInformationCircle className="text-xl mr-2" />
                      <Link to="/about">About</Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          }
        </AnimatePresence>
      </nav>
  )
}

export default Navbar
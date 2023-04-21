import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
import { IoEyeSharp } from 'react-icons/io5';
import { AiFillEyeInvisible } from 'react-icons/ai';
import { buildUrl } from '../utils/buildUrl.js';
import Footer from '../components/Footer';

const Login = () => {
  const [ isVisible, setIsVisible ] = useState(false);
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ loginMessage, setLoginMessage ] = useState("");

  const handleLogin = async(e) => {
    e.preventDefault();

    try {
      const res = await fetch(buildUrl('/auth/login'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          password
        })
      });

      await res.json();

      if(!res.message) 
        setLoginMessage(res.message);
    } catch(e) {
      console.log(e);
    }
  }
  const togglePasswordVisibility = (e) => {
    e.preventDefault();
    setIsVisible(!isVisible);
  }

  return (
    <div>
      <Navbar />

      <div className="xxxsm:w-11/12 m-auto bg-[#232323] p-4 rounded-lg mt-14">
        <p className="xxxsm:font-primary text-white text-xs">Welcome Back!</p>
        <h1 className="xxxsm:font-primary text-cream text-4xl font-bold tracking-wide mb-4">Log In</h1>
        <form className="flex flex-col gap-4 text-xs" onSubmit={handleLogin}>
          <input 
            type="text" 
            placeholder="Enter your email" 
            className="focus:outline-none font-body bg-[#686868] rounded-md py-2 pl-4 pr-12 text-white w-full"
            onChange={(e) => setEmail(e.target.value)}  
          ></input>
          <div className="relative font-primary">
            <input
              type={isVisible ? "text" : "password"}
              placeholder="Enter your password"
              className="focus:outline-none font-body bg-[#686868] rounded-md py-2 pl-4 pr-12 text-white w-full"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={togglePasswordVisibility}>
              {isVisible ? (
                <AiFillEyeInvisible className="absolute right-3 top-2 text-xl cursor-pointer text-[#b9b9b9]" />
              ) : (
                <IoEyeSharp className="absolute right-3 top-2 text-xl cursor-pointer text-[#b9b9b9]" />
              )}
            </button>
            <button type="submit" className="w-full bg-[#8b2801] py-2 px-4 rounded-lg mt-10 font-extrabold text-white">Login</button>
            <p className="font-primary text-xs text-white mt-4 text-center">Don't have an account <span className="font-primary italic underline text-cream"><Link to="/auth/register">Create one</Link></span></p>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  )
}

export default Login
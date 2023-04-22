import React, { useState, useEffect } from 'react';
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

  const handleLogin = async (e) => {
    e.preventDefault();
  
    if (!email || !password) {
      setLoginMessage("Please fill all the fields");
      return;
    }
  
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
  
      const data = await res.json();
  
      if (data.message === "User logged in successfully") {
        const token_expiration = new Date().getTime() + 5 * 60 * 1000; // 5 minutes
        sessionStorage.setItem('token', data.token);
        sessionStorage.setItem('token_expiration', token_expiration);
        sessionStorage.setItem('user', JSON.stringify(data.username));
        sessionStorage.setItem('userID', data.userID);
  
        window.location.href = '/home';
      } else {
        setLoginMessage(data.message);
      }
    } catch (e) {
      throw new Error(data.message)
    }
  };
  

  const togglePasswordVisibility = (e) => {
    e.preventDefault();
    setIsVisible(!isVisible);
  }

  useEffect(() => {
    setTimeout(() => {
      setLoginMessage("");
    },2000);
  }, [loginMessage])

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
          {
            loginMessage && (
              <p className="text-red-500 text-xs">{loginMessage}</p>
            )
          }
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
            <button type="submit" className="w-full bg-brown py-2 px-4 rounded-lg mt-10 font-extrabold text-white">Login</button>
            <p className="font-primary text-xs text-white mt-4 text-center">Don't have an account <span className="font-primary italic underline text-cream"><Link to="/auth/register">Create one</Link></span></p>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  )
}

export default Login
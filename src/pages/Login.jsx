import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { Link, useLocation } from 'react-router-dom';
import { IoEyeSharp } from 'react-icons/io5';
import { AiFillEyeInvisible } from 'react-icons/ai';
import { buildUrl } from '../utils/buildUrl.js';
import Footer from '../components/Footer';
import TopLoadingBar from 'react-top-loading-bar';
import { googleSignUp } from '../helpers/googleSignUp.js';

const Login = () => {
  const [ isVisible, setIsVisible ] = useState(false);
  const [ progress, setProgress ] = useState(0);
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ loginMessage, setLoginMessage ] = useState("");
  const location = useLocation();

  const handleLogin = async (e) => {
    e.preventDefault();
  
    if (!email || !password) {
      setLoginMessage("Please fill all the fields");
      return;
    }
    
    setProgress(30);
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
      
      setProgress(100);
      const data = await res.json();
  
      if (data.message === "User logged in successfully") {
        const token_expiration = new Date().getTime() + 5 * 60 * 1000; // 5 minutes
        localStorage.setItem('token', data.token);
        localStorage.setItem('token_expiration', token_expiration);
        localStorage.setItem('user', JSON.stringify(data.username));
        localStorage.setItem('userID', data.userID);
  
        window.location.href = '/cafes';
      } else {
        setLoginMessage(data.message);
      }
    } catch (e) {
      throw new Error(e)
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

  useEffect(() => {
    setProgress(30)
    setTimeout(() => {
      setProgress(100)
    }, 1000)
  },[location])

  useEffect(() => {
    if (window.google) {
      google.accounts.id.initialize({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        callback: googleSignUp,
      });

      google.accounts.id.renderButton(document.getElementById("google-button"), {
        theme: "outline",
        size: "large",
        text: "continue_with",
        shape: "rectangular",
        width: `${window.innerWidth >= 275 && window.innerWidth <= 375 ? 245 
          : window.innerWidth > 375 && window.innerWidth <= 425 ? 250 
          : window.innerWidth > 425 && window.innerWidth <= 1024 ? 295 
          : window.innerWidth > 1024 && window.innerWidth <= 1440 ? 350 
          : window.innerWidth > 1440 && window.innerWidth <= 2560 ? 400 : 450
        }`,
        height: "50",
        longtitle: "true",
        onsuccess: googleSignUp,
        onfailure: googleSignUp,
      });
    }
  }, [])

  return (
    <div>
      <Navbar />
      <TopLoadingBar
          color='#8b2801'
          progress={progress}
          onLoaderFinished={() => setProgress(0)}
          height={4}
        />
      <div className="xxxsm:w-11/12 m-auto bg-[#232323] p-4 rounded-lg mt-14 sm:w-6/12 md:w-4/12 p-6 xl:w-3/12 xxl:w-3/12">
        <p className="xxxsm:font-primary text-white text-xs sm:text-lg xxl:mt-4">Welcome Back!</p>
        <h1 className="xxxsm:font-primary text-cream text-4xl font-extrabold tracking-wide mb-4 sm:text-6xl">Log In</h1>
        <form className="flex flex-col gap-4 text-xs xxl:mt-8" onSubmit={handleLogin}>
          <input 
            type="text" 
            placeholder="Enter your email" 
            className="focus:outline-none font-body bg-[#686868] rounded-md py-2 pl-4 pr-12 text-white w-full sm:text-base"
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
              className="focus:outline-none font-body bg-[#686868] rounded-md py-2 pl-4 pr-12 text-white w-full sm:text-base"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={togglePasswordVisibility}>
              {isVisible ? (
                <AiFillEyeInvisible className="absolute right-3 top-2 text-xl cursor-pointer text-[#b9b9b9] sm:top-3" />
              ) : (
                <IoEyeSharp className="absolute right-3 top-2 text-xl cursor-pointer text-[#b9b9b9] sm:top-3" />
              )}
            </button>
            <div className="flex flex-row items-center place-content-center my-8">
              <hr className="w-5/12 border-[#505050] "/>
              <p className="px-10 text-[#505050] text-sm">OR</p>
              <hr className="w-5/12 border-[#505050] "/>
            </div>
            <button id="google-button"></button>
            <button type="submit" className="w-full bg-brown py-2 px-4 rounded-lg mt-10 font-extrabold text-white hover:bg-[#552b1a] duration-200 sm:text-xl mt-20 xxl:mt-32">Login</button>
            <p className="font-primary text-xs text-white mt-4 text-center sm:text-base">Don't have an account <span className="font-primary italic underline text-cream font-bold"><Link to="/auth/register">Create one</Link></span></p>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  )
}

export default Login
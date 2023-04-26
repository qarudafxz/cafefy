import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom' 
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CupBg from '../assets/cup_bg.png';

import { buildUrl } from '../utils/buildUrl.js';
import TopLoadingBar from 'react-top-loading-bar';

const Register = () => {
  const navigate = useNavigate();
  const [ progress, setProgress ] = useState(0);
  const [ firstName, setFirstName ] = useState("")
  const [ lastName, setLastName ] = useState("")
  const [ email, setEmail ] = useState("")
  const [_, triggerLengthIndicator] = useState(false);
  const [ password, setPassword ] = useState("")
  const [ confirmPassword, setConfirmPassword ] = useState("")
  const [ alertMessage, setAlertMessage ] = useState("")
  const [ isPassword, setIsPassword ] = useState(true);
  const location = useLocation();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setAlertMessage("Password doesn't match!")
      setIsPassword(false);
      setConfirmPassword("");
      return;
    } else {
      setProgress(30);
      try {
        const response = await fetch(buildUrl('/auth/signup'), {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            firstName,
            lastName,
            email,
            password
          })
        })
        
        setProgress(100);
        if (response.status === 200) {
          navigate('/auth/login');
        } else {
          const data = await response.json();
          setAlertMessage(data.message);
        }
      } catch (e) {
        console.log(e);
      }
    }
  }

  useEffect(() => {
    setProgress(30);
    setTimeout(() => {
      setProgress(100);
    },1000)
  },[location])

  useEffect(() => {
    setTimeout(() => {
      setAlertMessage("");
      setIsPassword(true);
    }, 4000);
  },[alertMessage, isPassword])

  return (
    <div>
      <Navbar />
      <TopLoadingBar
        color='#8b2801'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
        height={4}
      />
      <div className="shadow-2xl font-primary xxxsm: flex flex-col m-xxxsm sm:grid grid-cols-2 md:mx-36 xxl:mx-56">
        <img src={CupBg} alt="Cup" className="xxxsm: w-full h-full rounded-t-2xl sm:rounded-t-none rounded-l-3xl"/>
        <div className="xxxsm: bg-white p-4 rounded-b-2xl sm:rounded-b-none rounded-r-3xl p-6 md:p-8 xxl:px-14">
          <p className="xxxsm: text-xs font-semibold text-brown sm:text-md mb-2 xxl:text-lg">Create an account now!</p>
          <h1 className="font-extrabold text-primary xxxsm: text-5xl  font-bold text-main sm:text-6xl">Sign Up</h1>
          <form className="flex flex-col gap-1 mt-4 xl:gap-3 xxl:mt-4" onSubmit={handleSignup}>
            <input type="text" placeholder="Enter First Name" required className="xxxsm: text-xs border border-[#9F9F9F] rounded-md py-2 pl-4 xl:text-lg" onChange={(e) => setFirstName(e.target.value)}/>
            <input type="text" placeholder="Enter Last Name" required className="xxxsm: text-xs border border-[#9F9F9F] rounded-md py-2 pl-4 xl:text-lg" onChange={(e) => setLastName(e.target.value)}/>
            <input type="email" placeholder="Enter Email" required className="xxxsm: text-xs border border-[#9F9F9F] rounded-md py-2 pl-4 xl:text-lg" onChange={(e) => setEmail(e.target.value)}/>
            {_ && <p className={`font-primary text-sm font-semibold ${password.length <= 3 ? "text-red-600" : password.length >= 3 && password.length < 12 ? "text-[#F9BD00]" : password.length >= 12 && "text-[#00BB0F]"} xl:text-lg`}>Password Length: {password.length <= 3 ? "Weak" : password.length >= 3 && password.length < 12 ? "Average" : password.length >= 12 && "Strong"}</p>}
            <input type="password" placeholder="Enter Password" onClick={() => triggerLengthIndicator(!_)} onChange={(e) => {
              setPassword(e.target.value)
              triggerLengthIndicator(true)
            }} required className="xxxsm:text-xs border border-[#9F9F9F] rounded-md py-2 pl-4 xl:text-lg"/>
            { alertMessage && ( <p className="text-xs font-semibold text-red-700">{alertMessage}</p>) }
            <input type="password" placeholder="Confirm Password" required className={`text-xs border ${!isPassword ? "border-red-700" : "border-[#9F9F9F]" } rounded-md py-2 pl-4 xl:text-lg`} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
            <button className="hover:bg-[#552b1a] duration-200 xxxsm: bg-brown rounded-md py-2 text-md font-bold text-white mt-12 xl:mt-28 xxl:mt-72 py-3 text-xl">Sign Up</button>
          </form>
          <p className="xxxsm:text-sm text-center mt-8 xxl:text-lg">Already have an account? <Link to="/auth/login" className="underline italic text-brown font-bold">Login</Link></p>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Register
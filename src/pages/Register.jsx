import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom' 
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CupBg from '../assets/cup_bg.png';

import { buildUrl } from '../utils/buildUrl.js';

const Register = () => {
  const navigate = useNavigate();
  const [ firstName, setFirstName ] = useState("")
  const [ lastName, setLastName ] = useState("")
  const [ email, setEmail ] = useState("")
  const [_, triggerLengthIndicator] = useState(false);
  const [ password, setPassword ] = useState("")
  const [ confirmPassword, setConfirmPassword ] = useState("")
  const [ alertMessage, setAlertMessage ] = useState("")
  const [ isPassword, setIsPassword ] = useState(true);

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setAlertMessage("Password doesn't match!")
      setIsPassword(false);
      setConfirmPassword("");
      return;
    } else {
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
    setTimeout(() => {
      setAlertMessage("");
      setIsPassword(true);
    }, 4000);
  },[alertMessage, isPassword])

  return (
    <div>
      <Navbar />
      <div className="font-primary xxxsm: flex flex-col m-xxxsm">
        <img src={CupBg} alt="Cup" className="xxxsm: w-full h-full rounded-t-2xl"/>
        <div className="bg-white p-4 rounded-b-2xl">
          <p className="text-xs font-semibold text-brown">Create an account now!</p>
          <h1 className="text-5xl font-bold text-main">Sign Up</h1>
          <form className="flex flex-col gap-1 mt-4" onSubmit={handleSignup}>
            <input type="text" placeholder="Enter First Name" required className="text-xs border border-[#9F9F9F] rounded-md py-2 pl-4" onChange={(e) => setFirstName(e.target.value)}/>
            <input type="text" placeholder="Enter Last Name" required className="text-xs border border-[#9F9F9F] rounded-md py-2 pl-4" onChange={(e) => setLastName(e.target.value)}/>
            <input type="email" placeholder="Enter Email" required className="text-xs border border-[#9F9F9F] rounded-md py-2 pl-4" onChange={(e) => setEmail(e.target.value)}/>
            {_ && <p className={`font-primary text-sm font-semibold ${password.length <= 3 ? "text-red-600" : password.length >= 3 && password.length < 12 ? "text-[#F9BD00]" : password.length >= 12 && "text-[#00BB0F]"}`}>Password Length: {password.length <= 3 ? "Weak" : password.length >= 3 && password.length < 12 ? "Average" : password.length >= 12 && "Strong"}</p>}
            <input type="password" placeholder="Enter Password" onClick={() => triggerLengthIndicator(!_)} onChange={(e) => {
              setPassword(e.target.value)
              triggerLengthIndicator(true)
            }} required className="text-xs border border-[#9F9F9F] rounded-md py-2 pl-4"/>
            { alertMessage && ( <p className="text-xs font-semibold text-red-700">{alertMessage}</p>) }
            <input type="password" placeholder="Confirm Password" required className={`text-xs border ${!isPassword ? "border-red-700" : "border-[#9F9F9F]" } rounded-md py-2 pl-4`} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
            <button className="xxxsm: bg-brown rounded-md py-2 font-bold text-white mt-12">Sign Up</button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Register
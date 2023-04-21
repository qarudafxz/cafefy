import React from 'react'
import { AiFillGithub } from 'react-icons/ai';
import { Link } from 'react-router-dom'; 
import Logo from '../assets/logo.png'


function Footer() {
  return (
    <div className="mt-24 xxxsm: flex flex-col gap-4 m-xxxsm border border-[#676767] rounded-md p-4 font-primary">
      <div className="xxxsm: flex flex-row justify-between">
        <img src={Logo} alt="Cafefy" className="xxxsm: w-5/12"/>
        <Link to="/auth/login"><button className="border border-white px-4 py-2 rounded-3xl text-white">Get Started</button></Link>
      </div>
      <div className="flex flex-row gap-4 items-center text-white">
        <AiFillGithub size={24}/>
        <a href="" target="_blank" className="font-bold text-lg">Github Repo</a>
      </div>
    </div>
  )
}

export default Footer
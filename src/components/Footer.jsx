import React from 'react'
import { AiFillGithub } from 'react-icons/ai';
import { Link } from 'react-router-dom'; 
import Logo from '../assets/logo.png'


function Footer() {
  return (
    <div className="mt-24 xxxsm: flex flex-col gap-4 m-xxxsm border border-[#676767] rounded-md p-4 font-primary">
      <div className="xxxsm: flex flex-row justify-between items-center">
        <img src={Logo} alt="Cafefy" className="xxxsm: w-5/12 h-full"/>
        <Link to="/auth/login"><button className="border border-white px-4 py-2 rounded-3xl text-white">Get Started</button></Link>
      </div>
      <ul className="xxxsm: flex flex-col gap-3 text-white text-xs cursor-pointer">
        <li className="hover:text-[#868686] duration-200">About Cafefzy</li>
        <li className="hover:text-[#868686] duration-200">The Developers</li>
        <li className="hover:text-[#868686] duration-200">Objective of the Project</li>
      </ul>
      <div className="flex flex-row gap-4 items-center text-white">
        <AiFillGithub size={24}/>
        <a href="https://github.com/francistinao/cafefy" target="_blank" className="font-bold text-sm">Github Repo</a>
      </div>
      <p className="leading-tight text-[#585858] text-xs">© Cafefy 2023  All Rights Reserved</p>
    </div>
  )
}

export default Footer
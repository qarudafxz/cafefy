import React from 'react'
import { AiFillGithub } from 'react-icons/ai';
import { Link } from 'react-router-dom'; 
import Logo from '../assets/logo.png'


function Footer() {
  return (
    <div className="mt-24 xxxsm:flex flex-col gap-4 m-xxxsm border border-[#676767] rounded-md p-4 font-primary xxl:mx-64">
      <div className="xxxsm: flex flex-row justify-between items-center">
        <img src={Logo} alt="Cafefy" className="xxxsm: w-5/12 h-full sm: w-20 md:w-24 first-letter: xxl:w-28"/>
        <Link to="/auth/login"><button className="border border-white px-4 py-2 rounded-3xl text-white">Get Started</button></Link>
      </div>
      <ul className="xxxsm:flex flex-col gap-3 text-white text-xs cursor-pointer sm:grid grid-cols-2 leading-3">
        <Link to="/about" className="hover:text-[#868686] duration-200">About Cafefy</Link>
        <div className="flex flex-col gap-3">
          <h1 className="font-bold">Follow the developer's social media</h1>
          <a href="https://www.facebook.com/francisj.tinao/" target="_blank" className="hover:text-[#868686] duration-200">Facebook</a>
          <a href="https://twitter.com/francistinao_" target="_blank" className="hover:text-[#868686] duration-200">Twitter</a>
          <a href="https://www.instagram.com/francis.tinao/" target="_blank" className="hover:text-[#868686] duration-200">Instagram</a>
          <a href="https://www.linkedin.com/in/francis-tin-ao-10050412a/" target="_blank" className="hover:text-[#868686] duration-200">LinkedIn</a>
        </div>
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
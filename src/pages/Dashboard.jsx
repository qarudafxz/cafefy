import React from 'react'
import LoggedInNavbar from '../components/LoggedInNavbar'
import Illus from '../assets/illus.svg';
import { BiMouse } from 'react-icons/bi';

function Dashboard() {
  return (
    <div>
      <LoggedInNavbar />
      <div className="xxxsm: flex flex-col gap-4 mx-xxxsm font-primary">
        <img src={Illus} className="mt-4"/>
        <h1 className="xxxsm:text-white font-bold text-3xl leading-10 mt-10">Looking for a place to chill?</h1>
        <p className="xxxsm:text-white font-medium">Check out all the listed cafes we have from within <span className="font-semibold">Butuan City</span>, Philippines</p>
        <p className="xxxsm: text-white flex flex-row items-center gap-3 text-sm mt-12"><BiMouse /> Scroll Now</p>
        <h1 className="xxxsm:bg-brown text-white font-bold text-2xl text-center py-3 rounded-lg relative top-40">Fint a list of cafes near you</h1>
      </div>
    </div>
  )
}

export default Dashboard
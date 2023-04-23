import React from 'react'
import LoggedInNavbar from '../components/LoggedInNavbar'
import Illus from '../assets/illus.svg';
import { BiMouse } from 'react-icons/bi';
import Cafes from '../components/Cafes';
import Footer from '../components/Footer'

function Dashboard() {
  const username = sessionStorage.getItem('user');
  return (
    <div>
      <LoggedInNavbar />
      <div className="xxxsm: flex flex-col gap-4 mx-xxxsm font-primary scroll-smooth" style={{scrollBehavior: "smooth"}}>
        <img src={Illus} className="mt-4"/>
        <h1 className="text-white bg-brown mt-10 text-lg px-4 py-2 rounded-lg leading-5">👋 Welcome back! <span className="font-bold">{username.replace('"', '').replace('"','')}</span></h1>
        <h1 className="xxxsm:text-white font-bold text-3xl leading-10 mt-4">Looking for a place to chill?</h1>
        <p className="xxxsm:text-white font-medium">Check out all the listed cafes we have from within <span className="font-semibold">Butuan City</span>, Philippines</p>
        <p className="xxxsm: text-white text-sm mt-12"><a href="#cafes" className="flex flex-row items-center gap-3"><BiMouse /> Scroll Now</a></p>
        <h1 className="xxxsm:bg-brown text-white font-bold text-xl text-center py-2 px-3 rounded-lg relative top-40">Find cafes near you</h1>
        <Cafes/>
      </div>
        <Footer />
    </div>
  )
}

export default Dashboard
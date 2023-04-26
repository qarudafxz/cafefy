import React, { useState, useEffect} from 'react'
import { useLocation } from 'react-router-dom';
import { MdAccountCircle } from 'react-icons/md';
import { BiUpload } from 'react-icons/bi';
import { TbLink } from 'react-icons/tb';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import LoggedInNavbar from '../components/LoggedInNavbar'
import { SESSION_TOKEN } from '../helpers/sessionToken';
import CupPic from '../assets/cup_bg.png';
import { getUserID } from '../private/getUserID.js';
import { buildUrl }from '../utils/buildUrl.js';
import TopLoadingBar from 'react-top-loading-bar';

import Footer from '../components/Footer';

function EditProfile() {
  let defaultPic = "https://static.vecteezy.com/system/resources/previews/002/412/377/original/coffee-cup-logo-coffee-shop-icon-design-free-vector.jpg";
  let defaultBg = "https://wallpapercave.com/wp/wp11903179.jpg";

  const [ progress, setProgress ] = useState(0);
  const [ user, setUser ] = useState({});
  const [ profilePic, setProfilePic ] = useState(defaultPic);
  const [ bgCover, setBgCover ] = useState(defaultBg);
  const [ profilePicLink, setProfilePicLink ] = useState("");
  const [ bio, setBio ] = useState("");
  const [ isSetProfilePic, setProfile ] = useState(false);
  const [ alertMessage, setAlertMessage ] = useState("");
  const session_token = SESSION_TOKEN;
  const userID = getUserID();
  const location = useLocation();

  const link = (e) => {
    e.preventDefault()
    if(!profilePicLink) {
      setProfilePic(defaultPic);
      setProfile(false);
      return;
    }
    setProfilePic(profilePicLink);
  }

  const editProfile = async () => {
    if(!bgCover || !bio) {
      setAlertMessage("Please fill all the fields below");
      return;
    } 
    try {
      await fetch(buildUrl(`/users/account-settings/${userID}`), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session_token}`
        },
        body: JSON.stringify({
          imageLink: profilePic,
          bgLink: bgCover,
          bio
        })
      });

      window.location.href = `/profile/${userID}`
    } catch(err) {
      console.log(err);
    }
  }

  const getData = async () => {
    try {
      const response = await fetch(buildUrl(`/users/profile/${userID}`))
      const deets = await response.json();
      setUser(deets);
    } catch(e) {
      console.log(e);
    }
  }

  useEffect(()=> {
    setProgress(30)
    getData();

    setProgress(100);
    if(!session_token) 
      window.location.href = '/auth/login';
  }, [location])

  useEffect(() => {
    setTimeout(() => {
      setAlertMessage("");
    },5000);
  }, [alertMessage])

  return (
    <div className={`relative ${ !isSetProfilePic ? 'backdrop-filter backdrop-blur-md' : 'bg-gray-500 bg-opacity-50'} font-primary`}>
      {session_token ? <LoggedInNavbar /> : null}
      <TopLoadingBar
          color='#8b2801'
          progress={progress}
          onLoaderFinished={() => setProgress(0)}
          height={4}
        />
      <div className="mt-14 xxxsm: mx-xxxsm flex flex-col gap-7 border border-[#616161] rounded-md p-4 md:flex-row lg:mx-56 p-10">
        <div className="flex flex-col gap-3">
          <h1 className="flex items-center gap-3 text-white font-extrabold text-2xl xl:text-5xl"><MdAccountCircle className="text-cream"/>Account settings</h1>
          { alertMessage && <p className="text-red-500 font-bold">{alertMessage}</p> }
          <div className="flex flex-col gap-3">
            <h1 className="text-white font-bold text-md xl:text-2xl mt-10">Profile Picture</h1>
            {isSetProfilePic && 
              <div className="relative z-10 top-20 bg-primary p-4">
                <AiOutlineCloseCircle size={24} className="text-white mb-2" onClick={
                  (e) => {
                    setProfile(false)
                    link(e);
                  }
                }/>
                <input type="text" placeholder="Enter image link" className="xxxsm: w-full h-10 rounded-md border border-[#616161] p-2 focus:outline-none" onChange={(e) => setProfilePicLink(e.target.value)}/>
              </div>
            }
            <div className="flex flex-row gap-8 items-center">
              <img src={user.profilePic == defaultPic ? defaultPic : user.profilePic} className="xxxsm: w-4/12 h-full rounded-full"/>
              <div className="flex flex-col gap-1">
                <button className="disabled flex gap-2 items-center xxxsm:text-xs text-white font-bold bg-[#B57F6A] py-2 px-4 rounded-md xl:text-xl"><BiUpload size={24}/>Upload own photo</button>
                <button className="disabled flex gap-2 items-center xxxsm:text-xs text-white font-bold border border-white py-2 px-4 rounded-md xl:text-xl" onClick={() => setProfile(true)}><TbLink size={24}/>Upload using link</button>
              </div>
            </div>
          </div>
          <h1 className="text-white font-bold text-md xl:text-2xl">Change Background Picture</h1>
          <input type="text" onChange={(e) => setBgCover(e.target.value)} className="focus:outline-none p-2 rounded-md"></input>
          <h1 className="text-white font-bold text-md xl:text-2xl">Change Bio</h1>
          <textarea type="text" onChange={(e) => setBio(e.target.value)} className="focus:outline-none p-4 rounded-md xl:h-52"></textarea>
          <button className="bg-brown py-2 px-4 rounded-full text-white font-bold xl:text-3xl mt-28" onClick={editProfile}>Update my profile</button>
        </div>
        <img src={CupPic} alt="Cafefy Cup" className="xxxsm:hidden md:block w-6/12"/>
      </div>
      <Footer />
    </div>
  )
}

export default EditProfile
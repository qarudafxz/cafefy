import React, { useState, useEffect} from 'react'
import { Link, useParams } from 'react-router-dom'
import { buildUrl } from '../utils/buildUrl.js';
import { AiFillEdit, AiFillProfile } from 'react-icons/ai';
import LoggedInNavbar from '../components/LoggedInNavbar'
import Navbar from '../components/Navbar.jsx';
import CardSkeletonProfile from '../components/CardSkeletonProfile';
import { AiFillStar } from 'react-icons/ai';
import toast, { Toaster } from 'react-hot-toast';
import { CAFEFY_DEV } from '../private/cafefyDev.js';
import { SESSION_TOKEN } from '../private/sessionToken.js';

function Profile() {
  let { id: userID } = useParams();
  const dev = CAFEFY_DEV;
  const [ isLoading, setIsLoading ] = useState(false);
  const [ userDeets, setUserDeets ] = useState({});
  const session_token = SESSION_TOKEN;

  const copyProfile = () => {
    navigator.clipboard.writeText(`http://localhost:5173/users/${userID}`);
    toast('Profile link copied to clipboard!')
  }


  const getUserDetails = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(buildUrl(`/users/profile/${userID}`))
      const details = await response.json();
      setUserDeets(details);
    } catch(e) { 
      console.log(e);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    getUserDetails();
  }, [])

  return (
    <div>
      { session_token ? <LoggedInNavbar /> : <Navbar /> }
      { isLoading ? ( <CardSkeletonProfile /> ) : ( 
        <div className="font-primary">
          <Toaster 
            toastOptions={{
              style: {
                borderTop: '7px solid #28D102',
                padding: '16px',
                color: '#28D102',
              }
            }}
          />
          <img src={userDeets.bgCover} className="absolute -z-10 object-scale-down w-full sm:object-fit" style={{
            backgroundPosition: 'center center',
            backgroundSize: 'cover',
          }}/>
          <img src={userDeets.profilePic} className="xxxsm:relative w-5/12 rounded-full m-auto top-24 border-4 border-[#131313] sm:top-80 w-52 border-8"/>
          <div className="xxxsm: flex flex-col">
            <div className="xxxsm: flex flex-row gap-4 mt-32 place-content-center place-items-center sm:mt-96">
              <Link to="/profile/edit" className="flex flex-row gap-2 items-center bg-brown text-white font-medium px-4 py-2 rounded-full"><AiFillEdit />Edit Profile</Link>
              <button to="" className="flex flex-row gap-2 items-center bg-brown text-white font-medium px-4 py-2 rounded-full" onClick={copyProfile}><AiFillProfile />Share Profile</button>
            </div>
            <div className="font-primary xxxsm: flex flex-col gap-6 mt-12 m-xxxsm">
              <h1 className="xxxsm: text-white text-3xl font-bold text-center">{userDeets.firstName + " " + userDeets.lastName}</h1>
              { userDeets._id == dev && <h1 className="font-bold text-white border border-[#8b2801] rounded-full flex gap-3 items-center place-content-center xxxsm:py-2" id="color"><img src="https://camo.githubusercontent.com/f7bd518a92e1206f7dd3cd5f16dabadb3df596b48ad7c44baae5a930f643c228/68747470733a2f2f63756c746f667468657061727479706172726f742e636f6d2f666c6167732f68642f6972616e706172726f742e676966" className="xxxsm:w-8 mb-2"/>Cafefy Dev</h1>}
              <p className="text-sm leading-4 text-[#919191] text-center">{userDeets.bio}</p>
            </div>
            <div className="xxxsm: flex flex-row gap-16 text-center place-content-center text-white font-primary font-semibold mt-10">
              <div className="xxxsm: flex flex-col">
                <h1 className="xxxsm: text-6xl">{userDeets.numberOfRatings}</h1>
                <h1 className="xxxsm: text-lg">Ratings</h1>
              </div>
              <div>
                <h1 className="xxxsm: text-6xl">{userDeets.numberOfReviews}</h1>
                <h1 className="xxxsm: text-lg">Reviews</h1>
              </div>
            </div>
            {
              !userDeets.rates || userDeets.rates.length === 0 ? (
                <div className="xxxsm: flex flex-col gap-2 text-center mt-24 mx-xxxsm">
                  <p className="xxxsm: text-3xl font-bold text-white">No ratings yet!</p>
                  <Link to="/cafes" className="xxxsm: border-2 border-brown rounded-full py-2 text-white font-bold cursor-pointer">Rate Now</Link>
                </div>
              ) : (
                <div className="xxxsm:mx-xxxsm flex flex-col gap-2 mt-24 font-primary">
                  <h1 className="xxxsm: text-center text-3xl text-white font-bold mb-4">Activity</h1>
                  {
                    userDeets.rates.map((rate, id) => {
                      return (
                        <div key={id} className="flex">
                          <Link to={{
                            pathname: `/cafe/${rate.cafeName}/${rate.cafeId}`,
                            state: { cafeID: rate.cafeId }
                          }}
                          >
                            <img src={rate.cafeLogo} alt={rate.cafeName} className="xxxsm: rounded-l-md w-full" style={{
                              width: '120px',
                              height: 'full',
                            }}/>
                          </Link>
                          <div className="xxxsm: bg-white w-8/12 rounded-r-lg flex flex-col justify-between p-4 hover:bg-[#dadada] duration-200">
                            <div className="flex flex-row gap-2">
                              <Link to={{
                                 pathname: `/cafe/${rate.cafeName}/${rate.cafeId}`,
                                 state: { cafeID: rate.cafeId }
                                }} className="xxxsm:font-semibold text-brown text-xs hover:text-black duration-200 sm:text-lg">
                                <h1>{rate.cafeName}</h1>
                              </Link>
                              <div className="xxxsm: flex flex-row gap-2 items-center">
                                <AiFillStar className="text-yellow-400" size={14}/>
                                <span className="text-primary text-xs font-semibold">{rate.rate}</span>
                              </div>
                            </div>
                            <hr className="w-full"></hr>
                            <p className="xxxsm: font-semibold text-xs text-ellipsis whitespace-nowrap overflow-hidden mt-4">{rate.comment}</p>
                            <p className="xxxsm: text-xs text-right mt-4">{new Date(rate.date).toLocaleDateString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true})}</p>
                          </div>
                        </div>
                      )
                    })
                  }
                </div>
              )
            }
          </div>
        </div>
      )}
    </div>
  )
}

export default Profile
import React, { useState, useEffect} from 'react'
import { Link, useParams } from 'react-router-dom'
import { buildUrl } from '../utils/buildUrl.js';
import { AiFillEdit, AiFillProfile } from 'react-icons/ai';
import LoggedInNavbar from '../components/LoggedInNavbar'
import CardSkeletonProfile from '../components/CardSkeletonProfile';
import { AiFillStar } from 'react-icons/ai';

function Profile() {
  let { id: userID } = useParams();
  const [ isLoading, setIsLoading ] = useState(false);
  const [ userDeets, setUserDeets ] = useState({});

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
      <LoggedInNavbar />
      { isLoading ? ( <CardSkeletonProfile /> ) : ( 
        <div className="font-primary">
          <img src={userDeets.bgCover} className="xxxsm:absolute -z-10"/>
          <img src={userDeets.profilePic} className="xxxsm:relative w-5/12 rounded-full m-auto top-24 border-4 border-[#131313]"/>
          <div className="xxxsm: flex flex-col">
            <div className="xxxsm: flex flex-row gap-4 mt-32 place-content-center place-items-center">
              <button className="flex flex-row gap-2 items-center bg-brown text-white font-medium px-4 py-2 rounded-full"><AiFillEdit />Edit Profile</button>
              <button className="flex flex-row gap-2 items-center bg-brown text-white font-medium px-4 py-2 rounded-full"><AiFillProfile />Share Profile</button>
            </div>
            <div className="font-primary xxxsm: flex flex-col gap-6 mt-12 m-xxxsm">
              <h1 className="xxxsm: text-white text-3xl font-bold text-center">{userDeets.firstName + " " + userDeets.lastName}</h1>
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
                  <p className="text-3xl font-bold text-white">No ratings yet!</p>
                  <button className="border-2 border-brown rounded-full py-2 text-white font-bold">Rate now</button>
                </div>
              ) : (
                <div className="xxxsm:mx-xxxsm flex flex-col gap-2 mt-24 font-primary">
                  <h1 className="xxxsm: text-center text-3xl text-white font-bold mb-4">Activity</h1>
                  {
                    userDeets.rates.map((rate, id) => {
                      return (
                        <div key={id} className="flex">
                          <Link to={{
                            pathname: '/cafe/:id',
                            state: { cafeID: rate.cafeId }
                          }}
                          className="xxxsm: w-11/12 h-auto rounded-l-lg">
                            <img src={rate.image} alt={rate.cafeName} />
                          </Link>
                          <div className="xxxsm: bg-white w-8/12 rounded-r-lg flex flex-col justify-between p-4">
                            <div className="flex flex-row justify-between">
                              <h1 className="font-semibold text-brown">{rate.cafeName}</h1>
                              <div className="xxxsm: flex flex-row gap-2 items-center">
                                <AiFillStar className="text-yellow-400" size={14}/>
                                <span className="text-primary text-xs font-semibold">{rate.rate}</span>
                              </div>
                            </div>
                            <hr className="w-full"></hr>
                            <p className="font-semibold text-xs text-ellipsis whitespace-nowrap overflow-hidden">{rate.comment}</p>
                            <p className="text-xs text-right">{rate.date.toLocaleString('en-US', { timeZone: 'UTC'}).replace(',', '')}</p>
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
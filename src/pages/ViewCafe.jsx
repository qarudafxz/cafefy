import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { buildUrl } from '../utils/buildUrl.js';
import LoggedInNavbar from '../components/LoggedInNavbar';
import Navbar from '../components/Navbar'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'; 
import { IoLocationSharp } from 'react-icons/io5'
import { SESSION_TOKEN } from '../private/sessionToken.js';
import CardSkeleton from '../components/CardSkeleton';
import { getUserId } from '../helpers/getUserId.js';

function ViewCafe() {
  const [ isLoading, setIsLoading ] = useState(false);
  const { id: cafeID } = useParams();
  const [ cafeDeets, setCafeDeets ] = useState({});
  const session_token = SESSION_TOKEN;
  const userID = getUserId();
  const [ disableBtn, setDisableBtn ] = useState(false);

  const getCafeDetails = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(buildUrl(`/cafes/cafe/${cafeID}`), {
        method: 'GET'
      })
      const details = await response.json();
      setCafeDeets(details);
      setIsLoading(false);
    } catch(err) {
      throw new Error(err);
    }
  }

  useEffect(() => {
    getCafeDetails();
  }, [])

  useEffect(() => {
    setDisableBtn(userID && cafeDeets.raters?.find(rate => rate.userId === userID));
  }, [cafeDeets]);

  return (
    <div>
      { !session_token ? <Navbar /> : <LoggedInNavbar /> }
      <div className="xxxsm:flex flex-col gap-2">
        <div className="font-primary mx-xxxsm">
            {
              isLoading ? <CardSkeleton /> : ( 
                <div className="xxxsm:flex flex-col gap-2 sm:grid grid-cols-2 md:mx-40 gap-20 mt-8">
                  <div>
                    <img src={cafeDeets.image} className="rounded-lg md:w-120"/>
                    <h1 className="xxxsm: text-white text-5xl font-bold my-4 md:text-6xl">{cafeDeets.name}</h1>
                    <p className="xxxsm: flex flex-row gap-3 items-center text-white text-xs border border-white rounded-md py-2 px-4 mb-6 md:text-lg"><IoLocationSharp size={50}className="text-md"/>{cafeDeets.address}</p>
                    <p className="text-white md:text-2xl">{cafeDeets.desc}</p>
                    <div className="xxxsm: flex flex-row items-center justify-between mt-6">
                      {
                        //Immediately invoked function
                        (() => {
                          const stars = [];
                          const rating = Math.floor(cafeDeets.averageRate);
                          for(let i = 0; i < rating; i++) {
                            stars.push(<AiFillStar key={i} />);
                          }

                          for(let i = rating; i < 5; i++) {
                            stars.push(<AiOutlineStar key={i} className="text-cream"/>);
                          }
                          return <div className="flex flex-row">{stars.map((star, index) => <span className="text-cream text-5xl" key={index}>{star}</span>)}</div>;
                        })()
                      }
                      <div className="xxxsm: flex flex-col text-center text-white">
                        <h1 className="font-bold text-2xl">{cafeDeets?.averageRate?.toFixed(1)}</h1>
                        <p>Average</p>
                      </div>
                    </div>
                  </div>
                  {/* Ratings and comments */}
                  <div>
                    <p className="xxxsm: text-md text-white font-semibold leading-5">{cafeDeets.numberOfRaters} {cafeDeets.numberOfRaters <= 1 ? "User" : "Users"} have reviewed this cafe</p>
                    <div className="xxxsm: flex flex-col gap-4 border border-white rounded-md p-2 mt-3">
                      <h1 className="text-cream font-bold text-2xl md:text-4xl shadow-2xl">Ratings & Reviews</h1>
                      <div className="md: flex flex-col gap-4 overflow-y-scroll h-[600px] scrollable-comments">
                        {
                          cafeDeets.raters?.map((rate) => {
                            return (
                              <div key={rate._id} className="xxxsm: flex flex-col gap-4 bg-white rounded-md p-4">
                                <div className="flex flex-row gap-4">
                                  <Link to={`/users/${rate.userId}`} className="xxxsm: w-3/12 md:w-20"><img src={rate.userImage} className="rounded-full"/></Link>
                                  <div className="flex flex-col">
                                    <h1 className="xxxsm:font-bold text-primary text-sm md:text-xl">{rate.userName}</h1>
                                    <div className="flex flex-row gap-1 items-center">
                                      <h1 className="text-xs md:text-xl">{rate.rate}</h1>
                                      {
                                        (() => {
                                          const stars = [];
                                          const rating = Math.floor(rate.rate);
                                          for(let i = 0; i < rating; i++) {
                                            stars.push(<AiFillStar key={i} />);
                                          }
                                          for(let i = rating; i < 5; i++) {
                                            stars.push(<AiOutlineStar key={i} className="text-brown" />);
                                          }
                                          return <div className="flex flex-row">{stars.map((star, index) => <span className="text-brown text-sm md:text-xl" key={index}>{star}</span>)}</div>;
                                        })()
                                      }
                                    </div>
                                  </div>
                                </div>
                                <hr></hr>
                                <p className="text-sm font-semibold">{rate?.comment}</p>
                                <p className="text-xs from-neutral-700">{new Date(rate?.date).toLocaleDateString('en-US')}</p>
                              </div>
                            )
                          })
                        }
                      </div>
                    </div>
                    <div className="mt-10">
                      {
                          disableBtn ? <button className="disabled w-full xxxsm:bg-[#924729] mt-4 text-white text-md font-semibold rounded-md py-2 px-8">You already wrote a review</button> : (
                            <Link 
                              to={`/review/${cafeID}`} 
                              state={{cafeID: cafeID}}
                              className="xxxsm:bg-brown font-semibold text-xl rounded-md py-2 px-8 text-white mb-4 text-center"
                            >
                              <button>
                                Write a review
                              </button>
                            </Link>
                          )
                      }
                    </div>
                  </div> 
                </div>
              )
            }
          </div>
      </div>
    </div>
  )
}

export default ViewCafe
import React, { useState, useEffect } from 'react'
import { fetchTopCafes } from '../lib/fetchTopCafes';
import CardSkeleton from './CardSkeleton';
import { AiFillStar } from 'react-icons/ai'
import { AiOutlineStar } from 'react-icons/ai'
import { Carousel } from 'react-responsive-carousel'; 

function DashboardTopCafes() {
  const [ topCafes, setTopCafes ] = useState([]);
  const [ isLoading, setIsLoading ] = useState(false);
  const sortCafes = [...topCafes].sort((a, b) => b.averageRate - a.averageRate);
  useEffect(() => {
    setIsLoading(true);
    try {
      fetchTopCafes().then((res) => {
        setTopCafes(res);
        setIsLoading(false);
      })
    } catch(e) {
      console.log(e);
    }
  },[])

  return (
    <div className="font-primary xxxsm:mx-xxxsm mt-10 md:mt-36 lg:mx-48">
      <h1 className="text-white font-bold xxxsm: text-2xl md:text-4xl">Top 5 Cafes<hr></hr></h1>
      {
        isLoading ? 
        ( <CardSkeleton /> ) 
        : (
          <div className="xxxsm:flex flex-col gap-8 mt-14 md:grid grid-cols-3">
              {
                sortCafes.map((cafe, index) => {
                  return (
                    <div key={index}>
                      <div className="bg-white rounded-md xxxsm:p-4">
                        <img src={cafe.image} alt={cafe.name} className="w-full h-64 object-cover"/>
                        <div className="flex flex-row justify-between mt-10">
                          <h1 className="font-bold md:text-2xl">{cafe.name}</h1>
                            <div className="flex flex-row gap-3 items-center">
                              <h1 className="text-brown font-semibold">{cafe?.averageRate.toFixed(1)}</h1>
                              {
                                (() => {
                                  const stars = [];
                                  const rating = Math.floor(cafe.averageRate);
                                  for(let i = 0; i < rating; i++) {
                                    stars.push(<AiFillStar key={i} />);
                                  }
        
                                  for(let i = rating; i < 5; i++) {
                                    stars.push(<AiOutlineStar key={i} className="text-brown"/>);
                                  }
                                  return <div className="flex flex-row">{stars.map((star, index) => <span className="text-brown" key={index}>{star}</span>)}</div>;
                                })()
                              }
                          </div>
                        </div>
                        <p className="mt-2">{cafe.address}</p>
                      </div>
                    </div>
                  )
                })
              }
          </div>
        ) 
      }
    </div>
  )
}

export default DashboardTopCafes
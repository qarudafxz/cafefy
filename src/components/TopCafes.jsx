import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchTopCafes } from '../lib/fetchTopCafes.js';
import { MdRateReview } from 'react-icons/md';

function TopCafes() {
  const [ isLoading, setIsLoading ] = useState(false); 
  const [topCafes, setTopCafes] = useState([]);

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
    <div className="xxxsm:mx-xxxsm mt-16 flex flex-col gap-4">
      <h1 className="xxxsm: relative z-10 text-white font-primary text-xl font-semibold">🔥 Top 5 Rated Cafes</h1>
      <div className="xxxsm: grid grid-rows-5 gap-2">
        {
          isLoading ? <p>Loading...</p> : topCafes.map((cafe) => {
            return (
              <div className="flex flex-col shadow-3xl" key={cafe._id}>
                <Link to={`/cafe/${cafe._id}`}><img src={cafe.image} className="rounded-t-md w-full"/></Link>  
                <div className="bg-secondary p-4 rounded-b-md">
                  <div className='flex flex-row justify-between'>
                    <h1 className="xxxsm: relative z-10 text-cream font-primary text-xl font-semibold">{cafe.name}</h1> 
                    <MdRateReview className="xxxsm: relative z-10 text-white text-xl bg-primary p-1 rounded-md" size={24}/>
                  </div>
                  <p className="xxxsm: relative z-10 text-white font-primary text-xs">{cafe.desc}</p>
                  <div className="flex flex-row justify-between mt-4">
                    {
                      (cafe.numberOfRaters > 1) ? (
                        <p className="xxxsm: relative z-10 text-white font-primary text-xs">{cafe.numberOfRaters} reviews</p>
                      ) : (
                        <p className="xxxsm: relative z-10 text-white font-primary text-xs">{cafe.numberOfRaters} review</p>
                      )
                    }
                    <span className="text-white text-xs">{cafe.averageRate} <span className="text-yellow-400">⭐</span></span>
                  </div>
                </div>
              </div>
            )
          })
        }
        <div>

        </div>
      </div>
    </div>
  )
}

export default TopCafes
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchTopCafes } from '../lib/fetchTopCafes.js';
import { MdRateReview } from 'react-icons/md';
import { AiFillStar } from 'react-icons/ai';
import { MdLocationOn } from 'react-icons/md';
import 'react-loading-skeleton/dist/skeleton.css'
import CardSkeleton from '../components/CardSkeleton';

function TopCafes() {
  const [ isLoading, setIsLoading ] = useState(false); 
  const [topCafes, setTopCafes] = useState([]);
  const sortedCafes = [...topCafes].sort((a,b) => b.averageRate - a.averageRate);

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
      <div className="xxxsm: flex flex-col gap-2">
        
      { isLoading ? <CardSkeleton/> : (
         sortedCafes.map((cafe) => {
            return (
              <div className="flex flex-col shadow-3xl" key={cafe._id}>
                <Link to={`/cafe/${cafe._id}`}><img src={cafe.logo} className="rounded-t-md w-full"/></Link>  
                <div className="bg-secondary p-4 rounded-b-md">
                  <div className='flex flex-row justify-between'>
                    <h1 className="xxxsm: relative z-10 text-cream font-primary text-xl font-semibold mb-4">{cafe.name}</h1> 
                    <MdRateReview className="xxxsm: relative z-10 text-white text-xl bg-primary p-1 rounded-md" size={36}/>
                  </div>
                  <p className="xxxsm: relative z-10 text-white font-primary text-md">{cafe.desc.length >= 50 ? cafe.desc.slice(0,80).trim() + "..." : cafe.desc}</p>
                  <div className="mt-2 pl-2 py-1 flex flex-row gap-2 items-center bg-[#bd4d21] rounded-md text-white">
                    <MdLocationOn />
                    <p className="font-primary text-xs">{cafe.address}</p>
                  </div>
                  <div className="flex flex-row justify-between mt-4">
                    <p className="xxxsm: relative z-10 text-white font-primary text-xs">{`${cafe.numberOfRaters} ${cafe.numberOfRaters > 1 ? 'reviews' : 'review'}`}</p>
                    <div className="xxxsm: flex flex-row gap-2 items-center">
                      <span className="text-white text-xs">{cafe.averageRate.toFixed(1)}</span>
                      <AiFillStar className="text-yellow-400" size={14}/>
                    </div>
                  </div>
                </div>
              </div>
            )
          }) 
      )}
      </div>
    </div>
  )
}

export default TopCafes
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { buildUrl } from '../utils/buildUrl.js';
import GridCardSkeleton from './GridCardSkeleton';
import { IoLocationSharp } from 'react-icons/io5'
import { FiArrowUpRight } from 'react-icons/fi';

function Cafes() {
  const [ cafeData, setCafeData ] = useState([]);
  const [ isLoading, setIsLoading ] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(buildUrl('/cafes/'), {
        method: 'GET'
      })
      const data = await response.json();
      setCafeData(data);
      setIsLoading(false);
    } catch(err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);
  
  return (
    <div>
      {
        isLoading ? <GridCardSkeleton /> : (
          <div className="xxxsm:mx-xxxsm flex flex-col gap-4 mt-48 md:grid grid-cols-4 gap-2 xl:mx-56 gap-8" id="cafes">
            {
              cafeData?.map((cafe) => {
                return (
                  <div key={cafe._id} className="xxxsm: flex flex-col gap-4 bg-white rounded-md p-4 md:p-6 hover:bg-[#ebebeb] hover:scale-105 duration-200 ">
                    <Link 
                      to={`/cafe/${cafe.name}/${cafe._id}`} 
                      state={{ cafeID: cafe._id}}
                      className="w-full rounded-lg group"
                    >
                      <div class="relative group">
                        <img src={cafe.logo} class="w-full h-full object-cover" alt={cafe.name}/>
                        <div class="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity"></div>
                        <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <button class="bg-brown px-4 py-2 rounded-full flex items-center gap-1">
                            <span class="font-bold text-white">View Cafe</span>
                            <FiArrowUpRight className="text-white"/>
                          </button>
                        </div>
                      </div>
                    </Link>
                    <div className="flex flex-col gap-2">
                      <Link  
                        to={`/cafe/${cafe.name}/${cafe._id}`} 
                        state={{ cafeID: cafe._id}}
                        className="text-primary font-bold text-2xl"
                      >
                        {cafe.name}
                      </Link>
                      <p className="text-black text-xs font-semibold tracking-wide leading-4 text-ellipsis whitespace-nowrap overflow-hidden">{cafe.desc}</p>
                      <p className="text-black text-xs tracking-wide leading-4 flex gap-3 items-center"><IoLocationSharp size={20} className="text-md"/>{cafe.address}</p>
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

export default Cafes
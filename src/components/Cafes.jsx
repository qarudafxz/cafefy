import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { buildUrl } from '../utils/buildUrl.js';
import CardSkeleton from './CardSkeleton';
import { IoLocationSharp } from 'react-icons/io5'

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
        isLoading ? <CardSkeleton /> : (
          <div className="xxxsm: flex flex-col gap-4 mt-48" id="cafes">
            {
              cafeData.map((cafe) => {
                return (
                  <div key={cafe._id} className="xxxsm: flex flex-col gap-4 bg-white rounded-md p-4">
                    <Link 
                      to={`/cafe/${cafe.name}/${cafe._id}`} 
                      state={{ cafeID: cafe._id}}
                      className="w-full rounded-lg">
                        <img src={cafe.logo}/>
                      </Link>
                    <div className="flex flex-col gap-2">
                      <Link to={`/cafe/${cafe.id}`} className="text-primary font-bold text-2xl">{cafe.name}</Link>
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
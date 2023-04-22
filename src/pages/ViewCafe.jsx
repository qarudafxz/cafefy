import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { buildUrl } from '../utils/buildUrl.js';
import LoggedInNavbar from '../components/LoggedInNavbar';
import { AiFillStar } from 'react-icons/ai'; 
import { IoLocationSharp } from 'react-icons/io5'

function ViewCafe() {
  const { id: cafeID } = useParams();
  const [ cafeDeets, setCafeDeets ] = useState({});
  const stars = [];

  const getCafeDetails = async () => {
    try {
      const response = await fetch(buildUrl(`/cafes/cafe/${cafeID}`), {
        method: 'GET'
      })
      const details = await response.json();
      setCafeDeets(details)
    } catch(err) {
      throw new Error(err);
    }
  }

  useEffect(() => {
    getCafeDetails();
  }, [])

  return (
    <div className="font-primary">
      <LoggedInNavbar />
      <div className="xxxsm: mx-xxxsm flex flex-col gap-2">
        <img src={cafeDeets.image} className="rounded-lg"/>
        <h1 className="xxxsm: text-white text-5xl font-bold my-4">{cafeDeets.name}</h1>
        <p className="xxxsm: flex flex-row gap-3 items-center text-white text-xs border border-white rounded-md py-2 px-4 mb-6"><IoLocationSharp size={50}className="text-md"/>{cafeDeets.address}</p>
        <p className="text-white">{cafeDeets.desc}</p>
        <div className="flex flex-row items-center gap-4">
          {
            //Immediately invoked function
            (() => {
              const stars = [];
              for(let i = 0; i < Math.ceil(cafeDeets.averageRate); i++) {
                stars.push(<AiFillStar key={i} />);
              }
              return <div className="flex flex-row">{stars.map((star, index) => <span className="text-cream text-4xl" key={index}>{star}</span>)}</div>;
            })()
          }
          <div className="xxxsm: flex flex-col text-center text-white">
            <h1 className="font-bold text-2xl">{cafeDeets.averageRate}</h1>
            <p>Average</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ViewCafe
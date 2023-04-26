import React from 'react';
import { cafeStories } from '../data/cafeStories.js';
import Cup from '../assets/cup_bg.png';

function CafeStories() {
  
  return (
    <div className="xxxsm:mx-xxxsm xl:mt-48">
      <h1 className="xxxsm:font-primary font-bold text-white text-left py-3 px-7 mt-7 border border-white rounded-t-lg md:text-3xl">Top Cafe Stories</h1>
      <div className="flex flex-col gap-1 shadow-lg">

        {
          cafeStories.map(letter => {
            return (
              <div key={letter.id} className="flex items-center py-1 bg-white">
                <p className="pl-4 xxxsm:text-xs md:text-2xl">
                  {letter.desc}
                </p>
                <div className="w-5/12">
                  <img src={letter.image} className="w-full h-full object-cover pr-2 sm:w-full h-5/12" />
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default CafeStories
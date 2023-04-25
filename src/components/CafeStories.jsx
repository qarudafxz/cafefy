import React from 'react';
import { cafeStories } from '../data/cafeStories.js';
import Cup from '../assets/cup_bg.png';

function CafeStories() {
  
  return (
    <div className="xxxsm: mx-xxxsm xl:mt-48">
      <h1 className="xxxsm: font-primary font-bold text-white text-left py-3 px-7 mt-7 border border-white rounded-t-lg">Top Cafe Stories</h1>
      <div className="flex flex-col gap-1 shadow-lg">

        {
          cafeStories.map(letter => {
            return (
              <div key={letter.id} className="flex items-center">
                <p className="font-main text-xs text-primary bg-white p-2.5 w-7/12 xl:text-lg w-full">
                  {letter.desc}
                </p>
                <div className="w-5/12">
                  <img src={letter.image} className="h-full w-full object-cover border border-white xl:w-full h-auto" />
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
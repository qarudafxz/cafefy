import React from 'react'
import pic from '../assets/newsletter.svg';

function NewsLetter() {
  return (
    <div className="xxxsm: mx-xxxsm">
      <h1 className="xxxsm: font-primary font-bold text-white text-left py-3 px-7 mt-7 border border-white rounded-t-lg">📰 Newsletter</h1>
      <img src={pic} className="w-full"/>
      <div className="flex flex-col gap-4 p-4 bg-white rounded-b-lg shadow-md">
        <p>Get the best new coffee products in your inbox every day</p>
        <input type="email" required placeholder="Your email" className="pl-3 py-2 border border-gray-500 focus:outline-none"></input>
        <button className="py-2 px-3 bg-secondary rounded-md font-primary font-semibold text-white">SUBSCRIBE</button>
      </div>
    </div>
  )
}

export default NewsLetter
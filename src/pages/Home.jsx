import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Bg from "../assets/bg.svg";
import { getUserId } from "../helpers/getUserId.js";
import TopLoadingBar from "react-top-loading-bar";
import { motion, AnimatePresence } from "framer-motion";

import Navbar from "../components/Navbar";
import TopCafes from "../components/TopCafes";
import CafeStories from "../components/CafeStories";
import NewsLetter from "../components/NewsLetter";
import Footer from "../components/Footer";

const userID = getUserId();

function Home() {
	const [progress, setProgress] = useState(0);
	const location = useLocation();

	useEffect(() => {
		setProgress(20);
		setTimeout(() => {
			setProgress(100);
		});
	}, [location]);

	return (
		<div>
			<div className=''>
				<TopLoadingBar
					color='#8b2801'
					progress={progress}
					onLoaderFinished={() => setProgress(0)}
					height={4}
				/>
				<Navbar />
				<img
					src={Bg}
					className='absolute inset-0 object-cover xxxsm:h-max w-full xl:h-4/6'
				/>
				{/* Hero Section */}
				<div className='xxxsm:mx-xxxsm flex flex-col gap-6 md:mx-24 mt-2 xl:mx-56 mt-8'>
					<AnimatePresence>
						<motion.h1
							className='xxxsm:mt-6 relative font-primary text-4xl font-extrabold text-white sm:text-6xl md:text-7xl xxl:w-8/12'
							initial={{ opacity: 0, x: -100 }}
							animate={{ opacity: 1, x: 0 }}
							exit={{ opacity: 0, x: -100 }}
							transition={{ type: "spring", stiffness: 200, damping: 25 }}>
							Let’s explore and start cafe hopping.
						</motion.h1>
					</AnimatePresence>
					<p className='xxxsm:relative mt-2 font-primary text-sm text-white w-full sm:text-lg xxl:text-2xl mt-8'>
						Check out all the listed cafes we have from within{" "}
						<span className='font-bold'>Butuan City</span>, Philippines
					</p>
					<Link
						to='/cafes'
						className='text-center hover:bg-[#552b1a] duration-200 xxxsm:mt-4 relative font-primary text-md text-white font-bold bg-secondary py-2 rounded-md sm:w-5/12 md:w-3/12 xxl:w-2/12 py-4'>
						Find Cafes
					</Link>
				</div>
			</div>
			<div className='xxxsm: flex flex-col sm:grid grid-cols-2 md:mx-10 lg:mx-56 mt-20'>
				<TopCafes />
				<h1 className='text-xl font-bold block text-center text-white border border-[#8b2801] py-4 xsm:hidden'>
					Read article below
				</h1>
				<div className='xxxsm: mt-32 flex flex-col gap-4'>
					<CafeStories />
					<NewsLetter />
				</div>
			</div>
			<Footer />
		</div>
	);
}

export default Home;

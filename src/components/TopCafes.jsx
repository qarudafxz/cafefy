import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchTopCafes } from "../lib/fetchTopCafes.js";
import { MdRateReview } from "react-icons/md";
import { AiFillStar } from "react-icons/ai";
import { MdLocationOn } from "react-icons/md";
import "react-loading-skeleton/dist/skeleton.css";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { motion } from "framer-motion";

import Cup from "../assets/cup_bg.png";

function TopCafes() {
	const [isLoading, setIsLoading] = useState(false);
	const [topCafes, setTopCafes] = useState([]);
	const sortedCafes = [...topCafes].sort(
		(a, b) => b.averageRate - a.averageRate
	);

	const variants = {
		hidden: { opacity: 0, y: 50 },
		visible: { opacity: 1, y: 0 },
	};

	useEffect(() => {
		setIsLoading(true);
		try {
			fetchTopCafes().then((res) => {
				setTopCafes(res);
				setIsLoading(false);
			});
		} catch (e) {
			console.log(e);
		}
	}, []);

	return (
		<div className='xxxsm:hidden md:block xl:mt-72'>
			<h1 className='xxxsm: relative z-10 text-white font-primary text-xl font-semibold sm:text-2xl md:text-4xl font-bold mb-10'>
				🔥 Top 5 Rated Cafes
			</h1>
			<div className='xxxsm: flex flex-col gap-4'>
				{sortedCafes.map((cafe) => (
					<motion.div
						variants={variants}
						initial='hidden'
						animate='visible'
						transition={{ duration: 0.5 }}
						className='flex flex-col shadow-3xl sm:flex-row'
						style={{ height: "200px" }}
						key={cafe._id}>
						<Link to={`/cafe/${cafe.name}/${cafe._id}`}>
							<div
								style={{
									width: "200px",
									height: "200px",
									overflow: "hidden",
								}}>
								{isLoading ? (
									<SkeletonTheme
										color='#ebebeb'
										highlightColor='#f5f5f5'>
										<Skeleton
											height={200}
											width={200}
											duration={2}
										/>
									</SkeletonTheme>
								) : (
									<motion.img
										src={cafe.logo}
										className='rounded-l-md object-cover w-full h-full'
										whileHover={{ scale: 1.2 }}
										transition={{ duration: 0.3 }}
									/>
								)}
							</div>
						</Link>
						<div className='bg-secondary p-4 rounded-b-md w-full md:rounded-b-none rounded-r-md'>
							<div className='flex flex-row justify-between'>
								<Link to={`/cafe/${cafe.name}/${cafe._id}`}>
									<h1 className='hover:text-black duration-300 xxxsm:relative z-10 text-cream font-primary text-xl font-semibold mb-4 lg:text-3xl'>
										{cafe.name}
									</h1>
								</Link>
								<MdRateReview
									className='xxxsm:relative z-10 text-white text-xl bg-primary p-1 rounded-md'
									size={36}
								/>
							</div>
							<p className='xxxsm:relative z-10 text-white font-primary text-md'>
								{cafe.desc.length >= 50
									? cafe.desc.slice(0, 80).trim() + "..."
									: cafe.desc}
							</p>
							<div className='mt-2 pl-2 py-1 flex flex-row gap-2 items-center bg-[#bd4d21] rounded-md text-white'>
								<MdLocationOn />
								<p className='font-primary text-xs'>{cafe.address}</p>
							</div>
							<div className='flex flex-row justify-between mt-4'>
								<p className='xxxsm:relative z-10 text-white font-primary text-xs'>
									{`${cafe.numberOfRaters} ${
										cafe.numberOfRaters > 1 ? "reviews" : "review"
									}`}
								</p>
								<div className='xxxsm:flex flex-row gap-2 items-center'>
									<span className='text-white text-xs'>
										{cafe.averageRate.toFixed(1)}
									</span>
									<AiFillStar
										className='text-yellow-400'
										size={14}
									/>
								</div>
							</div>
						</div>
					</motion.div>
				))}
			</div>
		</div>
	);
}

export default TopCafes;

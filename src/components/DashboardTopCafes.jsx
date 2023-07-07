import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchTopCafes } from "../lib/fetchTopCafes";
import { AiFillStar } from "react-icons/ai";
import { AiOutlineStar } from "react-icons/ai";
import { FaUsers } from "react-icons/fa";
import { FiArrowUpRight } from "react-icons/fi";
import { motion } from "framer-motion";
import { Skeleton } from "@mui/material";

function DashboardTopCafes() {
	const [topCafes, setTopCafes] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const sortCafes = [...topCafes].sort((a, b) => b.averageRate - a.averageRate);
	useEffect(() => {
		setIsLoading(true);
		try {
			fetchTopCafes().then((res) => {
				setTopCafes(res);
				setTimeout(() => {
					setIsLoading(false);
				}, 2000);
			});
		} catch (e) {
			console.log(e);
		}
	}, []);

	return (
		<div className='font-primary xxxsm:mx-xxxsm mt-10 md:mt-36 lg:mx-48'>
			<h1 className='text-white font-bold xxxsm: text-2xl md:text-4xl'>
				Top 5 Cafes<hr></hr>
			</h1>

			<div className='xxxsm:flex flex-col gap-8 mt-14 md:grid grid-cols-3'>
				{sortCafes.map((cafe, index) => {
					return isLoading ? (
						<div className='flex flex-col'>
							<Skeleton
								variant='text'
								width={"100%"}
								height={500}
							/>

							<div className='flex gap-4'>
								<Skeleton
									variant='text'
									width={"100%"}
									height={60}
								/>
								<Skeleton
									variant='text'
									width={"100%"}
									height={60}
								/>
							</div>
							<Skeleton
								variant='text'
								width={"100%"}
								height={60}
							/>
						</div>
					) : (
						<Link
							to={`/cafe/${cafe.name}/${cafe._id}`}
							state={{ cafeID: cafe._id }}
							key={index}>
							<motion.div
								initial={{ opacity: 0, y: 50 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.5 }}
								className='bg-white rounded-md xxxsm:p-4'>
								<div className='relative group'>
									<img
										src={cafe.image}
										className='w-full h-48 object-cover'
										alt={cafe.name}
									/>

									<div className='absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity'></div>
									<div className='absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity'>
										<button className='bg-brown px-4 py-2 rounded-full flex items-center gap-1'>
											<span className='font-bold text-white'>View Cafe</span>
											<FiArrowUpRight className='text-white' />
										</button>
									</div>
								</div>
								<div className='flex flex-row justify-between mt-10'>
									<h1 className='font-bold md:text-2xl'>{cafe.name}</h1>

									<div className='flex flex-row items-center xxxsm:gap-2 xsm:gap-4 sm:gap-5 md:gap-6'>
										<div className='flex flex-row gap-2 items-center'>
											<FaUsers size={24} />
											<h1 className='font-bold'>{cafe.numberOfRaters}</h1>
										</div>

										<div className='flex flex-row gap-2 items-center'>
											<h1 className='text-brown font-semibold'>
												{cafe?.averageRate.toFixed(1)}
											</h1>
											{(() => {
												const stars = [];
												const rating = Math.floor(cafe.averageRate);
												for (let i = 0; i < rating; i++) {
													stars.push(<AiFillStar key={i} />);
												}

												for (let i = rating; i < 5; i++) {
													stars.push(
														<AiOutlineStar
															key={i}
															className='text-brown'
														/>
													);
												}
												return (
													<div className='flex flex-row'>
														{stars.map((star, index) => (
															<span
																className='text-brown'
																key={index}>
																{star}
															</span>
														))}
													</div>
												);
											})()}
										</div>
									</div>
								</div>
								<p className='mt-2'>{cafe.address}</p>
							</motion.div>
						</Link>
					);
				})}
			</div>
			{/* )} */}
		</div>
	);
}

export default DashboardTopCafes;

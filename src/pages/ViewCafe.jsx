import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import { buildUrl } from "../utils/buildUrl.js";
import LoggedInNavbar from "../components/LoggedInNavbar";
import Navbar from "../components/Navbar";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { IoLocationSharp } from "react-icons/io5";
import { BsThreeDotsVertical } from "react-icons/bs";
import { SESSION_TOKEN } from "../helpers/sessionToken.js";
import { getUserId } from "../helpers/getUserId.js";
import TopLoadingBar from "react-top-loading-bar";
import { CAFEFY_DEV } from "../private/cafefyDev.js";
import { motion } from "framer-motion";
import Cup from "../assets/icon.png";
// import Logo from "../assets/logo.png";
// import { FiAlertTriangle } from "react-icons/fi";

import { Skeleton } from "@mui/material";

function ViewCafe() {
	const [isLoading, setIsLoading] = useState(false);
	const [progress, setProgress] = useState(0);
	const { id: cafeID } = useParams();
	const [cafeDeets, setCafeDeets] = useState({});
	const session_token = SESSION_TOKEN;
	const userID = getUserId();
	const [disableBtn, setDisableBtn] = useState(false);
	const [isClicked, setIsClicked] = useState(false);
	const [edit, isEdit] = useState(false);
	const location = useLocation;
	const dev = CAFEFY_DEV;

	const getCafeDetails = async () => {
		// setIsLoading(true);
		try {
			const response = await fetch(buildUrl(`/cafes/cafe/${cafeID}`), {
				method: "GET",
			});
			const details = await response.json();
			setCafeDeets(details);
			setIsLoading(false);
		} catch (err) {
			throw new Error(err);
		}
	};

	const editRate = async () => {
		try {
		} catch (err) {
			console.error(err);
		}
	};

	const deleteRate = async (rate_id, e) => {
		try {
			e.preventDefault();
			setProgress(30);
			await fetch(buildUrl("/cafes/cafe/delete"), {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${session_token}`,
				},
				body: JSON.stringify({
					userId: userID,
					cafeId: cafeID,
					rateId: rate_id,
				}),
			});
			// Remove the deleted rating from the cafeDeets state
			setCafeDeets((prevCafeDeets) => {
				const updatedRaters = prevCafeDeets.raters.filter(
					(rate) => rate._id !== rate_id
				);
				return {
					...prevCafeDeets,
					raters: updatedRaters,
				};
			});
			setIsClicked(false);
			setProgress(100);
		} catch (err) {
			console.error(err);
		}
	};

	const deleteConfirmationComponent = (rate_id) => {
		return (
			<div>
				<TopLoadingBar
					color='#0043DC'
					progress={progress}
					height={10}
					onLoaderFinished={() => setProgress(0)}
				/>
				<div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex items-center justify-center backdrop-blur-md'>
					<motion.div
						initial={{ opacity: 0, scale: 0.5 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{
							duration: 0.8,
							delay: 0.5,
							ease: [0, 0.71, 0.2, 1.01],
						}}
						className='bg-white rounded-md px-28 py-14 place-items-center'>
						<img
							src={Cup}
							className='w-24 my-4 xxxsm:ml-12 xxsm:ml-28'
						/>
						<h1 className='font-bold text-5xl text-center mb-4'>Are you sure?</h1>
						<h1 className='text-md font-thin text-gray flex items-center justify-between'>
							Are you sure you want to delete this rate?
						</h1>
						<div className='flex flex-row gap-4 mt-8 place-content-center'>
							<button
								type='button'
								onClick={(e) => deleteRate(rate_id, e)}
								className='bg-primary py-2 px-8 rounded-md font-semibold text-white hover:bg-[#0032a8] duration-150'>
								Yes
							</button>
							<button
								type='button'
								onClick={() => setIsClicked(false)}
								className='border border-secondary py-2 px-8 rounded-md font-semibold text-secondary hover:bg-[#D5D5D5] duration-200'>
								No
							</button>
						</div>
					</motion.div>
				</div>
			</div>
		);
	};

	useEffect(() => {
		setIsLoading(true);
		setProgress(30);

		setTimeout(() => {
			setIsLoading(false);
			setProgress(100);
		}, 1000);
		getCafeDetails();
	}, [location]);

	useEffect(() => {
		setDisableBtn(
			userID && cafeDeets.raters?.find((rate) => rate.userId === userID)
		);

		document.title = `${cafeDeets.name} | Cafefy`;
	}, [cafeDeets]);

	return (
		<div>
			<TopLoadingBar
				color='#8b2801'
				progress={progress}
				onLoaderFinished={() => setProgress(0)}
			/>
			{!session_token ? <Navbar /> : <LoggedInNavbar />}
			<div className='xxxsm:flex flex-col gap-2 mb-14'>
				<div className='font-primary mx-xxxsm'>
					<div className='xxxsm:flex flex-col gap-2 sm:grid grid-cols-2 md:mx-40 gap-20 mt-8'>
						<div>
							{isLoading ? (
								<Skeleton
									height={500}
									width={"100%"}
								/>
							) : (
								<img
									src={cafeDeets.image}
									className='rounded-lg md:w-120'
								/>
							)}
							{isLoading ? (
								<Skeleton
									height={120}
									width={"100%"}
								/>
							) : (
								<h1 className='xxxsm: text-white text-5xl font-bold my-4 md:text-6xl'>
									{cafeDeets.name}
								</h1>
							)}

							{isLoading ? (
								<Skeleton
									height={40}
									width={"100%"}
								/>
							) : (
								<p className='xxxsm: flex flex-row gap-3 items-center text-white text-xs border border-white rounded-md py-2 px-4 mb-6 md:text-lg'>
									<IoLocationSharp
										size={50}
										className='text-md'
									/>
									{cafeDeets.address}
								</p>
							)}
							{isLoading ? (
								<Skeleton
									height={40}
									width={"100%"}
								/>
							) : (
								<p className='text-white md:text-2xl'>{cafeDeets.desc}</p>
							)}
							<div className='xxxsm: flex flex-row items-center justify-between mt-6'>
								{
									//Immediately invoked function
									isLoading ? (
										<Skeleton
											height={40}
											width={"100%"}
										/>
									) : (
										(() => {
											const stars = [];
											const rating = Math.floor(cafeDeets.averageRate);
											for (let i = 0; i < rating; i++) {
												stars.push(<AiFillStar key={i} />);
											}

											for (let i = rating; i < 5; i++) {
												stars.push(
													<AiOutlineStar
														key={i}
														className='text-cream'
													/>
												);
											}
											return (
												<div className='flex flex-row'>
													{stars.map((star, index) => (
														<span
															className='text-cream text-5xl'
															key={index}>
															{star}
														</span>
													))}
												</div>
											);
										})()
									)
								}
								{isLoading ? (
									<Skeleton
										height={40}
										width={"100%"}
									/>
								) : (
									<div className='xxxsm: flex flex-col text-center text-white'>
										<h1 className='font-bold text-2xl'>
											{cafeDeets?.averageRate?.toFixed(1)}
										</h1>
										<p>Average</p>
									</div>
								)}
							</div>
						</div>
						{/* Ratings and comments */}
						<div>
							<p className='xxxsm: text-md text-white font-semibold leading-5'>
								{cafeDeets.numberOfRaters}{" "}
								{cafeDeets.numberOfRaters <= 1 ? "User" : "Users"} have reviewed this
								cafe
							</p>
							<div className='xxxsm: flex flex-col gap-4 border border-white rounded-md p-2 mt-3'>
								<h1 className='text-cream font-bold text-2xl md:text-4xl shadow-2xl'>
									Ratings & Reviews
								</h1>
								<div className='md: flex flex-col gap-4 overflow-y-scroll h-[600px] scrollable-comments'>
									{cafeDeets.raters?.map((rate) => {
										return isLoading ? (
											<Skeleton
												height={450}
												width={"100%"}
											/>
										) : (
											<div
												key={rate._id}
												className='xxxsm: flex flex-col gap-4 bg-white rounded-md p-4'>
												<div className='flex flex-row gap-4'>
													{rate.userId === userID &&
														isClicked &&
														deleteConfirmationComponent(rate._id)}
													<Link
														to={`/users/${rate.userId}`}
														className='xxxsm: w-3/12 md:w-20'>
														<motion.div
															initial={{ opacity: 0, scale: 0.5 }}
															animate={{ opacity: 1, scale: 1 }}
															transition={{
																duration: 0.8,
																delay: 0.4,
																ease: [0, 0.71, 0.2, 1.01],
															}}>
															<img
																src={rate.userImage}
																className='rounded-full'
															/>
														</motion.div>
													</Link>
													<div className='flex flex-col'>
														<div className='flex xxxsm:flex-col md:flex-row gap-1 xl:justify-between'>
															<div className='flex gap-4'>
																<Link to={`/users/${rate.userId}`}>
																	<h1 className='hover:text-brown duration-200 xxxsm:font-bold text-primary text-sm md:text-xl'>
																		{rate.userName}
																	</h1>
																</Link>
																{rate.userId === dev && (
																	<div className='text-xs text-[#6d6d6d] border border-1 rounded-md py-1 px-3 flex flex-row gap-2 items-center cursor-help mb-2'>
																		<img
																			src={Cup}
																			className='w-4'
																		/>
																		Dev
																	</div>
																)}
															</div>
															{rate.userId === userID && (
																<BsThreeDotsVertical
																	className='mt-1 cursor-pointer'
																	size={20}
																	onClick={() => isEdit(!edit)}
																/>
															)}
															{edit && rate.userId === userID && (
																<div className='relative bg-white rounded-2xl shadow-md flex flex-col gap-2 p-4'>
																	<button
																		onClick={() => {}}
																		className='hover:bg-[#D5D5D5] w-full rounded-md duration-200 p-2'>
																		Edit Rate
																	</button>
																	<button
																		onClick={() => setIsClicked(!isClicked)}
																		className='hover:bg-[#D5D5D5] w-full rounded-md duration-200 p-2'>
																		Delete Rate
																	</button>
																</div>
															)}
														</div>
														<div className='flex flex-row gap-1 items-center'>
															<h1 className='text-xs md:text-xl'>{rate.rate}</h1>
															{(() => {
																const stars = [];
																const rating = Math.floor(rate.rate);
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
																				className='text-brown text-sm md:text-xl'
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
												<hr></hr>
												<p className='text-sm font-semibold'>{rate?.comment}</p>
												<p className='text-xs from-neutral-700'>
													{new Date(rate?.date).toLocaleDateString("en-US", {
														hour: "numeric",
														minute: "numeric",
														second: "numeric",
														hour12: true,
													})}
												</p>
											</div>
										);
									})}
								</div>
							</div>
							<div className='mt-10'>
								{disableBtn ? (
									<button className='disabled w-full xxxsm:bg-[#924729] mt-4 text-white text-md font-semibold rounded-md py-2 px-8'>
										You already wrote a review
									</button>
								) : (
									<Link
										to={`/review/${cafeID}`}
										state={{ cafeID: cafeID }}
										className='w-full xxxsm:bg-brown mt-4 text-white text-md font-semibold rounded-md py-2 px-8'>
										Write a review
									</Link>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ViewCafe;

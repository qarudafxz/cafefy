import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { buildUrl } from "../utils/buildUrl.js";
import { AiFillEdit, AiFillProfile } from "react-icons/ai";
import LoggedInNavbar from "../components/LoggedInNavbar";
import Navbar from "../components/Navbar.jsx";
import CardSkeletonProfile from "../components/CardSkeletonProfile";
import { AiFillStar } from "react-icons/ai";
import { SESSION_TOKEN } from "../helpers/sessionToken.js";
import { getUserID } from "../private/getUserID.js";
import { CAFEFY_DEV } from "../private/cafefyDev.js";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Profile() {
	const dev = CAFEFY_DEV;

	let { id: userID } = useParams();
	const [isLoading, setIsLoading] = useState(false);
	const [userDeets, setUserDeets] = useState({});
	const session_token = SESSION_TOKEN;
	const session_user_id = getUserID();

	const copyProfile = () => {
		navigator.clipboard.writeText(`https://cafefy.vercel.app/users/${userID}`);
		toast("✅ Profile copied to clipboard", {
			position: "top-center",
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: "dark",
		});
	};

	const getUserDetails = async () => {
		try {
			setIsLoading(true);
			const response = await fetch(buildUrl(`/users/profile/${userID}`));
			const details = await response.json();
			setUserDeets(details);
		} catch (e) {
			console.log(e);
		}
		setIsLoading(false);
	};

	useEffect(() => {
		getUserDetails();
	}, []);

	useEffect(() => {
		document.title = `${userDeets.firstName + " " + userDeets.lastName} | Cafefy`;
	}, [userDeets]);

	return (
		<div>
			<ToastContainer
				position='top-center'
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme='dark'
			/>
			{session_token ? <LoggedInNavbar /> : <Navbar />}
			{isLoading ? (
				<CardSkeletonProfile />
			) : (
				<div className='font-primary mb-10'>
					<img
						src={userDeets.bgCover}
						className='absolute -z-10 w-full object-cover xxxsm:h-32 sm:h-48'
						style={{
							backgroundPosition: "center center",
							backgroundSize: "cover",
						}}
					/>
					<img
						src={userDeets.profilePic}
						className='relative rounded-full border-[10px] border-[#131313] h-full m-auto xxxsm:w-32 top-[58px] sm:w-44 top-[70px] md:w-52 top-[74px]'
					/>
					<div className='xxxsm: flex flex-col'>
						{/* Edit button */}
						{session_user_id === userID && (
							<div className='xxxsm: flex flex-row gap-4 mt-32 place-content-center place-items-center'>
								<Link
									to='/profile/edit'
									className='flex flex-row gap-2 items-center bg-brown text-white font-medium px-4 py-2 rounded-full'>
									<AiFillEdit />
									Edit Profile
								</Link>
								<button
									to=''
									className='flex flex-row gap-2 items-center bg-brown text-white font-medium px-4 py-2 rounded-full'
									onClick={copyProfile}>
									<AiFillProfile />
									Share Profile
								</button>
							</div>
						)}
						<div
							className={`font-primary xxxsm: flex flex-col gap-6 ${
								session_user_id === userID ? "mt-12" : "mt-32"
							} m-xxxsm`}>
							<h1 className='xxxsm: text-white text-3xl font-bold text-center md:text-5xl'>
								{userDeets.firstName + " " + userDeets.lastName}
							</h1>
							{userDeets._id == dev && (
								<h1
									className='m-auto font-bold text-white border border-[#8b2801] rounded-full flex gap-3 items-center place-content-center xxxsm:w-full sm:w-6/12 lg:w-5/12 xl:w-3/12'
									id='color'>
									<img
										src='https://camo.githubusercontent.com/f7bd518a92e1206f7dd3cd5f16dabadb3df596b48ad7c44baae5a930f643c228/68747470733a2f2f63756c746f667468657061727479706172726f742e636f6d2f666c6167732f68642f6972616e706172726f742e676966'
										className='xxxsm:w-8 mb-2'
									/>
									Cafefy Dev
								</h1>
							)}
							<p className='text-sm leading-4 text-[#919191] text-center border border-[#4e4e4e] py-6 rounded-lg m-auto xxxsm:w-full sm:w-6/12 lg:w-5/12 xl:w-3/12'>
								{userDeets.bio}
							</p>
						</div>
						<div className='xxxsm: flex flex-row gap-16 text-center place-content-center text-white font-primary font-semibold mt-10'>
							<div className='xxxsm: flex flex-col'>
								<h1 className='xxxsm: text-6xl'>{userDeets.numberOfRatings}</h1>
								<h1 className='xxxsm: text-lg'>Ratings</h1>
							</div>
							<div>
								<h1 className='xxxsm: text-6xl'>{userDeets.numberOfReviews}</h1>
								<h1 className='xxxsm: text-lg'>Reviews</h1>
							</div>
						</div>
						{!userDeets.rates || userDeets.rates.length === 0 ? (
							<div className='xxxsm: flex flex-col gap-2 text-center mt-24 mx-xxxsm'>
								<p className='text-3xl font-bold text-white'>No ratings yet!</p>
								{session_token && (
									<button className='border-2 border-brown rounded-full py-2 text-white font-bold m-auto xxxsm:w-full sm:w-6/12 lg:w-5/12 xl:w-3/12'>
										Rate now
									</button>
								)}
							</div>
						) : (
							<div className='mt-14'>
								<h1 className='xxxsm: text-center text-3xl text-white font-bold'>
									Rates
								</h1>
								<div className='flex flex-col place-items-center gap-2 mt-4 font-primary'>
									{userDeets.rates.map((rate, id) => {
										return (
											<div
												key={id}
												className='flex'>
												<Link
													to={{
														pathname: `/cafe/${rate.cafeName}/${rate.cafeId}`,
														state: { cafeID: rate.cafeId },
													}}>
													<img
														src={rate.cafeLogo}
														alt={rate.cafeName}
														className='h-full object-cover'
														style={{
															width: "120px",
															height: "full",
														}}
													/>
												</Link>
												<div
													className='xxxsm:bg-white rounded-r-lg flex flex-col justify-between p-4 hover:bg-[#dadada] duration-200'
													style={{ width: "300px" }}>
													<div className='flex flex-row gap-2'>
														<Link
															to={{
																pathname: `/cafe/${rate.cafeName}/${rate.cafeId}`,
																state: { cafeID: rate.cafeId },
															}}
															className='xxxsm:font-semibold text-brown text-xs hover:text-black duration-200 sm:text-lg'>
															<h1>{rate.cafeName}</h1>
														</Link>
														<div className='xxxsm: flex flex-row gap-2 items-center'>
															<AiFillStar
																className='text-yellow-400'
																size={14}
															/>
															<span className='text-primary text-xs font-semibold'>
																{rate.rate}
															</span>
														</div>
													</div>
													<hr className='w-full'></hr>
													<p className='xxxsm: font-semibold text-xs text-ellipsis whitespace-nowrap overflow-hidden mt-4'>
														{rate.comment}
													</p>
													<p className='xxxsm: text-xs text-right mt-4'>
														{new Date(rate.date).toLocaleDateString("en-US", {
															hour: "numeric",
															minute: "numeric",
															second: "numeric",
															hour12: true,
														})}
													</p>
												</div>
											</div>
										);
									})}
								</div>
							</div>
						)}
					</div>
				</div>
			)}
		</div>
	);
}

export default Profile;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { buildUrl } from "../utils/buildUrl.js";
import GridCardSkeleton from "./GridCardSkeleton";
import { IoLocationSharp } from "react-icons/io5";
import { FiArrowUpRight } from "react-icons/fi";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { SESSION_TOKEN } from "../helpers/sessionToken.js";

function Cafes({ location, setProgress }) {
	const [cafeData, setCafeData] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [isClicked, setIsClicked] = useState({});
	const session_token = SESSION_TOKEN;

	const fetchData = async () => {
		setIsLoading(true);
		try {
			const response = await fetch(buildUrl("/cafes/"), {
				method: "GET",
			})
				.then((response) => response.json())
				.then((data) => setCafeData(data));

			setIsClicked(favorites);
			setCafeData(response.json());
		} catch (err) {
			console.log(err);
		}
	};

	const fetchDataIfLoggedIn = async () => {
		setIsLoading(true);
		try {
			const response = await fetch(buildUrl("/cafes/"), {
				method: "GET",
			});

			const data = await response.json();

			const getFavCafes = async () =>
				await fetch(buildUrl("/cafes/fave-cafes/"), {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						user_id: localStorage.getItem("userID") || "",
					}),
				}).then((res) => res.json());

			const favCafes = await getFavCafes();
			const favorites = {};

			data.forEach((cafe) => {
				if (
					favCafes.findIndex((favCafe) => cafe._id === favCafe.cafeId) !== -1
				) {
					favorites[cafe._id] = true;
				}
			});

			setIsClicked(favorites);
			setCafeData(data);
		} catch (err) {
			console.log(err);
		}
	};

	const LikeComponent = ({ id, ...props }) => {
		return isClicked[id] ? (
			<AiFillHeart {...props} />
		) : (
			<AiOutlineHeart {...props} />
		);
	};

	const handleFaveCafe = (id) => {
		setIsClicked((params) => {
			const updatedParams = structuredClone(params);

			updatedParams[id] =
				typeof updatedParams[id] === undefined ? true : !updatedParams[id];

			fetch(buildUrl("/cafes/update-fav-cafes"), {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					user_id: localStorage.getItem("userID") || "",
					cafe_id: id,
					is_deleting: !updatedParams[id],
				}),
			}).catch(console.log);

			return updatedParams;
		});
	};

	useEffect(() => {
		setProgress(30);
		fetchData();
		setTimeout(() => {
			setIsLoading(false);
			setProgress(100);
		}, 1000);
	}, [location]);

	useEffect(() => {
		if (session_token) fetchDataIfLoggedIn();
	}, [session_token]);

	return (
		<div>
			{isLoading ? (
				<GridCardSkeleton />
			) : (
				<div
					className='xxxsm:mx-xxxsm flex flex-col gap-4 mt-48 md:grid grid-cols-4 gap-2 xl:mx-56 gap-8'
					id='cafes'>
					{cafeData?.map((cafe) => {
						return (
							<div
								key={cafe._id}
								className='xxxsm: flex flex-col gap-4 bg-white rounded-md p-4 md:p-6 hover:bg-[#ebebeb] hover:scale-105 duration-200 '>
								<Link
									to={`/cafe/${cafe.name}/${cafe._id}`}
									state={{ cafeID: cafe._id }}
									className='w-full rounded-lg group'>
									<div className='relative group'>
										<img
											src={cafe.logo}
											className='w-full h-full object-cover'
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
								</Link>
								<div className='flex flex-col gap-2'>
									<div className='flex flex-row justify-between items-center'>
										<Link
											to={`/cafe/${cafe.name}/${cafe._id}`}
											state={{ cafeID: cafe._id }}
											className='text-primary font-bold text-2xl'>
											{cafe.name}
										</Link>
										{session_token && (
											<LikeComponent
												id={cafe._id}
												onClick={() => handleFaveCafe(cafe._id)}
												className='cursor-pointer'
												size={24}
											/>
										)}
									</div>
									<p className='text-black text-xs font-semibold tracking-wide leading-4 text-ellipsis whitespace-nowrap overflow-hidden'>
										{cafe.desc}
									</p>
									<p className='text-black text-xs tracking-wide leading-4 flex gap-3 items-center'>
										<IoLocationSharp
											size={20}
											className='text-md'
										/>
										{cafe.address}
									</p>
								</div>
							</div>
						);
					})}
				</div>
			)}
		</div>
	);
}

export default Cafes;

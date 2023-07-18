import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import LoggedInNavbar from "../components/LoggedInNavbar";
import StarRating from "../components/StarRating";
import { getUserId } from "../helpers/getUserId.js";
import { buildUrl } from "../utils/buildUrl.js";
import { SESSION_TOKEN } from "../helpers/sessionToken";
import { HiOutlinePencilAlt } from "react-icons/hi";
import Footer from "../components/Footer";

function Rate() {
	const navigate = useNavigate();
	const { id: cafeID } = useParams();
	const [rating, setRating] = useState(0);
	const [comment, setComment] = useState("");
	const [cafeDeets, setCafeDeets] = useState({});
	const session_token = SESSION_TOKEN;
	const userID = getUserId();

	const getCafeDetails = async () => {
		try {
			const response = await fetch(buildUrl(`/cafes/cafe/${cafeID}`));
			const details = await response.json();
			setCafeDeets(details);
		} catch (err) {
			console.log(err);
		}
	};

	const handleRating = async (e) => {
		e.preventDefault();
		try {
			await fetch(buildUrl(`/cafes/rate/${cafeID}`), {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					userId: userID,
					rate: rating,
					comment,
				}),
			});

			navigate(`/cafe/${cafeDeets.name}/${cafeID}`);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		if (!session_token) window.location.href = "/auth/login";

		getCafeDetails();
	}, []);

	useEffect(() => {
		document.title = `Rate ${cafeDeets.name} | Cafefy`;
	}, [cafeDeets]);
	return (
		<div className='font-primary'>
			<LoggedInNavbar />
			<div className='xxxsm: gap-4 bg-white rounded-lg mx-xxxsm p-4 sm:items-start flex flex-row md:mx-48 lg:mx-96'>
				<div className='xxxsm:flex flex-col gap-2 items-center sm:flex-col'>
					<div className='xxxsm:flex flex-row gap-5 mr-14'>
						<HiOutlinePencilAlt
							size={60}
							className='bg-brown rounded-md text-white pt-3 pl-2'
						/>
						<p className='xxxsm:w-4/12 leading-4 md:text-4xl lg:text-6xl'>
							Cafe{" "}
							<span className='text-brown font-bold text-lg md:text-4xl lg:text-6xl'>
								Review
							</span>
						</p>
					</div>
					<form
						onSubmit={handleRating}
						className='mt-6 md:mr-32 lg:mr-52'>
						<p className='xxxsm: text-xs md:text-2xl lg:text-4xl'>Cafe</p>
						<h1 className='xxxsm: text-2xl font-bold my-2 md:text-4xl lg:text-6xl'>
							{cafeDeets.name}
						</h1>
						<p className='xxxsm: my-2 md:text-2xl lg:text-4xl'>Rate</p>
						<StarRating
							setRating={setRating}
							rating={rating}
						/>
						<p className='xxxsm: my-2 md:text-2xl lg:text-4xl'>Review</p>
						<textarea
							className='outline rounded-md text-xs pl-2 py-2 w-full h-9/12 focus:border-none md:h-11/12 text-lg lg:text-xl'
							onChange={(e) => setComment(e.target.value)}></textarea>
						<button className='bg-brown text-white font-bold xxxsm:w-full py-2 rounded-md mt-4 lg:mt-20'>
							Submit
						</button>
					</form>
				</div>
				<div className='xxxsm: flex flex-col mt-10'>
					<img
						src={cafeDeets.logo}
						alt={cafeDeets.cafeName}
						className='xxxsm: mt-4 hidden sm:block w-[700px]'
					/>
				</div>
			</div>
			<Footer />
		</div>
	);
}

export default Rate;

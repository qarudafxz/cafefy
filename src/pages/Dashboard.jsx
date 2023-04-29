import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Illus from "../assets/illus.svg";
import { BiMouse } from "react-icons/bi";
import Cafes from "../components/Cafes";
import Footer from "../components/Footer";
import { SESSION_TOKEN } from "../helpers/sessionToken";
import { motion } from "framer-motion";

import TopLoadingBar from "react-top-loading-bar";
import LoggedInNavbar from "../components/LoggedInNavbar";
import Navbar from "../components/Navbar";
import DashboardTopCafes from "../components/DashboardTopCafes";

function Dashboard() {
	const session_token = SESSION_TOKEN;
	const [progress, setProgress] = useState(0);

	const location = useLocation();
	const username = localStorage.getItem("user");

	return (
		<div>
			{session_token ? <LoggedInNavbar /> : <Navbar />}
			<TopLoadingBar
				color='#8b2801'
				progress={progress}
				onLoaderFinished={() => setProgress(0)}
				height={4}
			/>
			<div
				className='mt-10xxxsm: flex flex-col gap-4 mx-xxxsm font-primary scroll-smooth sm:flex-row gap-10 xl:mx-56 xxl:gap-36'
				style={{ scrollBehavior: "smooth" }}>
				<motion.div
					animate={{ y: [0, 40, 0] }}
					transition={{ duration: 4, repeat: Infinity }}
					style={{ position: "relative" }}
					className='mt-4 sm:w-5/12 md:w-4/12'>
					<img src={Illus} />
				</motion.div>
				<div className={`xxxsm: flex flex-col ${!session_token && "mt-10"}`}>
					{session_token && (
						<h1 className='xxxsm:text-white border border-[#8b2801] mt-10 text-lg px-4 py-2 rounded-lg leading-5 sm:text-2xl'>
							👋 Welcome back!{" "}
							<span className='font-bold'>
								{session_token && username.replace('"', "").replace('"', "")}
							</span>
						</h1>
					)}
					<h1 className='xxxsm:text-4xl text-white font-bold leading-10 mt-4 xxsm:text-5xl xsm:text-6xl sm:text-5xl font-extrabold mb-4 leading-none xxl:text-8xl'>
						Looking for a cafe to chill?
					</h1>
					<p className='xxxsm:text-white font-medium xxl:text-3xl mt-4 w-9/12'>
						Check out all the listed cafes we have from within{" "}
						<span className='font-semibold'>Butuan City</span>, Philippines
					</p>
					<p className='xxxsm: text-white text-sm mt-12 xxl:text-xl'>
						<a
							href='#cafes'
							className='flex flex-row items-center gap-3 border border-white rounded-full py-2 place-content-center md:w-4/12'>
							<BiMouse /> Click to scroll
						</a>
					</p>
				</div>
			</div>
			<DashboardTopCafes setProgress={setProgress} />
			<h1 className='xxxsm:mx-xxxsm bg-brown text-white font-bold text-xl text-center py-2 px-3 rounded-lg relative xl:text-4xl py-5 top-40 xxl:mx-56'>
				Find cafes near you
			</h1>
			<Cafes
				location={location}
				setProgress={setProgress}
			/>
			<Footer />
		</div>
	);
}

export default Dashboard;

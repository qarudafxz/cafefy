import { buildUrl } from "../utils/buildUrl.js";

export const fetchTopCafes = async () => {
	try {
		const res = await fetch(buildUrl("/cafes/top-cafe"), {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});
		return res.json();
	} catch (err) {
		console.error(err);
	}
};

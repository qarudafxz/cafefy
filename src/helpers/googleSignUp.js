import jwt_decode from "jwt-decode";
import { buildUrl } from "../utils/buildUrl.js";

export const googleSignUp = async (response) => {
	const user = jwt_decode(response.credential);

	try {
		await fetch(buildUrl("/auth/googleSignup"), {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				firstName: user.given_name,
				lastName: user.family_name,
				email: user.email,
				password: "default",
				profilePic: user.picture,
			}),
		})
			.then((res) => res.json())
			.then((data) => {
				const token_expiration = new Date().getTime() + 5 * 60 * 1000; // 5 minutes
				sessionStorage.setItem("token", data.token);
				sessionStorage.setItem("token_expiration", token_expiration);
				sessionStorage.setItem(
					"user",
					JSON.stringify(`${data.user.firstName} ${data.user.lastName}`)
				);
				sessionStorage.setItem("userID", data.user._id);
				setTimeout(() => {
					window.location.href = "/cafes";
				}, 1500);
			});
	} catch (err) {
		console.log(err);
	}
};

export const fetchFirstName = async (id) => {
	try {
		const res = await fetch(`http://localhost:3000/users/name/${id}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});
		return res.json();
	} catch (err) {
		console.log(err);
	}
};

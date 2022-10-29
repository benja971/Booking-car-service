const form = document.querySelector("form");

form.addEventListener("submit", async (e) => {
	e.preventDefault();
	const formData = new FormData(form);
	const data = Object.fromEntries(formData);

	console.log(data);

	const res = await fetch("http://localhost:8080/cars/3/image", {
		method: "POST",
		body: formData,
		headers: {
			Authorization:
				"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQsInJvbGVJZCI6MiwiaWF0IjoxNjY3MDc3NjE5LCJleHAiOjE2NjcwODEyMTl9.3_5YZ7az9rJZ1FWuHT5oVtRejG7Tr2v4b_oNmH1Bwe4",
		},
	});

	const json = await res.json();

	console.log(json);
});

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
				"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQsInJvbGVJZCI6MiwiaWF0IjoxNjY3MDgyMjM1LCJleHAiOjE2NjcwODU4MzV9.RTgfW2uRVrJyYExUhOre1jwDNgmCydslTYf2y-LehWU",
		},
	});

	const json = await res.json();

	console.log(json);
});

const get = async () => {
	console.log(
		JSON.stringify({
			options: {
				brand: "Audi",
			},
		})
	);

	const res = await fetch("http://localhost:8080/cars", {
		method: "POST",
		body: JSON.stringify({
			brand: "Audi",
		}),
		headers: {
			Authorization:
				"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQsInJvbGVJZCI6MiwiaWF0IjoxNjY3MDgyMjM1LCJleHAiOjE2NjcwODU4MzV9.RTgfW2uRVrJyYExUhOre1jwDNgmCydslTYf2y-LehWU",
		},
	});

	console.log(res);

	const json = await res.json();

	console.log(json);
};

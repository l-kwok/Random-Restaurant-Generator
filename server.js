const express = require("express");
const dotenv = require("dotenv");
const axios = require("axios");
//temp to reduce api calls to google servers
const fs = require("fs");
const dummyData = require("./placesData.json");

const { Client } = require("@googlemaps/google-maps-services-js");

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;
// const googleMapsClient = new Client({}); //instantiate google maps client

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/api/places", (req, res) => {
	console.log(req.body);
	const request = req.body;
	if (request.foodType === "") {
		request.foodType = "restaurants";
	}
	// axios
	// 	.get(
	// 		`https://api.yelp.com/v3/businesses/search?term=${request.foodType}&latitude=${request.location.lat}&longitude=${request.location.lng}&limit=50`,
	// 		{
	// 			headers: {
	// 				Authorization: `Bearer ${process.env.API_KEY_YELP}`,
	// 			},
	// 		}
	// 	)
	// 	.then((response) => {
	// 		console.log(response.data);
	// 		res.send(response.data);
	// 		// fs.writeFile("placesData.json", JSON.stringify(response.data), (err) => {
	// 		// 	if (err) {
	// 		// 		throw err;
	// 		// 	}
	// 		// 	console.log("JSON data is saved.");
	// 		// });
	// 	})
	// 	.catch((e) => {
	// 		console.log(`Businesses API Error : ${e}`);
	// 	});
	res.send(dummyData);
});

app.listen(port, () => console.log(`Listening on port ${port}`));
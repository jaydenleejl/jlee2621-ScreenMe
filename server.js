/* 
server.js sets up a node.js server using the express web framework, reads movie data from the csv file,
serves the data through an API and updates the bookmark status of movies
*/

// creates the server using the express web framework for node.js
const express = require('express');
// parses incoming request bodies in a middleware before my handlers, available under the 'req.body' property
const bodyParser = require('body-parser');
// this module provides utilities for working with file and directory paths
const path = require('path');
const app = express();
const port = 3000;

// this module is used to prase my csv file
const csv = require('csv-parser');
// this module is used to interact with the file system
const fs = require('fs');
// this module is used to write data into csv file
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const results = [];

// this reads my main.csv file as a stream
fs.createReadStream('Database/main.csv')
	.pipe(csv()) // this pipes the stream into the csv parser
	.on('data', (data) => results.push(data)) // this event listener pushes each row of the parsed csv ino the 'results' array
	.on('end', () => { // this logs the 'results' array once the reading is completed
		console.log(results);
	});

// this serves the static files from my 'public' directory
app.use(express.static(path.join(__dirname, 'public')));
// this parses incoming JSON requests and puts the parsed data in 'req.body'
app.use(bodyParser.json());

// this route responds with the JSON data of the movies when a GET request is made to '/movies'
app.get('/movies', (req, res) => {
	res.json(results);
});

// this route updates the bookmark status of a movie when a POST request is made to '/bookmark'
app.post('/bookmark', (req, res) => {
	console.log(req.body);
	// this extracts the 'id' and 'bookmark' from the request body
	const {
		id,
		bookmark
	} = req.body;
	// this finds the movie with the given 'id'
	const movie = results.find(m => m.id == id);
	if (movie) {
		movie.bookmark = bookmark ? 'TRUE' : 'FALSE'; // this updates the bookmark status of the movie
		res.status(200).send('Bookmark updated successfully');
		// this sets up the csv writer to write the 'updated results' array back to the csv file
		const csvWriter = createCsvWriter({
			path: 'Database/main.csv',
			header: [{
					id: 'id',
					title: 'id'
				},
				{
					id: 'name',
					title: 'name'
				},
				{
					id: 'language',
					title: 'language'
				},
				{
					id: 'releaseDate',
					title: 'releaseDate'
				},
				{
					id: 'countryOfOrigin',
					title: 'countryOfOrigin'
				},
				{
					id: 'genre1',
					title: 'genre1'
				},
				{
					id: 'genre2',
					title: 'genre2'
				},
				{
					id: 'genre3',
					title: 'genre3'
				},
				{
					id: 'movieDescription',
					title: 'movieDescription'
				},
				{
					id: 'bookmark',
					title: 'bookmark'
				},
				{
					id: 'watched',
					title: 'watched'
				},
				{
					id: 'rating',
					title: 'rating'
				},
				{
					id: 'numberOfRatings',
					title: 'numberOfRatings'
				},
				{
					id: 'url',
					title: 'url'
				},
				{
					id: 'userID',
					title: 'userID'
				},
				{
					id: 'userRating',
					title: 'userRating'
				},
				{
					id: 'userReview',
					title: 'userReview'
				}
			]
		});
		// this writes the 'updated results' array to the csv file and logs a message when done
		csvWriter.writeRecords(results)
			.then(() => {
				console.log('...Done');
			});

	} else {
		res.status(404).send('Movie not found');
	}
});

// this starts the server and listens on port 3000
app.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`);
});
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = 3000;

const csv = require('csv-parser');
const fs = require('fs');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const results = [];

fs.createReadStream('Database/main.csv')
	.pipe(csv())
	.on('data', (data) => results.push(data))
	.on('end', () => {
		console.log(results);
	});

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

app.get('/movies', (req, res) => {
	res.json(results);
});

app.post('/bookmark', (req, res) => {
	console.log(req.body);
	const {
		id,
		bookmark
	} = req.body;
	const movie = results.find(m => m.id == id);
	if (movie) {
		movie.bookmark = bookmark ? 'TRUE' : 'FALSE';
		res.status(200).send('Bookmark updated successfully');
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

		csvWriter.writeRecords(results)
			.then(() => {
				console.log('...Done');
			});

	} else {
		res.status(404).send('Movie not found');
	}
});

app.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`);
});
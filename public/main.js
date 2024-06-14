/* 
main.js handles the front-end logic for displaying movies, navigating between different sections,
updating bookmarks and dynamically generating HTML content based on the movie data
*/

// this sets up an event listener that runs when the DOM content is fully loaded
// it initialises variables to store references to DOM elements and fetches movie data from the server
document.addEventListener('DOMContentLoaded', () => {
	const mainContent = document.getElementById('main-content');
	const navHome = document.getElementById('nav-home');
	const navInsights = document.getElementById('nav-insights');
	const navWatchlist = document.getElementById('nav-watchlist');
	const genreCounts = {};

	let lastScreen = 'home';
	let originalHeaderDisplay = 'flex';
	let originalFooterDisplay = 'block';

	fetch('/movies')
		.then(response => response.json())
		.then(movies => {
			// function to load the 'Home Screen' content
			// displaying various sections like "Explore, For You, New this week and Top Rated of the week" using the fetched movie data
			// it creates HTML for each section dynamically based on the movie data, including genres and bookmark status
			// it calls 'bindBookmarkEvents() and bindMovieItemEvents()' to bind event listeners to the bookmark buttons and movie items
			function loadHomeScreen(movies) {
				let exploreBannerHTML = '';

				let exploreBannerMovies = movies.slice(17, 18);
				for (let h = 0; h < exploreBannerMovies.length; h++) {
					const movie = exploreBannerMovies[h];
					let genres = '';
					if (movie.genre1 !== 'null') {
						genres += `<button>${movie.genre1}</button>`;
					}
					if (movie.genre2 !== 'null') {
						genres += `<button>${movie.genre2}</button>`;
					}
					if (movie.genre3 !== 'null') {
						genres += `<button>${movie.genre3}</button>`;
					}
					const bookmarkClass = movie.bookmark === 'TRUE' ? 'active' : '';
					exploreBannerHTML += `
                        <div class="background-image explore-section-banner">
                        <img src="${movie.url}" alt="${movie.name}">
                            <button class="bookmark ${bookmarkClass}" data-movie-id="${movie.id}"><i class="fas fa-bookmark"></i></button>
                            <div class="content-group">
                                <div class="tags">
                                    ${genres}
                                </div>
                                <h3>${movie.name}</h3>
                                <div class="buttons">
                                    <button class="info-button movie-item" data-movie-id="${movie.id}">More Info</button>
                                </div>
                            </div>
                        </div>
                    `;
				}

				let exploreCarouselHTML = '';

				let tempMovies = movies.slice(0, 3);
				for (let i = 0; i < tempMovies.length; i++) {
					const movie = tempMovies[i];
					let genres = '';
					if (movie.genre1 !== 'null') {
						genres += `<button>${movie.genre1}</button>`;
					}
					if (movie.genre2 !== 'null') {
						genres += `<button>${movie.genre2}</button>`;
					}
					if (movie.genre3 !== 'null') {
						genres += `<button>${movie.genre3}</button>`;
					}
					const bookmarkClass = movie.bookmark === 'TRUE' ? 'active' : '';
					exploreCarouselHTML += `
                        <div class="movie-container movie-item" data-movie-id="${movie.id}">
                            <img src="${movie.url}" alt="${movie.name}">
                            <div class="tags">
                                ${genres}
                            </div>
                            <h3>${movie.name}</h3>
                            <div class="rating">
                                <i class="fas fa-star"></i> ${movie.rating} (${movie.numberOfRatings})
                            </div>
                            <button class="bookmark ${bookmarkClass}" data-movie-id="${movie.id}"><i class="fas fa-bookmark"></i></button>
                        </div>
                    `;
				}

				let forYouCarouselHTML = '';

				let forYouMovies = movies.slice(4, 7);
				for (let j = 0; j < forYouMovies.length; j++) {
					const movie = forYouMovies[j];
					let genres = '';
					if (movie.genre1 !== 'null') {
						genres += `<button>${movie.genre1}</button>`;
					}
					if (movie.genre2 !== 'null') {
						genres += `<button>${movie.genre2}</button>`;
					}
					if (movie.genre3 !== 'null') {
						genres += `<button>${movie.genre3}</button>`;
					}
					const bookmarkClass = movie.bookmark === 'TRUE' ? 'active' : '';
					forYouCarouselHTML += `
                    <div class="recommendation-container movie-item" data-movie-id="${movie.id}">
                        <div class="background-image">
                            <img src="${movie.url}" alt="${movie.name}">
                            <button class="bookmark ${bookmarkClass}" data-movie-id="${movie.id}"><i class="fas fa-bookmark"></i></button>
                            <div class="content-group">
                                <div class="tags">
                                    ${genres}
                                </div>
                                <h3>${movie.name}</h3>
                                <div class="rating">
                                    <i class="fas fa-star"></i> ${movie.rating} (${movie.numberOfRatings})
                                </div>
                            </div>
                        </div>
                    </div>
                    `;
				}

				let nTwCarouselHTML = '';

				let nTwMovies = movies.slice(8, 11);
				for (let k = 0; k < nTwMovies.length; k++) {
					const movie = nTwMovies[k];
					let genres = '';
					if (movie.genre1 !== 'null') {
						genres += `<button>${movie.genre1}</button>`;
					}
					if (movie.genre2 !== 'null') {
						genres += `<button>${movie.genre2}</button>`;
					}
					if (movie.genre3 !== 'null') {
						genres += `<button>${movie.genre3}</button>`;
					}
					const bookmarkClass = movie.bookmark === 'TRUE' ? 'active' : '';
					nTwCarouselHTML += `
                    <div class="new-week-container movie-item" data-movie-id="${movie.id}">
                        <div class="background-image">
                            <img src="${movie.url}" alt="${movie.name}">
                            <button class="bookmark ${bookmarkClass}" data-movie-id="${movie.id}"><i class="fas fa-bookmark"></i></button>
                            <div class="content-group">
                                <div class="tags">
                                    ${genres}
                                </div>
                                <h3>${movie.name}</h3>
                                <div class="rating">
                                    <i class="fas fa-star"></i> ${movie.rating} (${movie.numberOfRatings})
                                </div>
                            </div>
                        </div>
                    </div>
                    `;
				}

				let tRoTwCarouselHTML = '';

				let tRoTwMovies = movies.slice(12, 15);
				for (let l = 0; l < tRoTwMovies.length; l++) {
					const movie = tRoTwMovies[l];
					let genres = '';
					if (movie.genre1 !== 'null') {
						genres += `<button>${movie.genre1}</button>`;
					}
					if (movie.genre2 !== 'null') {
						genres += `<button>${movie.genre2}</button>`;
					}
					if (movie.genre3 !== 'null') {
						genres += `<button>${movie.genre3}</button>`;
					}
					const bookmarkClass = movie.bookmark === 'TRUE' ? 'active' : '';
					tRoTwCarouselHTML += `
                    <div class="top-rated-container movie-item" data-movie-id="${movie.id}">
                    <img src="${movie.url}" alt="${movie.name}">
                        <div class="tags">
                            ${genres}
                        </div>
                        <h3>${movie.name}</h3>
                        <div class="rating">
                            <i class="fas fa-star"></i> ${movie.rating} (${movie.numberOfRatings})
                        </div>
                        <button class="bookmark ${bookmarkClass}" data-movie-id="${movie.id}"><i class="fas fa-bookmark"></i></button>
                    </div>
                    `;
				}

				mainContent.innerHTML = `
                    <h2>Explore</h2>
                    <div class="container explore-container">
                        ${exploreBannerHTML}
                    </div>
                    <div class="container carousel-container" id="explore-carousel">
                        <div class="carousel">
                            ${exploreCarouselHTML}
                        </div>
                    </div>
                    <h2>For You</h2>
                    <p class="watchlist-history">Here are some recommendations from your watchlist and history</p>
                    <div class="container carousel-container">
                        <div class="carousel watchlist-carousel">
                        ${forYouCarouselHTML}
                        </div>
                    </div>
                    <h2>New this week</h2>
                    <div class="container carousel-container">
                        <div class="carousel new-week-carousel">
                            ${nTwCarouselHTML}
                        </div>
                    </div>
                    <h2>Top Rated of the week</h2>
                    <div class="container carousel-container">
                        <div class="carousel">
                            ${tRoTwCarouselHTML}
                        </div>
                    </div>
                `;
				bindBookmarkEvents();
				bindMovieItemEvents();
				updateActiveNav(navHome); // sets the active navigation button to 'navHome'
				lastScreen = 'home'; // sets the last visited screen to 'home'
			}

			// Function to load the 'Insights Screen' content
			// generates HTML for each genre dynamically and updates the 'mainContent' with this HTML
			function loadInsightsScreen() {
				const sortedGenres = Object.keys(genreCounts).sort((a, b) => genreCounts[b] - genreCounts[a]);

				const genreHTML = sortedGenres.map(genre => `
                    <div class="genre-container">
                        <div class="genre">${genre}</div>
                        <div class="count">${genreCounts[genre]} movies</div>
                    </div>
                `).join('');

				mainContent.innerHTML = `
                    <h2>Insights</h2>
                    <p class="description">Here's a breakdown of your top genres based on our platform's tracking.</p>
                    <div class="container insights-container">
                        ${genreHTML}
                    </div>
                `;
				updateActiveNav(navInsights); // sets the active navigation button to 'navInsights'
				lastScreen = 'insights'; // sets the last visited screen to 'insights'
			}

			// Function to update genre counts (upon watching a movie)
			// it increments the count for each genre in the movie
			function updateGenreCounts(movie) {
				[movie.genre1, movie.genre2, movie.genre3].forEach(genre => {
					if (genre !== 'null') {
						if (genreCounts[genre]) {
							genreCounts[genre]++;
						} else {
							genreCounts[genre] = 1;
						}
					}
				});
				loadInsightsScreen(); // calls 'loadInsightsScreen()' to refresh the insights screen
			}

			// Function to load the 'Watchlist Screen' content
			// displaying the movies that have been bookmarked
			// it creates HTML for each bookmarked movie dynamically and updates the 'mainContent' with this HTML
			// it calls 'bindBookmarkEvents() and bindMovieItemEvents()' to bind event listeners to the bookmark buttons and movie items
			function loadWatchlistScreen() {
				let watchlistHTML = '';

				let bookmarkedMovies = movies.filter(movie => movie.bookmark === 'TRUE');
				for (let movie of bookmarkedMovies) {
					let genres = '';
					if (movie.genre1 !== 'null') {
						genres += `<button>${movie.genre1}</button>`;
					}
					if (movie.genre2 !== 'null') {
						genres += `<button>${movie.genre2}</button>`;
					}
					if (movie.genre3 !== 'null') {
						genres += `<button>${movie.genre3}</button>`;
					}

					watchlistHTML += `
                        <div class="watchlist-item movie-item" data-movie-id="${movie.id}">
                            <div class="watchlist-background-image">
                                <img src="${movie.url}" alt="${movie.name}">
                                <button class="watchlist-bookmark bookmark ${movie.bookmark === 'TRUE' ? 'active' : ''}" data-movie-id="${movie.id}"><i class="fas fa-bookmark"></i></button>
                                <div class="watchlist-content-group">
                                    <div class="watchlist-tags">
                                        ${genres}
                                    </div>
                                    <h3>${movie.name}</h3>
                                    <div class="watchlist-rating">
                                        <i class="fas fa-star"></i> ${movie.rating} (${movie.numberOfRatings})
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;
				}

				mainContent.innerHTML = `
                    <h2 class="watchlist-title">Watchlist</h2>
                    <p class="watchlist-description">Here’s a compilation of the movies you have bookmarked</p>
                    <div class="container watchlist-container">
                        ${watchlistHTML}
                    </div>
                `;
				bindBookmarkEvents();
				bindMovieItemEvents();
				updateActiveNav(navWatchlist); // sets the active navigation button to 'navWatchlist'
				lastScreen = 'watchlist'; // sets the last visited screen to 'watchlist'
			}

			// Function to load the 'Individual Movie Screen' content
			// displaying detailed information about the movie that the user selected
			// generates HTML for the movie details dynamically and updates the 'mainContent' with this HTML
			function loadIndividualMovieScreen(movieId) {
				const movie = movies.find(m => m.id === movieId);
				if (!movie) {
					console.error('Movie not found');
					return;
				}

				const genres = [movie.genre1, movie.genre2, movie.genre3]
					.filter(genre => genre !== 'null')
					.map(genre => `<button>${genre}</button>`)
					.join('');

				mainContent.innerHTML = `
                    <div class="container individual-movie-background">
                        <img src="${movie.url}" alt="${movie.name}">
                        <button class="back-button"><i class="fas fa-arrow-left"></i></button>
                        <button class="bookmark-button ${movie.bookmark === 'TRUE' ? 'active' : ''}" data-movie-id="${movie.id}"><i class="fas fa-bookmark"></i></button>
                        <div class="individual-movie-content-group">
                            <div class="individual-movie-tags">
                                ${genres}
                            </div>
                            <h3>${movie.name}</h3>
                            <p>${movie.movieDescription}</p>
                        </div>
                    </div>
                    <div class="details-container">
                        <h2>Details</h2>
                        <div class="detail-item">
                            <div class="detail-label">Release Date</div>
                            <div class="detail-value">${movie.releaseDate}</div>
                        </div>
                        <div class="detail-item">
                            <div class="detail-label">Country of Origin</div>
                            <div class="detail-value">${movie.countryOfOrigin}</div>
                        </div>
                        <div class="detail-item">
                            <div class="detail-label">Language</div>
                            <div class="detail-value">${movie.language}</div>
                        </div>
                    </div>
                    <div class="container impressions-container">
                        <h2>Impressions & Ratings</h2>
                        <div class="rating-overview">
                            <div class="rating-value">${movie.rating}</div>
                            <div>
                                <div class="rating-stars">
                                    ${'<i class="fas fa-star"></i>'.repeat(Math.floor(movie.rating))}
                                    ${movie.rating % 1 ? '<i class="fas fa-star-half-alt"></i>' : ''}
                                </div>
                                <div class="rating-count">${movie.numberOfRatings} ratings</div>
                            </div>
                        </div>
                        <div class="existing-reviews">
                            <div class="review-container">
                                <div class="user-profile">
                                    <img src="user-profile.jpg" alt="User Profile" class="user-profile-pic">
                                    <span class="username">${movie.userID}</span>
                                </div>
                                <div class="rating">
                                    <label>Rating</label>
                                    <div class="rating-stars">
                                        ${'<i class="fas fa-star"></i>'.repeat(Math.floor(movie.userRating))}
                                        ${movie.userRating % 1 ? '<i class="fas fa-star-half-alt"></i>' : ''}
                                    </div>
                                </div>
                                <div class="review">
                                    <label>Review</label>
                                    <p>${movie.userReview}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button class="watch-now-button">
                        <i class="fas fa-play play-icon"></i> Watch Now
                    </button>
                `;
				document.querySelector('header').style.display = 'none'; // hides the header
				document.querySelector('footer').style.display = 'none'; // hides the footer

				// sets up event listeners for the 'back-button' and 'watch-now' button, and binds the bookmark button event
				document.querySelector('.back-button').addEventListener('click', () => {
					if (lastScreen === 'home') {
						loadHomeScreen(movies);
					} else if (lastScreen === 'watchlist') {
						loadWatchlistScreen();
					} else if (lastScreen === 'insights') {
						loadInsightsScreen();
					}
					document.querySelector('header').style.display = originalHeaderDisplay;
					document.querySelector('footer').style.display = originalFooterDisplay;
				});

				document.querySelector('.watch-now-button').addEventListener('click', () => {
					alert('Thanks for watching!');
					updateGenreCounts(movie);
					loadHomeScreen(movies);
					document.querySelector('header').style.display = originalHeaderDisplay;
					document.querySelector('footer').style.display = originalFooterDisplay;
				});

				// Bookmark button event for Individual Movie screen
				const bookmarkButton = document.querySelector('.bookmark-button');
				bookmarkButton.addEventListener('click', (e) => {
					e.stopPropagation();
					bookmarkButton.classList.toggle('active');
					const isActive = bookmarkButton.classList.contains('active');
					const movieId = bookmarkButton.getAttribute('data-movie-id');
					fetch('/bookmark', {
							method: 'POST',
							headers: {
								'Content-Type': 'application/json'
							},
							body: JSON.stringify({
								id: movieId,
								bookmark: isActive
							})
						})
						.then(() => {
							movie.bookmark = isActive ? 'TRUE' : 'FALSE';
							updateWatchlist();
						})
						.catch(error => console.error('Error bookmarking movie:', error));
				});
			}

			// Function to update the active navigation button
			// this function works in the way by removing the 'active' class from all navigation buttons and adding it to the specified 'activeButton'
			function updateActiveNav(activeButton) {
				document.querySelectorAll('footer nav button').forEach(button => {
					button.classList.remove('active');
				});
				activeButton.classList.add('active');
			}

			// Function to bind event listeners to the bookmark buttons
			// toggling the bookmark status when clicked and sending a POST request to update the server
			function bindBookmarkEvents() {
				const bookmarks = document.querySelectorAll('.bookmark');

				bookmarks.forEach(bookmark => {
					bookmark.addEventListener('click', (e) => {
						e.stopPropagation();
						bookmark.classList.toggle('active');
						const isActive = bookmark.classList.contains('active');
						const movieId = bookmark.getAttribute('data-movie-id');
						fetch('/bookmark', {
								method: 'POST',
								headers: {
									'Content-Type': 'application/json'
								},
								body: JSON.stringify({
									id: movieId,
									bookmark: isActive
								})
							})
							.then(() => {
								const movie = movies.find(m => m.id === movieId);
								movie.bookmark = isActive ? 'TRUE' : 'FALSE';
								updateWatchlist();
							})
							.catch(error => console.error('Error bookmarking movie:', error));
					});
				});
			}

			// Function to bind event listeners to the movie items
			// loading the individual movie screen when a movie item is clicked
			function bindMovieItemEvents() {
				const movieItems = document.querySelectorAll('.movie-item');

				movieItems.forEach(movieItem => {
					movieItem.addEventListener('click', () => {
						const movieId = movieItem.getAttribute('data-movie-id');
						loadIndividualMovieScreen(movieId);
					});
				});
			}

			// Function to update the watchlist
			// re-rendering the bookmarked movies and re-binding event listeners to the updated elements
			function updateWatchlist() {
				const watchlistContainer = document.querySelector('.watchlist-container');
				if (!watchlistContainer) return; // If watchlist container is not present, exit

				let watchlistHTML = '';

				let bookmarkedMovies = movies.filter(movie => movie.bookmark === 'TRUE');
				for (let movie of bookmarkedMovies) {
					let genres = '';
					if (movie.genre1 !== 'null') {
						genres += `<button>${movie.genre1}</button>`;
					}
					if (movie.genre2 !== 'null') {
						genres += `<button>${movie.genre2}</button>`;
					}
					if (movie.genre3 !== 'null') {
						genres += `<button>${movie.genre3}</button>`;
					}

					watchlistHTML += `
                        <div class="watchlist-item movie-item" data-movie-id="${movie.id}">
                            <div class="watchlist-background-image">
                                <img src="${movie.url}" alt="${movie.name}">
                                <button class="watchlist-bookmark bookmark ${movie.bookmark === 'TRUE' ? 'active' : ''}" data-movie-id="${movie.id}"><i class="fas fa-bookmark"></i></button>
                                <div class="watchlist-content-group">
                                    <div class="watchlist-tags">
                                        ${genres}
                                    </div>
                                    <h3>${movie.name}</h3>
                                    <div class="watchlist-rating">
                                        <i class="fas fa-star"></i> ${movie.rating} (${movie.numberOfRatings})
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;
				}

				watchlistContainer.innerHTML = watchlistHTML;
				bindBookmarkEvents(); // Rebind bookmark events for the updated watchlist
				bindMovieItemEvents(); // Rebind movie item events for the updated watchlist
			}

			// Event listeners for navigation buttons
			// loads the respective screens when the navigation buttons are clicked
			navHome.addEventListener('click', () => loadHomeScreen(movies));
			navInsights.addEventListener('click', loadInsightsScreen);
			navWatchlist.addEventListener('click', loadWatchlistScreen);

			// Loads the home screen by default when the page is first loaded
			loadHomeScreen(movies);
		})
		.catch(error => console.error('Error fetching movies:', error));
});
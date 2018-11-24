require("dotenv").config();

var axios = require("axios");
// var spotifyKeys = require("keys.js");

// var spotify = new Spotify(keys.spotify);

let search = "";

function makeSearch() {
    search = process.argv[3]
    for (let i = 4; i < process.argv.length; i++) {
        search = search + " " + process.argv[i];
    }
}

if (process.argv[2] === "concert-this") {
    //Bands in Town API
    //Takes Artist Name
    //Gives Event Venue Name, Venue Location, Date
    makeSearch();
    axios
        .get("https://rest.bandsintown.com/artists/" + search + "/events?app_id=codingbootcamp")
        .then(function (response) {
            // If the axios was successful...
            // Then log the body from the site!
            for (let i = 0; i < response.data.length; i++) {
                console.log("--------------------------");
                console.log(response.data[i].venue.name);
                console.log(response.data[i].venue.city);
                console.log(response.data[i].datetime); 
                console.log("--------------------------");
            }

        })
        .catch(function (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an object that comes back with details pertaining to the error that occurred.
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error", error.message);
            }
            console.log(error.config);
        });
} else if (process.argv[2] === "spotify-this-song") {
    //Node-Spotify-API
    //Takes Song Name
    //Gives Artist, Song Name, Preview Link on Spotify, Album
    makeSearch();
} else if (process.argv[2] === "movie-this") {
    //OMDB API (trilogy)
    //Takes Movie Name
    //Gives Title, Year, IMDB Rating, RT Rating, Country, Language, Actors, Plot
    //Default "Mr. Nobody"


    makeSearch();


    // Then run a request with axios to the OMDB API with the movie specified
    axios.get("http://www.omdbapi.com/?t=" + search + "&y=&plot=short&apikey=trilogy").then(
        function (response) {
            console.log(
`
Title: ${response.data.Title},
Year: ${response.data.Year},
Rotten Tomatoes: ${response.data.Ratings[1].Value},
IMDB Rating: ${response.data.imdbRating},
Country: ${response.data.Country},
Language: ${response.data.Language},
Actors: ${response.data.Actors},
Plot: ${response.data.Plot},
`
            );
        }
    );

} else if (process.argv[2] === "do-what-it-says") {
    //Spotify-This-Song 
    //Use the text in the random.txt file though
    makeSearch();
}
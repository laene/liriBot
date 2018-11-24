require("dotenv").config();

const axios = require("axios");

const moment = require("moment");

// var Spotify = require("node-spotify-api");

// var spotifyKeys = require("./keys.js");

// var spotify = new Spotify({
//     id: spotifyKeys.id,
//     secret: spotifyKeys.secret
//   });

const Spotify = require('node-spotify-api');
const keys = require('./keys.js');
const spotify = new Spotify(keys.spotify);

//------------------------------------------

let search = "";
function makeSearch() {
    search = process.argv[3]
    for (let i = 4; i < process.argv.length; i++) {
        search = search + " " + process.argv[i];
    }
}

//------------------------------------------

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
                var date = response.data[i].datetime;
                date = moment().format("MM/DD/YYYY")
                console.log("--------------------------");
                console.log("Venue: " + response.data[i].venue.name);
                console.log("City: " + response.data[i].venue.city);
                console.log("Date: " + date);
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

    //------------------------------------------

} else if (process.argv[2] === "spotify-this-song") {
    //Node-Spotify-API
    //Takes Song Name
    //Gives Artist, Song Name, Preview Link on Spotify, Album
    makeSearch();
    spotify.search({ type: 'track', query: search }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
    
        console.log("Song Title: " + data.tracks.items[0].name); 
        console.log("Album: " + data.tracks.items[0].album.name); 
        console.log("Artist: " + data.tracks.items[0].artists[0].name);
        console.log("Release Year: " + data.tracks.items[0].album.release_date);
        console.log("Preview: " + data.tracks.items[0].external_urls.spotify);
      });
    //------------------------------------------

} else if (process.argv[2] === "movie-this") {
    //OMDB API (trilogy)
    //Takes Movie Name
    //Gives Title, Year, IMDB Rating, RT Rating, Country, Language, Actors, Plot
    //Default "Mr. Nobody"

    makeSearch();
    axios.get("http://www.omdbapi.com/?t=" + search + "&y=&plot=short&apikey=trilogy")
        .then(function (response) {
            console.log(
                `
Title: ${response.data.Title}
Year: ${response.data.Year}
Rotten Tomatoes: ${response.data.Ratings[1].Value}
IMDB Rating: ${response.data.imdbRating}
Country: ${response.data.Country}
Language: ${response.data.Language}
Actors: ${response.data.Actors}
Plot: ${response.data.Plot}
`
            );
        });

//------------------------------------------

} else if (process.argv[2] === "do-what-it-says") {
    //Spotify-This-Song 
    //Use the text in the random.txt file though
    makeSearch();
} else {
    console.log("That is not a valid command. Have a nice day!")
}
//------------------------------------------
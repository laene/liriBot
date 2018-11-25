require("dotenv").config();

const axios = require("axios");

const moment = require("moment");

var fs = require("fs");

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

let userCommand = process.argv[2];


function makeSearch() {
    search = process.argv[3]
    for (let i = 4; i < process.argv.length; i++) {
        search = search + " " + process.argv[i];
    }
}

//------------------------------------------

function findConcerts() {
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
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log("Error", error.message);
            }
            console.log(error.config);
        });
}
//------------------------------------------

function findSong() {
    spotify.search({ type: 'track', query: search }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        var releaseDate = data.tracks.items[0].album.release_date;
        releaseDate = moment().format("YYYY");

        console.log("Song Title: " + data.tracks.items[0].name);
        console.log("Album: " + data.tracks.items[0].album.name);
        console.log("Artist: " + data.tracks.items[0].artists[0].name);
        console.log("Release Year: " + releaseDate);
        console.log("Preview: " + data.tracks.items[0].external_urls.spotify);
    });
}

//------------------------------------------

function findMovie() {
    if (search === undefined) {
        search = "mr nobody";
        console.log("Have you seen Mr. Nobody? You should!");
    };
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


}

//------------------------------------------

function liriBotTime() {
    if (userCommand === "concert-this") {
        //Bands in Town API
        //Takes Artist Name
        //Gives Event Venue Name, Venue Location, Date

        makeSearch();
        findConcerts();

        //------------------------------------------

    } else if (userCommand === "spotify-this-song") {
        //Node-Spotify-API
        //Takes Song Name
        //Gives Artist, Song Name, Preview Link on Spotify, Album
        makeSearch();
        findSong();

        //------------------------------------------

    } else if (userCommand === "movie-this") {
        //OMDB API (trilogy)
        //Takes Movie Name
        //Gives Title, Year, IMDB Rating, RT Rating, Country, Language, Actors, Plot
        //Default "Mr. Nobody"

        makeSearch();
        findMovie();

        //------------------------------------------

    } else if (userCommand === "do-what-it-says") {
        //Spotify-This-Song 
        //Use the text in the random.txt file though
        fs.readFile("random.txt", "utf8", function (error, data) {
            if (error) {
                return console.log(error);
            }

            var dataArr = data.split(",");
            console.log(dataArr);

            userCommand = dataArr[0];
            search = dataArr[1];
            console.log(userCommand);
            console.log(search);
            
            if (userCommand === "spotify-this-song") {
                findSong();
            }

        });

    } else {
        console.log("That is not a valid command. Have a nice day!")
    }
}

//-----------------------------------------

liriBotTime();

// if (userCommand === "concert-this") {
//     //Bands in Town API
//     //Takes Artist Name
//     //Gives Event Venue Name, Venue Location, Date

//     makeSearch();
//     findConcerts();

//     //------------------------------------------

// } else if (userCommand === "spotify-this-song") {
//     //Node-Spotify-API
//     //Takes Song Name
//     //Gives Artist, Song Name, Preview Link on Spotify, Album
//     makeSearch();
//     findSong();

//     //------------------------------------------

// } else if (userCommand === "movie-this") {
//     //OMDB API (trilogy)
//     //Takes Movie Name
//     //Gives Title, Year, IMDB Rating, RT Rating, Country, Language, Actors, Plot
//     //Default "Mr. Nobody"

//     makeSearch();
//     findMovie();

//     //------------------------------------------

// } else if (userCommand === "do-what-it-says") {
//     //Spotify-This-Song 
//     //Use the text in the random.txt file though
//     fs.readFile("random.txt", "utf8", function (error, data) {
//         if (error) {
//             return console.log(error);
//         }

//         var dataArr = data.split(",");
//         console.log(dataArr);

//         userCommand = dataArr[0];
//         search = dataArr[1];
//         console.log(userCommand);
//         console.log(search);

//     });

// } else {
//     console.log("That is not a valid command. Have a nice day!")
// }
// //------------------------------------------
require("dotenv").config();

var spotifyKeys = require("keys.js");

var spotify = new Spotify(keys.spotify);

if (process.arvg[2] === "concert-this") {
    //Bands in Town API
    //Takes Artist Name
    //Gives Event Venue Name, Venue Location, Date
    var artist = process.argv[3];
    axios
    .get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")
} else if (process.argv[2] === "spotify-this-song") {
    //Node-Spotify-API
    //Takes Song Name
    //Gives Artist, Song Name, Preview Link on Spotify, Album
} else if (process.argv[2] === "movie-this") {
    //OMDB API (trilogy)
    //Takes Movie Name
    //Gives Title, Year, IMDB Rating, RT Rating, Country, Language, Actors, Plot
    //Default "Mr. Nobody"
} else if (process.argv[2] === "do-what-it-says") {
    //Spotify-This-Song 
    //Use the text in the random.txt file though
}
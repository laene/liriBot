# liriBot

## What is liriBot?

I created liriBot as part of the coursework for the coding bootcamp at University of Texas using Node.JS. The user can input commands through the terminal to search songs, concerts, and even movies. It can read txt files to take in commands as well.

## What technologies does liriBot use?

LiriBot utilizes Node.JS and a collection of other packages to run its search functions, including:
 dotenv
 fs
 axios
 moment
 node-spotify-api
 
 LiriBot also uses OMDB api and Bands in Town api.
 
 ## How do I use liriBot?
 
 First you need to navigate to the liriBot folder in the terminal.
 
 ![Start](/screenshots/step1.png)


### Search for Concerts

You can search for your favorite artist's upcoming shows by typing into the terminal and using the command "concert-this" followed by the band's name. I searched for pentatonix:
    node liri.js concert-this pentatonix
    
![Step 2](/screenshots/step2-concertthis.png)
Format: ![Alt Text](url)

### Search for Song Information

You can search for more information about a song using the command "spotify-this-song" followed by the song title. For Example:
    node liri.js spotify-this-song thunder
    
![Step 3](/screenshots/step3-spotifythis.png)
Format: ![Alt Text](url)

### Search for Movie Information

You can search for information about your favorite movies using the command "movie-this" followed by the movie title. I looked up the movie 10 Things I Hate About You:
    node liri.js movie-this 10 things i hate about you
    
![Step 4](/screenshots/step4-moviethis.png)
Format: ![Alt Text](url)

### Use a txt File Instead

You can also tell liriBot to do the commands listed in another file using the "do-what-it-says" command. Here's an example:

![Step 5](/screenshots/step5-thistext.png)
Format: ![Alt Text](url)

//__________________________________________________________
//GLOBAL VARIABLES
//__________________________________________________________
  var dotenv = require("dotenv").config();
  var axios = require("axios");
  var moment = require("moment");
  var Spotify = require('node-spotify-api');
  var fs = require("axios");
  var keys = require("./keys.js");
  var spotify = new Spotify(keys.spotify);

  

  var selection = process.argv[2];
  var request = process.argv[3];
//__________________________________________________________


//__________________________________________________________
// IF/ELSE STATEMENTS (FUNCTIONALITY)
//__________________________________________________________

  // OMDB API
  if(selection === "movie-this"){
    if (request === undefined || null){
      request = "mr nobody";
      console.log("If you haven't watched 'Mr. Nobody', then you should: http://www.imdb.com/title/tt0485947/");
      console.log("It's on Netflix!")
    }
    
  
  // Runs a request with axios to the OMDB API with the movie specified
  var queryUrl = "http://www.omdbapi.com/?t=" + request + "&y=&plot=short&apikey=trilogy";
  
  
  axios.get(queryUrl).then(
    function(response) {
   
      console.log("Title: " + response.data.Title);
      console.log("Release Year: " + response.data.Year);
      console.log("IMDB Rating: " + response.data.imdbRating);
      console.log(" Rotten Tomatoes Ratings: " + response.data.Ratings[1].Value);
      console.log("Country: " + response.data.Country);
      console.log("Language: " + response.data.Language);
      console.log("Plot: " + response.data.Plot);
      console.log("Actors: " + response.data.Actors);
      }
    );
  }

  // Bands In Town API
  else if(selection === "concert-this"){
    var queryUrl = "https://rest.bandsintown.com/artists/" + request + "/events?app_id=codingbootcamp";
    axios.get(queryUrl).then(
      function(response){

        for(let i = 0; i < response.data.length; i++){
          var venueName = response.data[i].venue.name;
          var venueCity = response.data[i].venue.city;
          var dateOfEvent = response.data[i].datetime;
              
          console.log("Name of Venue: " + venueName);
          console.log("Venue Location: " + venueCity);
          console.log("Date of the Event: " + moment(dateOfEvent).format("MMM Do YY"));
          console.log("--------------------------------" );
        }
      }
    );
  }

  // Spotify API
  else if(selection === "spotify-this-song"){
    if (request === undefined || null){
      request = "The Sign Ace of Base";
    }

    spotify.search({
      type: 'track',
      query: request
    }, function(err, data) {
      if(err) {
        return console.log('Error occurred: ' + err);
      }
      for(i=0; i < data.tracks.items.length; i++) {

        console.log(data.tracks.items[i].name);
        console.log(data.tracks.items[i].artists[0].name);
        console.log(data.tracks.items[i].album.name);
        console.log(data.tracks.items[i].preview_url);
        console.log("--------------------------------" );
    
      }
    })
  }

//__________________________________________________________


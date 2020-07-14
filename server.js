/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
'use strict';

// Art by Hayley Jane Wakenshaw

//     __
// ___( o)>
// \ <_. )
//  `---'   hjw
/* <Rubber duck says: Well then, lets go ahead and make sure to install super agent on the terminal etc */


const express = require('express'); // server
const cors = require('cors'); // bad bouncer
const superagent = require('superagent'); // gets stuff from API
const { json } = require('express');
require('dotenv').config(); // allows access to .env

//     __
// ___( o)>
// \ <_. )
//  `---'   hjw
/* Rubber duck says: Well then settup express to use */

// tell express to use the libaries
const app = express();
app.use(cors());

//might break code
// const { request, response } = require('express');


//     __
// ___( o)>
// \ <_. )
//  `---'   hjw
/* This is the port from the env file and an alternative route */
const PORT = process.env.PORT || 3001;


//     __
// ___( o)>   <Rubber duck says: the path just for the location.
// \ <_. )
//  `---'   hjw


app.get('/location', handleLocation);

function handleLocation(request, response){

  //     __
  // ___( o)>
  // \ <_. )
  //  `---'   hjw
  /* Rubber duck says: Use the refactored way */


  let city = request.query.city;
  // let geoData = require('./data/location.json');
  let url = `https://us1.locationiq.com/v1/search.php`;

  let queryParams = {
    key: process.env.GEO_DATA_API_KEY,
    q: city, // refers back to line 27
    format: 'json',
    limit: 1
  };

  // superagent is taking the query params and smashing them into the end of the url on line 29
  // the then get the results of the entire url
  superagent.get(url)
    .query(queryParams)
    .then(resultsFromSuperagent => {
      console.log('these are my results from superagent:', resultsFromSuperagent.body);
      let geoData = resultsFromSuperagent.body;
      const obj = new Location(city, geoData);
      response.send(obj);
    }).catch((error) => {
      console.log('ERROR', error);
      response.status(500).send('we messed up-sorry');
    });


}

function Location(location, geoData){
  this.search_query = location;
  this.formatted_query = geoData[0].display_name;
  this.latitude = geoData[0].lat;
  this.longitude = geoData[0].lon;
}

// turn it on
app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});

// app.get('/location', (request, response) => {

//   try{
//     let city = request.query.city;
//     let geoData = require('./data/location.json');

//     const obj = new Location(city, geoData);
//     // Art by Hayley Jane Wakenshaw

//     //     __
//     // ___( o)>   <Rubber duck says: request code 200: ok.
//     // \ <_. )
//     //  `---'   hjw
//     response.status(200).send(obj);
//   } catch(error){
//     console.log('ERROR', error);
//     // Art by Hayley Jane Wakenshaw

//     //     __
//     // ___( o)>   <Rubber duck says: error code 500- server side.
//     // \ <_. )
//     //  `---'   hjw
//     response.status(500).send('Sorry, something went wrong with your city');

//     // Art by Hayley Jane Wakenshaw

//     //     __
//     // ___( o)>   <Rubber duck says: We wont get this is the location is outside the scope of the json data
//     // \ <_. )
//     //  `---'   hjw

//   }
// });

// function Location(city, geoData){

//   this.search_query = city;
//   this.formatted_query = geoData[0].display_name;
//   this.latitude = geoData[0].lat;
//   this.longitude = geoData[0].lon;
// }

// //     __
// // ___( o)>   <Rubber duck says: This is for the weather, and its associated by the city data: no data
// // \ <_. )    in JSON nothing to display and an error.
// //  `---'   hjw

// app.get('/weather', (request, response) => {

//   let weatherData = require('./data/weather.json');
//   let info = [];

//   weatherData['data'].forEach(date => {
//     info.push(new Weather(date));
//   });
//   // 200  = ok
//   response.status(200).send(info);

// });

// function Weather(obj) {
//   this.forecast = obj.weather.description;
//   this.time = obj.datetime;
// }

// //==============================Errors=================================

// app.get('*', (request, response) => {
//   response.status(500).send('Sorry, we have an internal server error');
//   //     __
// // ___( o)>   <Rubber duck says: This wont work on firefox, and thus it might be working and not show up
// // \ <_. )     unless we use google chrome as a browser
// //  `---'   hjw
// });

// // ====================================================================
// // Turn on Server and Confirm Port

// app.listen(PORT, () => {
//   console.log(`listening on ${PORT}`);
// });
// //     __
// // ___( o)>   <Rubber duck says: this sets up the listener on the port AND we can see it in the terminal real time.
// // \ <_. )
// //  `---'   hjw

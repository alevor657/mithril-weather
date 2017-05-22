"use strict";

var m = require('mithril');

// var Autocomplete = require('./autocomplete');
// var Cache = require('./cache');

function parseSearchString(query) {
    var qArray = query.split(', ');
    return qArray;
}

// function parseToCacheName(str) {
//     return str.toLowerCase().trim().replace(/[, ]+/g, '');
// }

var Weather = {
    url: "http://api.wunderground.com/api/4d4b8173ec145418/conditions/q/",
    res: [],
    query: '',

    coordinates: [],

    getWeather: function () {
        var data = parseSearchString(Weather.query);
        var country = data[1];
        var city = data[0];

        // console.log("Url:");
        // console.log(Weather.url + country + '/' + city + '.json');

        m.request({
            method: "GET",
            url: Weather.url + country + '/' + city + '.json'
        })
        .then(function (result) {
            // console.log("RESULT");
            // console.log(result);

            if (!result.current_observation) {
                m.request({
                    method: "GET",
                    url: Weather.url + "zmw:" + result.response.results[0].zmw + ".json"
                })
                .then(function (result) {
                    Weather.res = result.current_observation;
                    // console.log("Corrected data:");
                    // console.log(Weather.res);
                });
            } else {
                Weather.res = result.current_observation;
                // console.log("Weather");
                // console.log(Weather.res);
            }
        });
    },

    getWeatherCoords: function () {
        var lat = Weather.coordinates[0];
        var long = Weather.coordinates[1];

        // console.log("Url:");
        // console.log(Weather.url + lat + "," + long + ".json");

        m.request({
            method: 'GET',
            url: Weather.url + lat + "," + long + ".json"
        })
        .then(function (result) {
            // console.log(result);
            Weather.query = result.current_observation.display_location.country + ", " + result.current_observation.display_location.city;
            Weather.res = result.current_observation;
        });
    }
};

module.exports = Weather;

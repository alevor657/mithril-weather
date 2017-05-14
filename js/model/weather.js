"use strict";

var m = require('mithril');

var Autocomplete = require('./autocomplete');

function parseSearchString(query) {
    console.log(query);
    var qArray = query.split(', ');
    console.log(qArray);
    return qArray;
}

var Weather = {
    url: "http://api.wunderground.com/api/4d4b8173ec145418/conditions/q/",
    res: [],
    query: '',

    getWeather: function () {
        var data = parseSearchString(Weather.query);
        var country = data[1];
        var city = data[0];

        m.request({
            method: "GET",
            url: Weather.url + country + '/' + city + '.json'
        })
        .then(function (result) {
            Weather.res = result;
            console.log("Weather");
            console.log(Weather.res);
        })
    }
}

module.exports = Weather;

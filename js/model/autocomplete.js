"use strict";

var m = require('mithril');

var Autocomplete = {
    res: [],
    key: "AIzaSyCxzEyZ2xCX2lPQNKjLCmb6jFyp5iYVgPI",
    query: "",

    url: "https://maps.googleapis.com/maps/api/place/autocomplete/json",

    // input=" + Autocomplete.query + "&types=geocode&key=" + Autocomplete.key,

    getVariants: function () {
        return m.request({
            url: Autocomplete.url,
            method: "GET",
            data: {
                input: Autocomplete.query,
                types: '(cities)',
                key: Autocomplete.key
            }
        })
        .then(function (result) {
            Autocomplete.res = result.predictions;
            console.log(Autocomplete.res);
        })
    }
}

module.exports = Autocomplete;

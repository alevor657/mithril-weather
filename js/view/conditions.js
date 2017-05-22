"use strict";

var m = require('mithril');

var Weather = require('../model/weather');
// var Autocomplete = require('../model/autocomplete');

// ℃
// &#8451;

function showDetails () {
    var sectionDetails = document.getElementsByClassName('weather_details')[0];
    var button = document.getElementsByClassName('weather_more_icon')[0];
    var detailsHeight = sectionDetails.clientHeight;

    if (button.classList.contains('toggled')) {
        sectionDetails.style.opacity = 0;
        sectionDetails.style.transform = "translateY(-" + detailsHeight + "px)";
        button.style.transform = "translate(-50%, 50%) rotateX(0deg)";
        button.classList.remove('toggled');
    } else {
        sectionDetails.style.opacity = 1;
        sectionDetails.style.transform = "translateY(0)";
        button.classList.add('toggled');
        button.style.transform = "translate(-50%,calc(" + detailsHeight + "px + 50%)) rotateX(180deg)";
    }
}

module.exports = {
    view: function () {
        return [
            m('section.weather_sum', [
                m('img.weather_ico', {src: Weather.res.icon_url}),
                m('h2.weather_text', Weather.res.weather),
                m('h1.weather_temp', m.trust(Weather.res.temp_c + "&#8451;")),
                m('div.weather_more_icon', {
                    onclick: function () {
                        showDetails();
                    }
                }, [
                    m('i.fa.fa-angle-double-down.fa-2x')
                ])
            ]),

            m('section.weather_details', [
                m('span.weather_feelslike', m.trust("Feels like " + Weather.res.feelslike_c + "&#8451;")),
                m('p.weather_humidity', "Humidity: " + Weather.res.relative_humidity),
                m('p.weather_wind', "Wind: " + Weather.res.wind_str),
                m('p.weather_visibility', "Visibility: " + Weather.res.visibility_km + " km"),
            ]),

            // m('section')
        ];
    }
};

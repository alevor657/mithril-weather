"use strict";
/*global navigator*/

var m = require('mithril');

var Weather = require('../model/weather');
var Autocomplete = require('../model/autocomplete');

function removeElements() {
    var img = document.getElementsByClassName('intro_image')[0];
    var fblock = document.getElementsByClassName('footer_block')[0];
    var ibutton = document.getElementsByClassName('intro_button')[0];
    var imgHeight = img.clientHeight;

    img.classList.add('fadeOutUp');
    img.addEventListener("animationend", function () {
        // img.style.display = "none";
        img.style.visibility = "hidden";
        ibutton.style.display = "block";
        fblock.style.transform = "translateY(-" + imgHeight + "px)";
    });
}

module.exports = {
    oninit: function () {
        console.log("Getting location...");

        navigator.geolocation.getCurrentPosition(function (res) {
                console.log("sucess");
                Weather.coordinates.push(res.coords.latitude);
                Weather.coordinates.push(res.coords.longitude);
            }, function (err) {
                console.log("error");
                console.log(err);
            }, {
                timeout: 8000,
                enableHighAccuracy: true,
                maximumAge: 0
            });
    },

    view: function () {
            return [
                    m('h1.intro_heading.animated.fadeInDownBig', 'Weather app'),
                    m('img.intro_image.animated.fadeInUpBig', {src: "img/weather.png"}),
                    // m("label.label", "Name"),
                    m('form.footer_block', {
                        onsubmit: function (event) {
                            event.preventDefault();
                        }
                    },
                    [
                        m('section.intro_geoloc', [
                            m('a.intro_geoloc', {
                                    oncreate: m.route.link,
                                    href: '#',
                                    onclick:  function (event) {
                                        event.preventDefault();
                                        Weather.getWeatherCoords();
                                        m.route.set("/conditions");
                                    }
                                }, 'Use your location'),
                            m('p.intro_or', "or")
                        ]),
                        m("input.intro_input[type=text][placeholder=Enter a city][list=cities]",
                        {
                            oninput: m.withAttr("value", function(value) {
                                Weather.query = value;
                                Autocomplete.query = value;
                                Autocomplete.getVariants();
                            }),
                            onfocus: function () {
                                removeElements();
                            },
                        }
                        ),
                        m('button.intro_button', {
                            onclick: function () {
                                Weather.getWeather();
                                m.route.set('/conditions');
                            }
                        }, 'Search'),
                        m('datalist[id=cities]', Autocomplete.res.map(function (item) {
                            // console.log(item);
                            return m('option', item.description);
                        })),

                    ])
                ];
        }
};

"use strict";

var m = require('mithril');

var Weather = require('../model/weather');
var Autocomplete = require('../model/autocomplete');

function removeElements() {
    var img = document.getElementsByClassName('intro_image')[0];
    var fblock = document.getElementsByClassName('footer_block')[0];
    var ibutton = document.getElementsByClassName('intro_button')[0];

    img.classList.add('fadeOutUp');
    img.addEventListener("animationend", function () {
        img.style.display = "none";
        ibutton.style.display = "block";
        // img.style.visibility = "hidden";
        // inp.style.position = "fixed";
        fblock.style.top = "200px";
    });
}

module.exports = {
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
                                onclick: navigator.geolocation.getCurrentPosition(function (res) {
                                        console.log("sucess");
                                        console.log(res);
                                    }, function (err) {
                                        console.log("error");
                                        console.log(err);
                                    }, {timeout:2000})
                            }, 'Use your location'
                        ),
                        m('p.intro_or', "or")
                    ]),
                    m("input.intro_input[type=text][placeholder=Enter your city][list=cities]",
                    {
                        oninput: m.withAttr("value", function(value) {
                            Weather.query = value;
                            Autocomplete.query = value;
                            // console.log(Autocomplete.query);
                            Autocomplete.getVariants();
                        }),
                    //     value: Rem.current.name
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
            ]
        }
};

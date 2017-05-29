"use strict";

var m = require('mithril');


var Weather = require('../model/weather');
var Cache = require('../model/cache');

module.exports = {
    view: function (vnode) {
        var place = Weather.res.observation_location ? Weather.res.observation_location.city : '';
        // console.log(place);

        return [
            m('main', [
                m('nav', [
                    m('a.main_logo', {oncreate: m.route.link, href: '/'}, 'Back'),
                    m('p.main_location', place),
                    m('i.fa.fa-floppy-o.main_cache', {
                        onclick: function () {
                            Cache.createCache();
                            this.classList.toggle('main_toggle_icon');
                        }
                    })
                ]),
                m('section.container', vnode.children)
            ])
        ];
    }
};

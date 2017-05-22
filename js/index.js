"use strict";

var m = require('mithril');

var Layout = require('./view/layout');
var Home = require('./view/home');
var Conditions = require('./view/conditions');

var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    onDeviceReady: function() {
        m.route(document.body, "/", {
            "/": {
                render: function() {
                    return m(Home);
                }
            },

            "/conditions": {
                render: function() {
                    return m(Layout, m(Conditions));
                }
            },

        });


    },
};

app.initialize();

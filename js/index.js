"use strict";

var m = require('mithril');

var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    onDeviceReady: function() {

        m.route(document.body, "/", {
            "/": {
                render: function() {
                    return m(Layout, m(Home));
                }
            },

            // asd
        });


    },
};

app.initialize();

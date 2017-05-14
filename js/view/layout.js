"use strict";

var m = require('mithril');

module.exports = {
    view: function (vnode) {
        return [
            m('main', [
                m('nav', [
                    m('a.main_logo', 'test')
                ]),
                m('section.container', vnode.children)
            ])
        ]
    }
};

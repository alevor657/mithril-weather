"use strict";

var m = require('mithril');

var Weather = require('./weather');

function parseToCacheName(str) {
    return str.toLowerCase().trim().replace(/[, ]+/g, '');
}
//
// function fail(err) {
//     console.log(err);
// }
//
// function readData(fileEntry) {
//     fileEntry.file(function(file) {
//         var reader = new FileReader();
//
//         reader.onloadend = function() {
//             console.log("Done reading file", this);
//             Weather.res = JSON.parse(this.result);
//             m.redraw();
//         }
//
//         reader.readAsText(file);
//     });
// }
//
// function getDataAndroid() {
//     window.resolveLocalFileSystemURL(LocalFileSystem.PERSISTENT, readData, fail)
// }
//
// function getDataBrowser() {
//     var fileNameBrowser = "cache.json";
//
//     m.request({
//         url: fileNameBrowser,
//         method: "GET"
//     })
//     .then(function (items) {
//         Weather.res = JSON.parse(items);
//     });
// }
//
// function loadData() {
//     var isAndroid = (device.platform === "Android");
//     if (isAndroid) {
//         getDataAndroid();
//     } else {
//         getDataBrowser();
//     }
// }

function readFile(fileEntry) {

    fileEntry.file(function (file) {
        var reader = new FileReader();

        reader.onloadend = function() {
            console.log("Successful file read: " + this.result);
        };

        reader.readAsText(file);

    }, fail);
}

function writeFile(fileEntry, dataObj) {
    fileEntry.createWriter(function (fileWriter) {
        console.log("fileWriter");
        console.log(fileWriter);

        fileWriter.onwriteend = function() {
            console.log("Successful file write...");
            readFile(fileEntry);
        };

        fileWriter.onerror = function (e) {
            console.log("Failed file write: " + e.toString());
        };

        // If data object is not passed in,
        // create a new Blob instead.

        if (!dataObj) {
            // dataObj = new Blob(Weather.res, { type: 'application/json' });
            dataObj = Weather.res;
        }

        console.log("dataObj");
        console.log(dataObj);

        fileWriter.write(dataObj);
    });
};

// function removeFile (filename) {
//     window.requestFileSystem(LocalFileSystem.PERSISTENT, 5 * 1024 * 1024, function (fs) {
//         fs.root.getFile(filename + ".json", { create: false }, function (fileEntry) {
//
//             fileEntry.remove(function (file) {
//                 console.log("removed file" + file);
//             }, fail)
//
//         }, fail);
//
//     }, function (err) {
//         console.log("Error");
//         console.log(err);
//     })
// };

var Cache = {
    createCache: function () {
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fs) {

            console.log('file system open: ' + fs.name);
            console.log(fs);

            var filename = parseToCacheName(Weather.query);
            // console.log("Worker string:");
            // console.log(Weather.query);
            // console.log(Weather.query.toLowerCase().trim().replace(/[, ]+/g, ''));

            fs.root.getFile(filename, { create: true, exclusive: false }, function (fileEntry) {

                console.log("fileEntry is file?" + fileEntry.isFile.toString());
                console.log(fileEntry);
                console.log("Filename: " + fileEntry.name);
                writeFile(fileEntry, null);

            }, fail);

        }, fail)
    },

    function readCache() {
        loadData();
    }
}

module.exports = Cache;

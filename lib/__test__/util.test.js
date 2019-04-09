"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ava_1 = require("ava");
var Util = require("../util");
ava_1.test('parseStackFromUrl', function (t) {
    var path = encodeURIComponent(JSON.stringify([]));
    var stack = Util.parseStackFromUrl("http://localhost:1234/" + path);
    t.deepEqual([], stack);
});

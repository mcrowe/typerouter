"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ava_1 = require("ava");
var Util = require("../util");
ava_1.test('parseRouteFromUrl', function (t) {
    var route = Util.parseRouteFromUrl('http://localhost:1234/Recipe?id=123');
    t.deepEqual({
        path: 'Recipe',
        params: { id: '123' }
    }, route);
});

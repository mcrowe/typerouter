"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UrlParse = require("url-parse");
function paramsToQueryString(obj) {
    var str = '';
    for (var key in obj) {
        if (str != '') {
            str += '&';
        }
        str += key + '=' + encodeURIComponent(obj[key]);
    }
    return str;
}
exports.paramsToQueryString = paramsToQueryString;
function parseRouteFromUrl(urlString) {
    var url = UrlParse(urlString, true);
    return {
        path: url.pathname.slice(1),
        params: url.query
    };
}
exports.parseRouteFromUrl = parseRouteFromUrl;

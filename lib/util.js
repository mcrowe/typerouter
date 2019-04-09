"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
function queryStringToParams(queryString) {
    var params = new URLSearchParams(queryString);
    var obj = {};
    for (var _i = 0, _a = params.entries(); _i < _a.length; _i++) {
        var entry = _a[_i];
        obj[entry[0]] = entry[1];
    }
    return obj;
}
exports.queryStringToParams = queryStringToParams;
function parseRouteFromUrl(urlString) {
    try {
        var url = new URL(urlString);
        return {
            path: url.pathname.slice(1),
            params: queryStringToParams(url.search)
        };
    }
    catch (_a) {
        return;
    }
}
exports.parseRouteFromUrl = parseRouteFromUrl;

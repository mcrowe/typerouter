"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function make(path, params) {
    return { path: path, params: params };
}
exports.make = make;
function serialize(route) {
    var path = route.path, params = route.params;
    var hasParams = Object.keys(params).length > 0;
    if (hasParams) {
        return path + "/?" + objectToUrlParams(params);
    }
    else {
        return path;
    }
}
exports.serialize = serialize;
function parse(str) {
    var parts = str.split('/');
    if (parts.length == 1) {
        return make(parts[0], {});
    }
    if (parts.length != 2) {
        return;
    }
    var path = parts[0], paramStr = parts[1];
    if (paramStr == '' || paramStr == '?') {
        return make(path, {});
    }
    if (paramStr[0] != '?') {
        return;
    }
    try {
        var params = urlParamsToObject(paramStr.substring(1));
        return make(path, params);
    }
    catch (_a) {
        return;
    }
}
exports.parse = parse;
function parseFromUrl(urlString) {
    try {
        var url = new URL(urlString);
        // Remove leading slash
        var pathname = url.pathname.substring(1);
        return parse(pathname + url.search);
    }
    catch (_a) {
        return;
    }
}
exports.parseFromUrl = parseFromUrl;
// See https://stackoverflow.com/a/8649003
function objectToUrlParams(obj) {
    var str = '';
    for (var key in obj) {
        if (str != '') {
            str += '&';
        }
        str += key + '=' + encodeURIComponent(obj[key]);
    }
    return str;
}
// See https://stackoverflow.com/a/8649003
function urlParamsToObject(str) {
    return JSON.parse('{"' + decodeURI(str).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}');
}

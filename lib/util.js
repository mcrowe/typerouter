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

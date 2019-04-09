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
// export function queryStringToParams(queryString: string): object {
//   console.log('qstp', queryString)
//   const params = new URLSearchParams(queryString)
//   const obj: object = {}
//   for (const entry of (params as any).entries()) {
//     console.log('entry', entry)
//     obj[entry[0]] = entry[1]
//   }
//   return obj
// }
function parseRouteFromUrl(urlString) {
    var url = UrlParse(urlString, true);
    return {
        path: url.pathname.slice(1),
        params: url.query
    };
}
exports.parseRouteFromUrl = parseRouteFromUrl;

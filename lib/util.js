"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function parseStackFromUrl(urlString) {
    var url = new URL(urlString);
    var path = url.pathname.slice(1);
    if (url.pathname == '') {
        return;
    }
    try {
        return JSON.parse(decodeURIComponent(path));
    }
    catch (e) {
        console.log('error parsing', e);
        return;
    }
}
exports.parseStackFromUrl = parseStackFromUrl;
function serializeStack(stack) {
    return '/' + encodeURIComponent(JSON.stringify(this.state.stack));
}
exports.serializeStack = serializeStack;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function pushHistoryPath(path) {
    if (NOT_BROWSER) {
        return;
    }
    window.history.pushState({}, undefined, path);
}
exports.pushHistoryPath = pushHistoryPath;
function setNavigationListener(listener) {
    if (NOT_BROWSER) {
        return;
    }
    window.onpopstate = function () {
        listener(window.location.href);
    };
}
exports.setNavigationListener = setNavigationListener;
function getUrl() {
    if (NOT_BROWSER) {
        return;
    }
    return window.location.href;
}
exports.getUrl = getUrl;
var NOT_BROWSER = typeof window == 'undefined';

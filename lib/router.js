"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var Util = require("./util");
var Router = /** @class */ (function (_super) {
    __extends(Router, _super);
    function Router(props) {
        var _this = _super.call(this, props) || this;
        _this.replace = function (path, params) {
            if (params === void 0) { params = {}; }
            var stack = _this.state.stack;
            var route = _this.makeRoute(path, params);
            stack[stack.length - 1] = route;
            _this.setStack(stack);
            var query = Util.paramsToQueryString(route.params);
            window.history.replaceState({}, undefined, "/" + route.path + "?" + query);
        };
        _this.replaceParams = function (params) {
            var route = _this.getCurrentRoute();
            _this.replace(route.path, params);
        };
        _this.push = function (path, params) {
            if (params === void 0) { params = {}; }
            var route = _this.makeRoute(path, params);
            var stack = _this.state.stack;
            stack.push(route);
            _this.setStack(stack);
            var query = Util.paramsToQueryString(route.params);
            window.history.pushState({}, undefined, "/" + route.path + "?" + query);
        };
        _this.pop = function () {
            var stack = _this.state.stack;
            if (stack.length < 2) {
                throw new Error("Cannot pop initial route");
            }
            window.history.back();
        };
        _this._onPopState = function () {
            var stack = _this.state.stack;
            stack.pop();
            _this.setStack(stack);
        };
        _this.setStack = function (stack) {
            _this.setState({ stack: stack }, _this._handleNavigate);
        };
        _this._handleNavigate = function () {
            _this.props.onNavigate && _this.props.onNavigate(_this.getCurrentRoute());
        };
        var initialRoute = Util.parseRouteFromUrl(window.location.href);
        _this.state = {
            stack: [initialRoute]
        };
        window.onpopstate = _this._onPopState;
        return _this;
    }
    Router.prototype.makeRoute = function (path, params) {
        return { path: path, params: params };
    };
    Router.prototype.getCurrentRoute = function () {
        var stack = this.state.stack;
        return stack[stack.length - 1];
    };
    Router.prototype.render = function () {
        var _a = this.props, routeMap = _a.routeMap, getSceneProps = _a.getSceneProps, homePath = _a.homePath;
        var route = this.getCurrentRoute();
        var path = route.path == '' ? homePath : route.path;
        var component = routeMap[path];
        if (!component) {
            throw new Error("Route not found " + route.path + ".");
        }
        var props = __assign({}, getSceneProps(this), { params: __assign({}, route.params) });
        return React.createElement(component, props);
    };
    return Router;
}(React.Component));
exports.default = Router;

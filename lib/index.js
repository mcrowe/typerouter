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
var Route = require("./route");
var Browser = require("./browser");
var Router = /** @class */ (function (_super) {
    __extends(Router, _super);
    function Router(props) {
        var _this = _super.call(this, props) || this;
        _this.go = function (path, params) {
            if (params === void 0) { params = {}; }
            var currentRoute = Route.make(path, params);
            _this.setState({ currentRoute: currentRoute });
            Browser.pushHistoryPath('/' + Route.serialize(currentRoute));
        };
        _this.replaceParams = function (params) {
            _this.go(_this.getCurrentRoute().path, params);
        };
        _this.getCurrentRoute = function () {
            return _this.state.currentRoute;
        };
        _this._handleBrowserNavigation = function (url) {
            var route = Route.parseFromUrl(url);
            if (route) {
                _this.setState({ currentRoute: route });
            }
        };
        _this._handleNavigate = function () {
            var onNavigate = _this.props.onNavigate;
            var currentRoute = _this.state.currentRoute;
            onNavigate && onNavigate(currentRoute);
        };
        Browser.setNavigationListener(_this._handleBrowserNavigation);
        var initialUrl = Browser.getUrl();
        var urlRoute = initialUrl && Route.parseFromUrl(initialUrl);
        var currentRoute;
        if (urlRoute && urlRoute.path != '') {
            currentRoute = urlRoute;
        }
        else {
            currentRoute = props.initialRoute;
        }
        _this.state = {
            currentRoute: currentRoute,
            hasError: false
        };
        return _this;
    }
    Router.getDerivedStateFromError = function () {
        return { hasError: true };
    };
    Router.prototype.componentDidCatch = function (error, info) {
        console.error('App Error:', error, info);
        this.setState({ hasError: true });
    };
    Router.prototype.render = function () {
        if (this.state.hasError) {
            return this.props.renderError(this);
        }
        var _a = this.props, routeMap = _a.routeMap, getSceneProps = _a.getSceneProps, renderNotFound = _a.renderNotFound;
        var currentRoute = this.state.currentRoute;
        var component = routeMap[currentRoute.path];
        if (!component) {
            return renderNotFound(this);
        }
        var props = __assign({}, getSceneProps(this), { params: __assign({}, currentRoute.params) });
        return React.createElement(component, props);
    };
    return Router;
}(React.Component));
exports.default = Router;

import * as React from 'react';
import { IRoute, IRouteMap } from './types';
interface IProps {
    initialRoute: IRoute;
    routeMap: IRouteMap;
    getSceneProps: (router: Router) => object;
    onNavigate?: (route: IRoute) => void;
    renderNotFound: (router: Router) => JSX.Element;
    renderError: (router: Router) => JSX.Element;
}
interface IState {
    currentRoute: IRoute;
    hasError: boolean;
}
export default class Router extends React.Component<IProps, IState> {
    constructor(props: IProps);
    static getDerivedStateFromError(): {
        hasError: boolean;
    };
    componentDidCatch(error: Error, info: any): void;
    go: (path: string, params?: object) => void;
    replaceParams: (params: object) => void;
    getCurrentRoute: () => IRoute;
    _handleBrowserNavigation: (url: string) => void;
    _handleNavigate: () => void;
    render(): JSX.Element;
}
export {};

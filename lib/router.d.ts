import * as React from 'react';
import { IRoute, IRouteMap } from './types';
interface IProps {
    homePath: string;
    routeMap: IRouteMap;
    getSceneProps: (router: Router) => object;
    onNavigate?: (route: IRoute) => void;
}
interface IState {
    stack: IRoute[];
}
export default class Router extends React.Component<IProps, IState> {
    constructor(props: IProps);
    replace: (path: string, params?: object) => void;
    replaceParams: (params: object) => void;
    push: (path: string, params?: object) => void;
    pop: () => void;
    _onPopState: () => void;
    setStack: (stack: IRoute[]) => void;
    _handleNavigate: () => void;
    makeRoute(path: string, params: object): IRoute;
    getCurrentRoute(): IRoute;
    render(): React.ReactElement<{}>;
}
export {};

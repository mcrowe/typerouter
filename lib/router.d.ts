import * as React from 'react';
import { IRoute, IRouteMap } from './types';
interface IProps<T extends IRouteMap> {
    initialRoute: IRoute;
    routes: T;
    getSceneProps: (router: Router<T>) => object;
    onNavigate?: (route: IRoute) => void;
}
interface IState {
    stack: IRoute[];
}
export default class Router<T extends IRouteMap> extends React.Component<IProps<T>, IState> {
    constructor(props: IProps<T>);
    replace: (path: string, params?: object) => void;
    replaceParams: (params: object) => void;
    push: (path: string, params?: object) => void;
    pop: () => void;
    setStack: (stack: IRoute[]) => void;
    _handleNavigate: () => void;
    makeRoute(path: string, params: object): IRoute;
    getCurrentRoute(): IRoute;
    render(): React.ReactElement<{}>;
}
export {};

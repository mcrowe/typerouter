/// <reference types="react" />
export interface INavigator {
    getCurrentRoute(): IRoute;
    go(path: string, params?: object): void;
}
export interface IRoute {
    path: string;
    params: object;
}
export interface IRouteMap {
    [path: string]: React.ComponentType;
}

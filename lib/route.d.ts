import { IRoute } from './types';
export declare function make(path: string, params: object): IRoute;
export declare function serialize(route: IRoute): string;
export declare function parse(str: string): IRoute | undefined;
export declare function parseFromUrl(urlString: string): IRoute | undefined;

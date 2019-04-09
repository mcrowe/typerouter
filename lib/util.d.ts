import { IRoute } from './types';
export declare function paramsToQueryString(obj: object): string;
export declare function queryStringToParams(queryString: string): object;
export declare function parseRouteFromUrl(urlString: string): IRoute | undefined;

import { IRoute } from './types';
export declare function parseStackFromUrl(urlString: string): IRoute[] | undefined;
export declare function serializeStack(stack: IRoute[]): string;

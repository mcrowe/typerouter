import * as UrlParse from 'url-parse'
import { IRoute } from './types'

export function paramsToQueryString(obj: object): string {
  let str = ''
  for (let key in obj) {
    if (str != '') {
      str += '&'
    }
    str += key + '=' + encodeURIComponent(obj[key])
  }
  return str
}

// export function queryStringToParams(queryString: string): object {
//   console.log('qstp', queryString)
//   const params = new URLSearchParams(queryString)
//   const obj: object = {}

//   for (const entry of (params as any).entries()) {
//     console.log('entry', entry)
//     obj[entry[0]] = entry[1]
//   }

//   return obj
// }

export function parseRouteFromUrl(urlString: string): IRoute | undefined {
  const url = UrlParse(urlString, true)

  return {
    path: url.pathname.slice(1),
    params: url.query
  }
}
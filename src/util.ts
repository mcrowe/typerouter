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

export function queryStringToParams(queryString: string): object {
  const params = new URLSearchParams(queryString)
  const obj: object = {}

  for (const entry of (params as any).entries()) {
    obj[entry[0]] = entry[1]
  }

  return obj
}

export function parseRouteFromUrl(urlString: string): IRoute | undefined {
  try {
    const url = new URL(urlString)

    return {
      path: url.pathname,
      params: queryStringToParams(url.search)
    }
  } catch {
    return
  }
}
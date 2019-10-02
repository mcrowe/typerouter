import { IRoute } from './types'

export function make(path: string, params: object): IRoute {
  return { path, params }
}

export function serialize(route: IRoute): string {
  const { path, params } = route

  const hasParams = Object.keys(params).length > 0

  if (hasParams) {
    return `${path}/?${objectToUrlParams(params)}`
  } else {
    return path
  }
}

export function parse(str: string): IRoute | undefined {
  const parts = str.split('/')

  if (parts.length == 1) {
    return make(parts[0], {})
  }

  if (parts.length != 2) {
    return
  }

  const [path, paramStr] = parts

  if (paramStr == '' || paramStr == '?') {
    return make(path, {})
  }

  if (paramStr[0] != '?') {
    return
  }

  try {
    const params = urlParamsToObject(paramStr.substring(1))
    return make(path, params)
  } catch {
    return
  }
}

export function parseFromUrl(urlString: string): IRoute | undefined {
  try {
    const url = new URL(urlString)
    // Remove leading slash
    const pathname = url.pathname.substring(1)
    return parse(pathname + url.search)
  } catch {
    return
  }
}

// See https://stackoverflow.com/a/8649003
function objectToUrlParams(obj: object): string {
  let str = ''
  for (let key in obj) {
    if (str != '') {
      str += '&'
    }
    str += key + '=' + encodeURIComponent((obj as any)[key])
  }

  return str
}

// See https://stackoverflow.com/a/8649003
function urlParamsToObject(str: string): object {
  return JSON.parse('{"' + decodeURI(str).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}')

}
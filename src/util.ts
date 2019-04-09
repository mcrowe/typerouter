import { IRoute } from './types'

export function parseStackFromUrl(urlString: string): IRoute[] | undefined {
  const url = new URL(urlString)

  const path = url.pathname.slice(1)

  if (url.pathname == '') {
    return
  }

  try {
    return JSON.parse(decodeURIComponent(path))
  } catch (e) {
    console.log('error parsing', e)
    return
  }
}
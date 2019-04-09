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
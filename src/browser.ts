export function pushHistoryPath(path: string) {
  if (NOT_BROWSER) {
    return
  }

  window.history.pushState({}, undefined as any, path)
}

export function setNavigationListener(listener: (url: string) => void) {
  if (NOT_BROWSER) {
    return
  }

  window.onpopstate = () => {
    listener(window.location.href)
  }
}

export function getUrl(): string | undefined {
  if (NOT_BROWSER) {
    return
  }
  return window.location.href
}

const NOT_BROWSER = typeof window == 'undefined'

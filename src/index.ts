import * as React from 'react'
import { IRoute, IRouteMap } from './types'
import * as Route from './route'
import * as Browser from './browser'

interface IProps {
  initialRoute: IRoute
  routeMap: IRouteMap
  getSceneProps: (router: Router) => object
  onNavigate?: (route: IRoute) => void
  renderNotFound: (router: Router) => JSX.Element
  renderError: (router: Router) => JSX.Element
}

interface IState {
  currentRoute: IRoute
  hasError: boolean
}

export default class Router extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)

    Browser.setNavigationListener(this._handleBrowserNavigation)

    const initialUrl = Browser.getUrl()

    const urlRoute = initialUrl && Route.parseFromUrl(initialUrl)

    let currentRoute: IRoute

    if (urlRoute && urlRoute.path != '') {
      currentRoute = urlRoute
    } else {
      currentRoute = props.initialRoute
    }

    this.state = {
      currentRoute,
      hasError: false
    }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: any) {
    console.error('App Error:', error, info)
    this.setState({ hasError: true })
  }

  go = (path: string, params: object = {}) => {
    const currentRoute = Route.make(path, params)
    this.setState({ currentRoute })
    Browser.pushHistoryPath('/' + Route.serialize(currentRoute))
  }

  replaceParams = (params: object) => {
    this.go(this.getCurrentRoute().path, params)
  }

  getCurrentRoute = (): IRoute => {
    return this.state.currentRoute
  }

  _handleBrowserNavigation = (url: string) => {
    const route = Route.parseFromUrl(url)
    if (route) {
      this.setState({ currentRoute: route })
    }
  }

  _handleNavigate = () => {
    const { onNavigate } = this.props
    const { currentRoute } = this.state
    onNavigate && onNavigate(currentRoute)
  }

  render() {
    if (this.state.hasError) {
      return this.props.renderError(this)
    }

    const { routeMap, getSceneProps, renderNotFound } = this.props
    const { currentRoute } = this.state

    const component = routeMap[currentRoute.path]

    if (!component) {
      return renderNotFound(this)
    }

    const props = {
      ...getSceneProps(this),
      params: { ...currentRoute.params }
    } as any

    return React.createElement(component, props)
  }
}

import * as React from 'react'
import { IRoute, IRouteMap } from './types'
import * as Util from './util'

interface IProps {
  homePath: string
  routeMap: IRouteMap
  getSceneProps: (router: Router) => object
  onNavigate?: (route: IRoute) => void
}

interface IState {
  stack: IRoute[]
}

export default class Router extends React.Component<IProps, IState> {

  constructor(props: IProps) {
    super(props)

    const initialRoute = Util.parseRouteFromUrl(window.location.href)

    this.state = {
      stack: [initialRoute]
    }

    window.onpopstate = this._onPopState
  }

  replace = (path: string, params: object = {}) => {
    const { stack } = this.state

    const route = this.makeRoute(path, params)
    stack[stack.length - 1] = route
    this.setStack(stack)

    const query = Util.paramsToQueryString(route.params)
    window.history.replaceState({}, undefined, `/${route.path}?${query}`)
  }

  replaceParams = (params: object) => {
    const route = this.getCurrentRoute()
    this.replace(route.path, params)
  }

  push = (path: string, params: object = {}) => {
    const route = this.makeRoute(path, params)

    const { stack } = this.state
    stack.push(route)
    this.setStack(stack)

    const query = Util.paramsToQueryString(route.params)
    window.history.pushState({}, undefined, `/${route.path}?${query}`)
  }

  pop = () => {
    const { stack } = this.state

    if (stack.length < 2) {
      throw new Error("Cannot pop initial route")
    }

    window.history.back()
  }

  _onPopState = () => {
    const { stack } = this.state
    stack.pop()
    this.setStack(stack)
  }

  setStack = (stack: IRoute[]) => {
    this.setState({ stack }, this._handleNavigate)
  }

  _handleNavigate = () => {
    this.props.onNavigate && this.props.onNavigate(this.getCurrentRoute())
  }

  makeRoute(path: string, params: object): IRoute {
    return { path, params }
  }

  getCurrentRoute() {
    const { stack } = this.state
    return stack[stack.length - 1]
  }

  render() {
    const { routeMap, getSceneProps, homePath } = this.props

    const route = this.getCurrentRoute()

    const path = route.path == '' ? homePath : route.path

    const component = routeMap[path]

    if (!component) {
      throw new Error(`Route not found ${route.path}.`)
    }

    const props = {
      ...getSceneProps(this),
      params: { ...route.params }
    } as any

    return React.createElement(component, props)
  }
}

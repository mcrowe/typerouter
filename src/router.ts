import * as React from 'react'
import { IRoute, IRouteMap } from './types'
import * as Util from './util'

interface IProps {
  initialRoute: IRoute
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

    let initialStack = [props.initialRoute]

    if (isBrowser()) {
      const stack = Util.parseStackFromUrl(window.location.href)

      if (stack) {
        initialStack = stack
      }

      for (const route of stack) {
        window.history.pushState({}, undefined, Util.serializeStack(stack))
      }

      window.onpopstate = this._onPopState
    }

    this.state = {
      stack: initialStack
    }
  }

  replace = (path: string, params: object = {}) => {
    const { stack } = this.state

    const route = this.makeRoute(path, params)
    stack[stack.length - 1] = route
    this.setStack(stack)

    if (isBrowser()) {
      window.history.replaceState({}, undefined, this._serializeStack())
    }
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

    if (isBrowser()) {
      window.history.pushState({}, undefined, this._serializeStack())
    }
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

  _serializeStack = () => {
    return Util.serializeStack(this.state.stack)
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
    const { routeMap, getSceneProps } = this.props

    const route = this.getCurrentRoute()

    const component = routeMap[route.path]

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

function isBrowser() {
  return typeof window != 'undefined'
}
import * as React from 'react'
import { INavigator, IRoute, IRouteMap } from './types'

interface IProps<T extends IRouteMap> {
  initialRoute: IRoute
  routes: T
  getSceneProps: (router: Router<T>) => object
  onNavigate?: (route: IRoute) => void
}

interface IState {
  stack: IRoute[]
}

export default class Router<T extends IRouteMap> extends React.Component<
  IProps<T>,
  IState
> {

  constructor(props: IProps<T>) {
    super(props)

    this.state = {
      stack: [props.initialRoute]
    }
  }

  replace = (path: string, params: object = {}) => {
    const { stack } = this.state

    const route = this.makeRoute(path, params)
    stack[stack.length - 1] = route
    this.setStack(stack)
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
  }

  pop = () => {
    const { stack } = this.state

    if (stack.length < 2) {
      throw new Error("Cannot pop initial route")
    }

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
    const { routes, getSceneProps } = this.props

    const route = this.getCurrentRoute()

    const component = routes[route.path]

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

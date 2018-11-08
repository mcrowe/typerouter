export interface IRoute {
  path: string
  params: object
}

export interface IRouteMap {
  [path: string]: React.ComponentType
}

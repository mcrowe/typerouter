import { test } from 'ava'
import Router from '../router'

test('basics', t => {
  const router = new Router({
    initialRoute: {path: 'Home', params: {}},
    routeMap: {
      'Home': (() => {}) as any
    },
    getSceneProps: () => ({})
  })

  t.truthy(router.render())
})

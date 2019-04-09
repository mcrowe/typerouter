import { test } from 'ava'
import Router from '../router'

test('basics', t => {
  const router = new Router({
    homePath: '/',
    routeMap: {},
    getSceneProps: () => ({})
  })

  t.truthy(router.render())
})

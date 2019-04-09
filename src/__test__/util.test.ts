import { test } from 'ava'
import * as Util from '../util'

test('parseRouteFromUrl', t => {
  const route = Util.parseRouteFromUrl('http://localhost:1234/Recipe?id=123')
  t.deepEqual({
    path: 'Recipe',
    params: {id: '123'}
  }, route)
})

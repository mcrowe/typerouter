import { test } from 'ava'
import * as Util from '../util'

test('parseStackFromUrl', t => {
  const path = encodeURIComponent(JSON.stringify([]))
  const stack = Util.parseStackFromUrl(`http://localhost:1234/${path}`)
  t.deepEqual([], stack)
})

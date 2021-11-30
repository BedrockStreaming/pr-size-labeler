import * as process from 'process'
import * as cp from 'child_process'
import * as path from 'path'
import {expect, test, describe} from '@jest/globals'

// shows how the runner will run a javascript action with env / stdout protocol
describe('e2e', () => {
  test('test runs', () => {
    process.env['INPUT_MILLISECONDS'] = '500'
    const np = process.execPath
    const ip = path.join(__dirname, '..', 'lib', 'index.js')
    const options: cp.ExecFileSyncOptions = {
      env: process.env
    }

    // You can also use inline snapshots if your output is stable
    expect(cp.execFileSync(np, [ip], options).toString()).toContain(
      '::debug::Waiting 500 milliseconds ...'
    )
  })
})

import { env, execPath } from 'process';
import { execFileSync, ExecFileSyncOptions } from 'child_process';
import { join } from 'path';

// shows how the runner will run a javascript action with env / stdout protocol
describe('e2e', () => {
  test('test runs', () => {
    env.INPUT_MILLISECONDS = '500';
    const np = execPath;
    const ip = join(__dirname, '..', 'lib', 'index.js');
    const options: ExecFileSyncOptions = { env };

    // You can also use inline snapshots if your output is stable
    expect(execFileSync(np, [ip], options).toString()).toContain('::debug::Waiting 500 milliseconds ...');
  });
});

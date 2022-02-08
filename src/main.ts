import { debug, getInput, setFailed, setOutput } from '@actions/core';
import { wait } from './wait';

export default async function run(): Promise<void> {
  try {
    const ms: string = getInput('milliseconds');
    // debug is only output if you set the secret `ACTIONS_STEP_DEBUG` to true
    debug(`Waiting ${ms} milliseconds ...`);

    debug(new Date().toTimeString());
    await wait(parseInt(ms, 10));
    debug(new Date().toTimeString());

    setOutput('time', new Date().toTimeString());
  } catch (error) {
    if (error instanceof Error) {
      return setFailed(error.message);
    }

    return setFailed(`Unknown error: ${JSON.stringify(error)}`);
  }

  return undefined;
}

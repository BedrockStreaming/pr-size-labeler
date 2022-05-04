import { debug } from '@actions/core';
import { parseConfig } from './config';

export default async function run(): Promise<void> {
  const config = parseConfig();
  debug(config.toString());

  return undefined;
}

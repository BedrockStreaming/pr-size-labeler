import { debug } from '@actions/core';
import {ConfigEntry, parseConfig} from './config';

export default async function run(): Promise<void> {
  debug('Parsing input data...')
  const configurations: ConfigEntry[]  = parseConfig();
  debug(`Config parsed ${configurations.map(entry => entry).join(',')}`);

  return undefined;
}

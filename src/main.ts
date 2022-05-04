import { info } from '@actions/core';
import { ConfigEntry, parseConfig } from './config';

export default async function run(): Promise<void> {
  info('Parsing input data...');
  const configurations: ConfigEntry[] = parseConfig();
  info(`Config parsed ${configurations.map((entry) => entry).join(',')}`);

  return undefined;
}

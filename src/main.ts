import { info } from '@actions/core';
import github from '@actions/github';

import { ConfigEntry, parseConfig } from './config';
import { getDiffSize, getFileSize, getPullRequest } from './pullRequest';

export default async function run(): Promise<void> {
  info('Parsing input data...');
  const configuration: ConfigEntry[] = parseConfig();
  info(`Config parsed`);

  const pullRequest = getPullRequest(github);
  const size = getFileSize(configuration);
  const diff = getDiffSize(configuration);

  return undefined;
}

import { info } from '@actions/core';

import { ConfigEntry, getBiggestEntry, parseConfig } from './config';
import { applyLabelOnPullRequest, getDiffSize, getFileSize, getPullRequest } from './pullRequest';

export default async function run(): Promise<void> {
  info('Parsing input data...');
  const configuration: ConfigEntry[] = parseConfig();
  info(`Config parsed`);

  const pullRequest = await getPullRequest();
  const size = getFileSize(configuration, pullRequest.numberOfFiles);
  info(`Level from size, ${size.label}`);
  // @ts-ignore
  const diff = getDiffSize(configuration, pullRequest.addition + pullRequest.deletions);
  info(`Level from diff, ${diff.label}`);

  const biggestEntry = getBiggestEntry(size, diff);

  await applyLabelOnPullRequest(biggestEntry, configuration);
  return undefined;
}

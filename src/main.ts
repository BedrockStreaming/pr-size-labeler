import { info } from '@actions/core';

import { ConfigEntry, getBiggestEntry, parseConfig } from './config';
import { applyLabelOnPullRequest, getDiffSize, getFileSize, getPullRequest } from './pullRequest';
import * as github from '@actions/github';

export default async function run(): Promise<void> {
  info('Parsing input data...');
  const configuration: ConfigEntry[] = parseConfig();
  info(`Config parsed`);

  if (github.context.eventName != 'pull_request') {
    info('Event is not pull request, doing nothing');
    return;
  }

  const pullRequest = await getPullRequest();
  const size = getFileSize(configuration, pullRequest.numberOfFiles);
  info(`Level from size, ${size.label}`);
  // @ts-ignore
  const diff = getDiffSize(configuration, pullRequest.numberOfLines);
  info(`Level from diff, ${diff.label}`);

  const biggestEntry = getBiggestEntry(size, diff);

  await applyLabelOnPullRequest(biggestEntry, configuration);
  return undefined;
}

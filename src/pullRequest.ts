import { ConfigEntry } from './config';
import { getInput, info } from '@actions/core';
import * as github from '@actions/github';

export async function getPullRequest() {
  info('Getting information about pull request');

  const octokit = github.getOctokit(getInput('token'));

  const { data: files } = await octokit.rest.pulls.listFiles({
    ...github.context.repo,
    pull_number: github.context.issue.number,
  });

  info(`${files.length}`);

  info(JSON.stringify(github.context.payload.pull_request));

  return {
    ...github.context.payload.pull_request,
    numberOfFiles: files.length,
  };
}

export const getSize = (entryParamName: string) => (
  configuration: ConfigEntry[],
  currentCount: number,
): ConfigEntry => {
  const level = configuration.find((entry) => {
    // @ts-ignore
    const entryLevel: number = entry[entryParamName];
    return entryLevel < currentCount;
  });

  if (!level) {
    return configuration[configuration.length - 1];
  }

  return level;
};

export const getFileSize = getSize('files');

export const getDiffSize = getSize('diff');

import { ConfigEntry } from './config';
import { getInput, info } from '@actions/core';
import * as github from '@actions/github';

export async function getPullRequest() {
  info(JSON.stringify(github.context));
  info('Getting information about pull request');

  const octokit = github.getOctokit(getInput('token'));

  const { data: files } = await octokit.rest.pulls.listFiles({
    ...github.context.repo,
    pull_number: github.context.issue.number,
  });

  info(`${files.length}`);

  return {
    ...github.context.payload.pull_request,
    numberOfFiles: files.length,
  };
}

export function getFileSize(configuration: ConfigEntry[], pullRequest = { files: 200 }): ConfigEntry {
  const level = configuration.find((entry) => {
    return entry.files < pullRequest.files;
  });

  if (!level) {
    return configuration[configuration.length - 1];
  }

  return level;
}

export function getDiffSize(configuration: ConfigEntry[], pullRequest = { diff: 100 }): ConfigEntry {
  const level = configuration.find((entry) => {
    return entry.diff < pullRequest.diff;
  });

  if (!level) {
    return configuration[configuration.length - 1];
  }

  return level;
}

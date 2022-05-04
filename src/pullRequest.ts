import { ConfigEntry } from './config';
import { info } from '@actions/core';
import { context } from '@actions/github';

export function getPullRequest() {
  info(JSON.stringify(context));
  info('Getting information about pull request');
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

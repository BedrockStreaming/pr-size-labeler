import { ConfigEntry } from './config';
import { getInput, info } from '@actions/core';
import * as github from '@actions/github';

export async function getPullRequest() {
  info('Getting information about pull request');

  const octokit = github.getOctokit(getInput('token'));
  const excludedFiles = getInput('exclude_files');

  const { data: files } = await octokit.rest.pulls.listFiles({
    ...github.context.repo,
    pull_number: github.context.issue.number,
  });

  const numberOfLines = files.reduce((accumulator, file) => {
    if (file.filename.match(excludedFiles)) {
      info(`excluding diff from ${file.filename}`);
      return accumulator;
    }
    return accumulator + file.changes;
  }, 0);

  info(`Number of files ${files.length}`);
  info(`Number of lines ${numberOfLines}`);

  return {
    ...github.context.payload.pull_request,
    numberOfFiles: files.length,
    numberOfLines,
  };
}

export async function applyLabelOnPullRequest(entry: ConfigEntry, configuration: ConfigEntry[]) {
  // @ts-ignore
  const labels = github.context.payload.pull_request.labels.map((l) => l.name);
  info(`Find existing labels ${labels.join(',')}`);

  const octokit = github.getOctokit(getInput('token'));

  if (labels.includes(entry.label)) {
    info('Label already exist');
    return;
  }

  const possibleLabels = configuration.map((entry) => entry.label);
  info(`${possibleLabels.join(',')}`);
  const existingLabels = labels.filter((label: string) => possibleLabels.includes(label));
  info(`Existing label ${existingLabels}`);

  if (existingLabels.length) {
    info(`Removing existing label ${existingLabels[0]}`);
    await octokit.rest.issues.removeLabel({
      ...github.context.repo,
      issue_number: github.context.issue.number,
      name: existingLabels[0],
    });
  }

  info(`Adding new label ${entry.label}`);
  await octokit.rest.issues.addLabels({
    ...github.context.repo,
    issue_number: github.context.issue.number,
    labels: [entry.label],
  });
}

export const getSize = (entryParamName: string) => (
  configuration: ConfigEntry[],
  currentCount: number,
): ConfigEntry => {
  const level = configuration.find((entry) => {
    // @ts-ignore
    const entryLevel: number = entry[entryParamName];
    info(`${entryLevel} < ${currentCount}`);
    return entryLevel > currentCount;
  });

  if (!level) {
    return configuration[configuration.length - 1];
  }

  return level;
};

export const getFileSize = getSize('files');

export const getDiffSize = getSize('diff');

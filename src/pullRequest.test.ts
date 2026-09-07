import { describe, expect, it, jest } from '@jest/globals';

const files = [
  { filename: 'src/main.ts', changes: 10 },
  { filename: 'yarn.lock', changes: 500 },
  { filename: 'dist/index.js', changes: 300 },
  { filename: 'README.md', changes: 5 },
];

const totalFiles = files.length;
const totalLines = files.reduce((accumulator, file) => accumulator + file.changes, 0);

const listFiles = jest.fn<() => Promise<{ data: typeof files }>>().mockResolvedValue({ data: files });
const getInput = jest.fn<(name: string) => string>();
const info = jest.fn();
const getOctokit = jest.fn(() => ({
  rest: {
    pulls: {
      listFiles,
    },
  },
}));

const context = {
  repo: { owner: 'BedrockStreaming', repo: 'pr-size-labeler' },
  issue: { number: 42 },
  payload: { pull_request: { number: 42 } },
};

jest.unstable_mockModule('@actions/core', () => ({
  getInput,
  info,
}));

jest.unstable_mockModule('@actions/github', () => ({
  getOctokit,
  context,
}));

const { getPullRequest } = await import('./pullRequest.js');

describe('getPullRequest', () => {
  it('excludes no files when exclude_files is an empty string (regression guard)', async () => {
    getInput.mockImplementation((name: string) => {
      if (name === 'exclude_files') return '';
      if (name === 'token') return 'fake-token';
      return '';
    });

    const pullRequest = await getPullRequest();

    expect(pullRequest.numberOfFiles).toBe(totalFiles);
    expect(pullRequest.numberOfLines).toBe(totalLines);
  });

  it('excludes matching files from both numberOfFiles and numberOfLines', async () => {
    getInput.mockImplementation((name: string) => {
      if (name === 'exclude_files') return '(\\.lock|dist)';
      if (name === 'token') return 'fake-token';
      return '';
    });

    const pullRequest = await getPullRequest();

    // yarn.lock (500) and dist/index.js (300) are excluded,
    // leaving src/main.ts (10) and README.md (5).
    expect(pullRequest.numberOfFiles).toBe(2);
    expect(pullRequest.numberOfLines).toBe(15);
  });

  it('keeps every file when the pattern matches nothing in the fixture', async () => {
    getInput.mockImplementation((name: string) => {
      if (name === 'exclude_files') return 'this-pattern-matches-nothing';
      if (name === 'token') return 'fake-token';
      return '';
    });

    const pullRequest = await getPullRequest();

    expect(pullRequest.numberOfFiles).toBe(totalFiles);
    expect(pullRequest.numberOfLines).toBe(totalLines);
  });
});

<p align="center">
  <a href="https://github.com/actions/typescript-action/actions"><img alt="typescript-action status" src="https://github.com/actions/typescript-action/workflows/build-test/badge.svg"></a>
</p>

# Create a JavaScript Action using TypeScript

Use this template to bootstrap the creation of a TypeScript action.:rocket:

This template includes compilation support, tests, a validation workflow, publishing, and versioning guidance.

If you are new, there's also a simpler introduction. See the [Hello World JavaScript Action](https://github.com/actions/hello-world-javascript-action)

## Create an action from this template

Click the `Use this Template` and provide the new repo details for your action

## Code in Main

> First, you'll need to have a reasonably modern version of `node` handy. This won't work with versions older than 9, for instance.

Install the dependencies

```bash
$ yarn
```

Build the typescript and package it for distribution

```bash
$ yarn build && yarn package
```

Run the tests :heavy_check_mark:

```bash
$ yarn test

 PASS  ./index.test.js
  ✓ throws invalid number (3ms)
  ✓ wait 500 ms (504ms)
  ✓ test runs (95ms)

...
```

## Change action.yml

The action.yml defines the inputs and output for your action.

Update the action.yml with your name, description, inputs and outputs for your action.

See the [documentation](https://help.github.com/en/articles/metadata-syntax-for-github-actions)

## Change the Code

Most toolkit and CI/CD operations involve async operations so the action is run in an async function.

```javascript
import * as core from '@actions/core';
...

async function run() {
  try {
      ...
  }
  catch (error) {
    core.setFailed(error.message);
  }
}

run()
```

See the [toolkit documentation](https://github.com/actions/toolkit/blob/master/README.md#packages) for the various packages.

## Publishing your action

This starter template comes with a [release solution](.github/workflows/release.yml).
You only need to configure the `bump:<release-type>` labels on your repository and add one of those on your pull request. Once merged, master will be released :rocket:

See the official [versioning documentation](https://github.com/actions/toolkit/blob/master/docs/action-versioning.md) if you want to learn more about github actions releases.

## Validate

You can now validate the action by referencing `./` in a workflow in your repo (see [test.yml](.github/workflows/test.yml))

```yaml
uses: ./
with:
  milliseconds: 1000
```

See the [actions tab](https://github.com/actions/typescript-action/actions) for runs of this action! :rocket:

## Usage

After testing you can [create a v1 tag](https://github.com/actions/toolkit/blob/master/docs/action-versioning.md) to reference the stable and latest V1 action

## Testing

We are making several tests on our actions:

- Unit tests with jest.

- E2E tests with ...jest ! We simply execute the code with node, see `__tests__/index.e2e.test.ts`

- Validation from workflows, see [Validate](#validate), we use the dist to trigger the action as it will be when published.

### Caveats

- E2E on actions using `@actions/github`

Unfortunately, we can't mock dependencies the way we do with regular unit tests since we are simply executing the files with node. See [this issue](https://github.com/actions/toolkit/issues/71) and how we solved it in our [check-pull-request-title action](https://github.m6web.fr/bedrock-actions/check-pull-request-title/tree/main/__tests__)

<h1 align="center">Welcome to BedrockStreaming/pr-size-labeler 👋</h1>
<p>
  <a href="https://github.com/BedrockStreaming/pr-size-labeler/graphs/commit-activity" target="_blank">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" />
  </a>
  <img alt="GitHub" src="https://img.shields.io/github/license/BedrockStreaming/pr-size-labeler">
  <img alt="GitHub Workflow Status" src="https://img.shields.io/github/workflow/status/BedrockStreaming/pr-size-labeler/%F0%9F%A7%AA%20Integration">
  <img alt="GitHub Repo stars" src="https://img.shields.io/github/stars/Bedrockstreaming/pr-size-labeler?style=social">
</p>

> Github action to automatically add label on PR to define size (based on line diff and file modified)

## Author

- Website: https://tech.bedrockstreaming.com

## How to use ?

You can create a `.github/workflows/pr-labeler.yml` file:

```yaml
name: 🏷 PR size labeler

on: [pull_request]

permissions:
  pull-requests: write
  issues: write

jobs:
  pr-labeler:
    runs-on: ubuntu-latest
    name: Label the PR size
    steps:
      - uses: BedrockStreaming/pr-size-labeler@v1
        with:
          token: ${{ secrets.GITHUB_TOKEN }}
          exclude_files: .lock
```

## Inputs

```yaml
xs_label:
  required: false
  default: 'Size/XS'
xs_diff:
  required: false
  default: '50'
xs_files:
  required: false
  default: '5'
s_label:
  required: false
  default: 'Size/S'
s_diff:
  required: false
  default: '100'
s_files:
  required: false
  default: '10'
m_label:
  required: false
  default: 'Size/M'
m_diff:
  required: false
  default: '500'
m_files:
  required: false
  default: '30'
l_label:
  required: false
  default: 'Size/L'
l_diff:
  required: false
  default: '800'
l_files:
  required: false
  default: '50'
xl_label:
  required: false
  default: 'Size/XL'
xl_diff:
  required: false
  default: '1500'
xl_files:
  required: false
  default: '100'
token:
  required: true
exclude_files:
  description: 'Regexp to ignore files from the line diff count (example: yarn.lock)'
  required: true
```

## [✍️ Contributing](./CONTRIBUTING.md)

## 📝 License

This project is [MIT](https://github.com/BedrockStreaming/pr-size-labeler/blob/master/LICENSE) licensed.

---

_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_

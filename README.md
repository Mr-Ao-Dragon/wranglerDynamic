# wranglerDynamic
dynamic gen wrangler config.
## status
[![GitHub Super-Linter](https://github.com/Mr-Ao-Dragon/wranglerDynamic/actions/workflows/linter.yml/badge.svg)](https://github.com/super-linter/super-linter)
![CI](https://github.com/Mr-Ao-Dragon/wranglerDynamic/actions/workflows/ci.yml/badge.svg)
[![Check dist/](https://github.com/Mr-Ao-Dragon/wranglerDynamic/actions/workflows/check-dist.yml/badge.svg)](https://github.com/Mr-Ao-Dragon/wranglerDynamic/actions/workflows/check-dist.yml)
[![CodeQL](https://github.com/Mr-Ao-Dragon/wranglerDynamic/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/Mr-Ao-Dragon/wranglerDynamic/actions/workflows/codeql-analysis.yml)
[![Coverage](./badges/coverage.svg)](./badges/coverage.svg)

## usage
### main case
```yaml
- name: wranglerDynamic
  uses: Mr-Ao-Dragon/wranglerDynamic@v1
  with:
    template: 'wrangler.toml.template'
    myToken: ${{ SECRET.GITHUB_TOKEN }}
```
### permissions
```yaml
permissions: read-all
```
### sed rule
`{{ __VARIABLE__NAME__ }} -> value`

`{{ __SECRET__NAME__}} -> value`
### info
will auto read github secret and vars, please do not print wrangler config to log.
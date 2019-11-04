# make-coverage-badge

[![Build Status][travis-image]][travis-url]
[![npm version][npm-image]][npm-url]
[![License][license-image]][license-url]

[travis-url]: https://travis-ci.org/tlvince/make-coverage-badge
[travis-image]: https://img.shields.io/travis/tlvince/make-coverage-badge.svg
[npm-url]: https://www.npmjs.com/package/make-coverage-badge
[npm-image]: https://img.shields.io/npm/v/make-coverage-badge.svg
[license-url]: https://opensource.org/licenses/MIT
[license-image]: https://img.shields.io/npm/l/make-coverage-badge.svg

> Create a coverage badge

Creates a code coverage badge like the following:

![Coverage badge][coverage-badge]

Currently just reads from Istanbul's JSON summary reporter and downloads a badge from https://shields.io/. Don't expect too much! Send a PR if you need configuration etc.

[coverage-badge]: https://img.shields.io/badge/Coverage-100%25-brightgreen.svg

## Usage

(For Create React Apps)

1. Configure Jest (in `package.json`):

```json
"jest": {
  "coverageReporters": [
    "json-summary"
  ]
}
```

2. Run `npm test -- --coverage`
3. Run `make-coverage-badge`

Resulting badge will be in `./coverage/badge.svg`.

## Options

### `--output-path <path>`

Writes the coverage badge to the given path (relative to project root). Defaults to `./coverage/badge.svg`.

### `--report-path <path>`

Path to a coverage report file. Defaults to `./coverage/coverage-summary.json`.

## Prior work

- [Coveralls][]: paid for private repos
- [coverage-badger][]: same approach, but using an XML report and therefore requires XML dependencies

[coveralls]: https://coveralls.io/
[coverage-badger]: https://github.com/notnotse/coverage-badger

## Author

© 2019 Tom Vincent <git@tlvince.com> (https://tlvince.com)

## License

Released under the [MIT license](http://tlvince.mit-license.org).

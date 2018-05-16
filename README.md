# (TESTING ADAPTATION) make-coverage-badge

> Create a coverage badge

[![License][license-image]][license-url]

[license-url]: https://opensource.org/licenses/MIT
[license-image]: https://img.shields.io/npm/l/make-coverage-badge.svg


Creates a code coverage badge like the following:

![Coverage badge][coverage-badge]

[coverage-badge]: https://img.shields.io/badge/Coverage-100%25-brightgreen.svg

Currently just reads from Istanbul's JSON summary reporter and downloads a badge from https://shields.io/ for each jest coverage type (`statement`, `branch`, `functions`, `lines`)


## Usage

(For Create React Apps)

1. Configure Jest (in `package.json`):

    ```json
    "jest": {
      "coverageReporters": [
        "json-summary", "text", "lcov"
      ]
    }
    ```

2. Run `npm test -- --coverage`
3. Run `make-coverage-badge`

Resulting in badges:
- `./coverage/badge-statements.svg`.
- `./coverage/badge-lines.svg`.
- `./coverage/badge-functions.svg`.
- `./coverage/badge-branches.svg`.

## Authors

© 2017 [Main Author] Tom Vincent <git@tlvince.com> (https://tlvince.com) 

© 2018 Pamela Peixinho <git@pamepeixinho.com> (https://pamepeixinho.github.io)

## License

Released under the [MIT license](http://tlvince.mit-license.org).

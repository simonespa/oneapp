# oneapp

## Linting and code format

ESLint with Airbnb configs + Sass-Lint + Prettier. This phase is triggered as a precommit hook using Husky, where the staged files are linted and formatted via `lint-staged` and `pretty-quick` commands.

Dependencies: `eslint`, `eslint-config-airbnb`, `eslint-config-prettier`, `eslint-plugin-import`, `eslint-plugin-jsx-a11y`, `eslint-plugin-prettier`, `eslint-plugin-react`, `sass-lint`, `prettier`, `pretty-quick`, `lint-staged`, `husky`

## Testing

Mocha as a test runner, Chai as expectation library, Sinon for test doubles and Nyc for coverage.

Dependencies: `mocha`, `chai`, `sinon`, `nyc`

## Resources

Prettier: https://prettier.io/docs/en/

## Babel

Options: https://babeljs.io/docs/en/options

## Typescript

Integration with Babel: https://iamturns.com/typescript-babel/

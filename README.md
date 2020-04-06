# oneapp

## Linting and code format

ESLint with ESLint configs + Prettier. This phase is triggered as a precommit hook using Husky, where the staged files are linted and formatted via `lint-staged` and `pretty-quick` commands.

## Testing

Mocha as a test runner, Chai as expectation library, Sinon for test doubles and Nyc for coverage.

Dependencies: `mocha`, `chai`, `sinon`, `nyc`

## Resources

Prettier: https://prettier.io/docs/en/

## Babel

Options: https://babeljs.io/docs/en/options

## Typescript

Integration with Babel: https://iamturns.com/typescript-babel/

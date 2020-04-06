# Sounds Web Serverless

This repo is a prototype and the main renderer for the new Single-Page PWA version of Sounds Web. It contains the main routes to the different views of the app importing them via NPM libraries.

The idea is to split the codebase per page, exporting it as a NPM module, and finally importing it in this main repo. This will enable continuous integration - since new features can be tested on its own page view - without sacrificing the capability of a SPA.

To prove the validity of this prototype, two main pages have been created: the [homepage](https://github.com/bbc/sounds-home) and the [playback](https://github.com/bbc/sounds-play) one.

## Notes

- React Router v5
- Babel 7
- Webpack 4
- Isomorphic clients for RMS, idcta, orbit, etc.
- file names are hyphenated, whereas React Component and Containers are defined in a capitalised camel-case file.
- Action type must be constant defined within action-type
- The action string should be prefixed with the name of the action
- The action string should have a verb (update_list, stop_fetching, etc.)
- Assets are split in webpack and automatically referenced by the asset helper
- The asset helper has been massively reduced in complexity
- The client webpack config externalise all used dependencies.
- The remaining assets left (webpack, core-js polyfills, runtime, etc) are split out from the main bundle
- Assets are imported as IIFE via script tag
- Bump is imported as IIFE too
- Express middleware routes everything to React router via "\*" route
- The "if (process.env.NODE_ENV === 'production')" statement is used to statically select a branch of code at build time
- Main commands: watch, inspect, build, start

## References

- https://blog.logrocket.com/patterns-for-data-fetching-in-react-981ced7e5c56/

- https://babeljs.io/docs/en/config-files
- https://babeljs.io/docs/en/options#root
- https://github.com/zloirock/core-js/blob/master/docs/2019-03-19-core-js-3-babel-and-a-look-into-the-future.md
- https://reactjs.org/docs/code-splitting.html
- https://tylermcginnis.com/react-router-code-splitting/
  https://github.com/ReactTraining/react-router/blob/master/packages/react-router-dom/docs/guides/code-splitting.md
  https://reacttraining.com/blog/react-router-v5-1/
  https://dev.to/finallynero/hooks-introduced-in-react-router-v5-1-7g8l

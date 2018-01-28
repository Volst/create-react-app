# Create React App for Volst [![Build Status](https://travis-ci.org/Volst/create-react-app.svg?branch=master)](https://travis-ci.org/Volst/create-react-app)

Create React apps with no build configuration.

* [Getting Started](#getting-started) – How to create a new app.
* [User Guide](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md) – How to develop apps bootstrapped with Create React App.

- - -

**This is a fork of [Create React App](https://github.com/facebookincubator/create-react-app), intended for use at our company Volst.**

The main differences with Create React App are;

- Uses TypeScript, mostly copied from [create-react-app-typescript](https://github.com/wmonk/create-react-app-typescript)
- No CSS Autoprefixer, we only support modern browsers
- Doesn't use source maps by default
- Support for `PUBLIC_URL` env variable in dev
- Uses [Babel Minify](https://github.com/webpack-contrib/babel-minify-webpack-plugin) instead of UglifyJs for minifying
- Basic Electron compatibility via env variable
- Allows custom dotenv file location (in our build system `.env` cannot live in the repository root)
- Removes most polyfills for older browsers
- Adds Git version and commit hash to env variable so frontend can display it

## Getting Started

```sh
npx create-react-app --scripts-version=@volst/react-scripts my-app
cd my-app/
npm start
```

For further instructions, read the [Getting Started guide](https://github.com/facebookincubator/create-react-app#getting-started) from the original Create React App.
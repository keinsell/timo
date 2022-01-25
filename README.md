# Timo

Timo is a small application commissioned for me as a recruitment task by Nextrope. The purpose of the application is to use TypeScript and any HTTP application
framework to create a solution that will allow us to track time and generate reports on how much time we spent working on a given day.

[![codecov](https://codecov.io/gh/keinsell/timo/branch/main/graph/badge.svg?token=X66XL7C3HH)](https://codecov.io/gh/keinsell/timo)

## About Development

Yeah... I started developing this app like two days ago during this time I lost overall design concept and I was chaning it 2-3 times which resulted as absolute
mess in repository, up to this day 25/01 I do not have time anymore to sit on this project for recrutation purposes. There are some features that are working
but all that can I say is that this was unlucky project.

## Getting Started

> If you know a little bit of node it’s a piece of cake

### Prerequisites

-  `node@16.13.2`
-  `yarn@1.22.15`
-  `npm@8.3.0`
-  `docker-compose@1.29.2`
-  `docker-engine@20.10.8`

### Installation

The installation process is trivial, just install the packages using `yarn` or `npm`.

```bash
$ yarn
```

If you are preparing an application for production you should build it and use JavaScript code that has been transpiled from the source code.

```bash
$ yarn build
```

### Usage

If you plan to use the app on your machine, it is recommended that you use the `yarn dev` command, this will open a local development environment and allow you
to live preview your changes. On the other hand, if you just want to test the application I recommend using the button below, it will allow you to fork the
documentation from Postman and test the endpoints from a Heroku hosted application.If you don't want to use postman we also have
[statically hosted documentation](https://keinsell.docs.apiary.io).

[![Run in Postman](https://run.pstmn.io/button.svg)](https://god.gw.postman.com/run-collection/12555920-c109196b-184b-4d91-86d8-0216b6026771?action=collection%2Ffork&collection-url=entityId%3D12555920-c109196b-184b-4d91-86d8-0216b6026771%26entityType%3Dcollection%26workspaceId%3Dfe2749bd-17c3-4e9f-95e3-69ce48ec9978)

```bash
$ yarn dev
```

For running production build you should use `yarn start` or `node dist/src/index.js`

```bash
$ yarn start
```

To test your application through unit tests created in `ava` you can use the following command, the command `coverage` will also return code coverage.

```sh
$ yarn test
$ yarn coverage
```

## Contributing

```js
YouDoNot()
```

## Authors & Contributors

The original setup of this repository is by [keinsell](https://github.com/keinsell).

## License

This project is licensed under the **MIT**

See [LICENSE](docs/LICENSE) for more information.∂

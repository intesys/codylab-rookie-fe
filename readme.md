# Intesys academy - React course

This repository contains the code of PTCO 2022.

## Install

    npm i

## Develop

### Prerequisites

You need **nodejs** and **git** installed on your machine.

### Starting local dev server

    npm start

### `npm run build:api`

before export TS_POST_PROCESS_FILE enabling prettier on generated files.

```shell
export TS_POST_PROCESS_FILE='./node_modules/.bin/prettier.cmd --write'
npm run build:api
```

Generate API Rest client from openapi specification file (api.yml)

### Built with

- [react](https://reactjs.org/)
- [parcel](https://parceljs.org/)
- [scss](https://sass-lang.com/)
- [typescript](https://www.typescriptlang.org/)
- UI kit: [Material components](https://github.com/material-components/material-components-web-react#components)
- Development mock server: [msw](https://mswjs.io/)

### Building

Build production bundle with:

    npm run build

## Design reference

Refer to [InVision prototype](https://intesys.invisionapp.com/share/Y6S709XPD2R), also saved in [/doc](./doc/invision-prototype/index.html).

## License

This project is licensed under the MIT License

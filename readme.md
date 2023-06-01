# Intesys academy - React course

This repository contains the code of CodyLab Rookie - FE.

## Install

    npm ci

## Develop

### Prerequisites

You need **nodejs** and **git** installed on your machine.

### Starting local dev server

    npm start

### Build API client

before export TS_POST_PROCESS_FILE enabling prettier on generated files.

```shell
export TS_POST_PROCESS_FILE='./node_modules/.bin/prettier.cmd --write'
npm run build:api
```

Generate API Rest client from openapi specification file (api.yml)

### Built with

- [React](https://reactjs.org/)
- [Parcel](https://parceljs.org/)
- [scss](https://sass-lang.com/)
- [Typescript](https://www.typescriptlang.org/)
- [MUI](https://mui.com/material-ui/)
- [MUI DatePicker](https://mui.com/x/react-date-pickers/)
- [Msw](https://mswjs.io/)
- [OpenAPI Generator](https://github.com/openapitools/openapi-generator)

### Building

Build production bundle with:

    npm run build

## Design reference

Refer to png files saved in [/doc](./doc/).

## Sections and functions available for development

- Patient

  - List of patients and filters form
  - Detail of patient
  - Create patient
  - Update patient
  - Delate patient
  - Records
    - Create new patient record
    - Delete patient record
    - List patient records

- Doctor
  - List of doctors and filters form
  - Detail of doctor
  - Create doctor
  - Update doctor
  - Delate doctor
  - List of patients assigned to doctor

## License

This project is licensed under the MIT License

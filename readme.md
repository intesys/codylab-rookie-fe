# Intesys CodyLab - Rookie - Front-end

Questo repositiory contiene il codice del Rookie - FE di CodyLab.

## Install

    npm ci

## Develop

### Prerequisiti

Abbiamo bisogno di **nodejs** e **git** installati sulla propria macchina.

### Attivare il server di sviluppo

    npm start

### Effettaure la build del API Client

Prima procedere con esportare TS_POST_PROCESS_FILE per abilitare prettier durante la compilazione dei file.

```shell
export TS_POST_PROCESS_FILE='./node_modules/.bin/prettier.cmd --write'
npm run build:api
```

Questa procedura ci permette di generare il client REST dalle api grazie alle specifiche OpenAPI contenute all'interno del file [api.yml](./api.yml).

### Questa applicazione è stata creata con:

- [React](https://reactjs.org/)
- [Parcel](https://parceljs.org/)
- [scss](https://sass-lang.com/)
- [Typescript](https://www.typescriptlang.org/)
- [MUI](https://mui.com/material-ui/)
- [MUI DatePicker](https://mui.com/x/react-date-pickers/)
- [Msw](https://mswjs.io/)
- [OpenAPI Generator](https://github.com/openapitools/openapi-generator)

### Building

Eseguire il seguente comando quando si vuole creare il bundle finale per il deploy:

    npm run build

## Referenze per lo sviluppo

Per il design applicativo fare riferimento ai file .png salvati nella cartella [/doc](./doc/).

---

## Sezioni disponibili per lo sviluppo

- Patient (Entity)
  - Lista dei dottori e form di filtro
  - Dettaglio del paziente
  - Creazione di un nuovo paziente
  - Aggiornamento di un paziente
  - Rimosione di un paziente
- Records (Entity)

  - Creazione di un nuovo record legato ad un paziente
  - Cancellazione di un record
  - Lista dei record per paziente

- Doctor (Entity)
  - Lista dei dottori e form di filtro
  - Dettaglio del dottore
  - Creazione di un nuovo dottore
  - Aggiornamento di un dottore
  - Rimosione di un dottore
  - Lista dei pazienti assegnati al dottore

---

## License

This project is licensed under the MIT License

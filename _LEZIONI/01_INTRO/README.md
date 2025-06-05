# 01 - INTRODUZIONE

Benvenuti alla prima lezione del corso! In questa sezione imparerai come configurare correttamente l'ambiente di sviluppo necessario per seguire tutte le lezioni successive.

## 1. **Configurazione ambiente di lavoro**

### _Creazione cartella "Project"_

Creare all'interno del proprio ambiente di lavoro una cartella dove andremo a contenere tutti i progetti che andremo a sviluppare.

### _Installazione di Visual Studio Code_

- [VSCode](https://code.visualstudio.com/)

### _Installazione di GIT_

- [Windows](https://git-scm.com/download/win)
- [Mac](https://git-scm.com/download/mac)

### _Installazione di VOLTA/NODE_

Hai due opzioni per installare Node.js:

1. Installazione diretta di NodeJS
2. Utilizzo di VOLTA per gestire le versioni di NodeJS

La seconda opzione è preferibile in quanto permette di avere più versioni di NodeJS installate contemporaneamente e di gestirle in maniera semplice.

- [NODEJS](https://nodejs.org/en)
- [VOLTA](https://volta.sh/)

### _Configurazione VSCode_

1. Installare le seguenti estensioni consigliate:

   - Color Picker - Per selezionare colori in formato esadecimale, RGB, ecc.
   - Better Comments - Per organizzare meglio i commenti nel codice
   - DotENV - Supporto per i file .env
   - Git Graph - Visualizzazione grafica della cronologia git
   - Duplicate action - Duplicazione rapida di file e codice
   - Italian Language Pack for Visual Studio Code - Traduzione italiana dell'interfaccia
   - Material Icon Theme - Set di icone migliorato
   - Path Autocomplete - Completamento automatico dei percorsi
   - Prettier - Code formatter - Formattazione automatica del codice
   - Swagger Viewer - Visualizzazione e testing di API REST
   - Emmet - Scrittura rapida di HTML e CSS
   - YAML - Supporto per file YAML
   - Live Server - Server locale per visualizzare pagine HTML in tempo reale

2. Copiare la configurazione del file [settings.json](./settings.json) di VSCode all'interno del proprio file di configurazione.

   > !!! IMPORTANTE !!! Se è già presente una configurazione, copiare solo le parti mancanti.

   Per accedere al file di configurazione:

   - Windows/Linux: File > Preferences > Settings > (icona {}) Open Settings JSON
   - Mac: Code > Preferences > Settings > (icona {}) Open Settings JSON

## 2. **Verificare l'installazione**

Dopo aver completato tutte le installazioni, verifica che tutto funzioni correttamente:

1. **Verifica VSCode**: apri Visual Studio Code e controlla che le estensioni siano installate correttamente.

2. **Verifica Git**: apri un terminale e digita `git --version` per verificare che Git sia installato correttamente.

3. **Verifica Node.js**: apri un terminale e digita `node --version` per verificare che Node.js sia installato correttamente.

## 3. **Prossimi passi**

Ora che hai configurato l'ambiente di sviluppo, sei pronto per iniziare a lavorare sui progetti del corso. Nella prossima lezione, inizieremo a esplorare i fondamenti di HTML e CSS.

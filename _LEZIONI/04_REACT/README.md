# 04 - REACT

## 1) **Thinking in React**

- [React.dev - Thinking in React](https://react.dev/docs/thinking-in-react)

## 2) **Tutorial Tic-Tac-Toe**

### **Create React App**

```bash
npx create-react-app tic-tac-toe --template typescript --use-npm
cd tic-tac-toe
npm start
```

Aprire il link [http://localhost:3000/](http://localhost:3000/) per visionare l'applicazione.

- IMPORTANTE: importare il file `./assets/style.css` all'interno della cartella `./tic-tac-toe/src`

- [React.dev - Tutorial: Intro to React](https://react.dev/learn/tutorial-tic-tac-toe)

## 3) **Gestione dei dati in React**

Per questa parte utilizzeremo [Axios](https://axios-http.com/) come libreria per effettuare le chiamate HTTP e [React Router](https://reactrouter.com/) per gestire le rotte dell'applicazione.

Per installare Axios e React Router eseguire il comando:

```bash
npm install axios react-router-dom
```

Come servizio di API Fake utilizziamo [dummyapi.io](https://dummyapi.io/).

Configuriamo Axios per gestire le chiamate alle API andando a creare il file `./tic-tac-toe/src/api.ts`:

```typescript
import axios from "axios";

// Questo valore è un valore di prova, per ottenere il proprio valore registrarsi su https://dummyapi.io/
const APP_ID = "60a9b7b4e7f2c4b7a0a0e7d1";

const api = axios.create({
  baseURL: "https://dummyapi.io/data/api",
  headers: {
    "app-id": APP_ID,
  },
});

export default api;
```

Esempio di utilizzo di Axios per effettuare una chiamata API in questo caso di tipo GET:

```typescript
import api from "./api";

api.get("/user").then((response) => {
  console.log(response.data);
});
```

Aggiungiamo il wrapper che gestisce il routing alla nostra applicazione:

```typescript
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={/*Componente UserList*/} />
        <Route path={"/user/:id"} element={/*Componente UserDetail*/} />
        <Route
          path={"/user/:id/edit"}
          element={/*Componente UserDetailEdit*/}
        />
      </Routes>
    </BrowserRouter>
  );
};
```

Esempio di utilizzo della funzione navigate di React Router:

```typescript
import { useNavigate } from "react-router-dom";

const UserList: React.FC = () => {
  const navigate = useNavigate();

  const handleUserClick = (id: string) => {
    navigate(`/user/${id}`);
  };

  return (
    <div>
      <h1>User List</h1>
      <ul>
        <li onClick={() => handleUserClick(1)}>User 1</li>
        {/* ... */}
      </ul>
    </div>
  );
};
```

Esercizio:

- [ ] Creare una nuova applicazione React (Create React App)
- [ ] Installare e configurare Axios e React Router
- [ ] Creare un componente `UserList` che visualizzi la lista degli utenti ottenuti dalla chiamata API `/user`
- [ ] Creare un componente `UserDetail` che visualizzi i dettagli di un utente ottenuti dalla chiamata API `/user/{id}`
- [ ] Creare un form per aggiornare i dati di un utente tramite la chiamata API `PUT /user/{id}`

Per questo esercizio non è importante che la grafica sia perfetta, l'importante è che i dati vengano visualizzati e gestisti correttamente.

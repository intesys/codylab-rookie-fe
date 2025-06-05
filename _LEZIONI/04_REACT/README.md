# 04 - REACT

> **Nota**: In questo tutorial utilizziamo Vite come build tool invece di Create React App (CRA). Vite offre tempi di compilazione più rapidi e una migliore esperienza di sviluppo.

## 1) **Thinking in React**

- [React.dev - Thinking in React](https://it.react.dev/learn/thinking-in-react)

## 2) **Tutorial Tic-Tac-Toe**

### **Create React App**

```bash
npm create vite@latest tic-tac-toe -- --template react-ts
cd tic-tac-toe
npm run dev
```

Aprire il link [http://localhost:5173/](http://localhost:5173/) per visionare l'applicazione.

- IMPORTANTE: importare il file `./assets/style.css` all'interno della cartella `./tic-tac-toe/src`

- [React.dev - Tutorial: Intro to React](https://react.dev/learn/tutorial-tic-tac-toe)

## 3) **Gestione dei dati in React**

Creiamo una nuova applicazione React:

```bash
npm create vite@latest dummyapp -- --template react-ts
cd dummyapp
npm run dev
```

Per questa parte utilizzeremo [Axios](https://axios-http.com/) come libreria per effettuare le chiamate HTTP e [React Router](https://reactrouter.com/) per gestire le rotte dell'applicazione.

Per installare Axios e React Router eseguire il comando:

```bash
npm install axios react-router-dom
```

Come servizio di API Fake utilizziamo [dummyapi.io](https://dummyapi.io/).

Configuriamo Axios per gestire le chiamate alle API andando a creare il file `./dummyapp/src/api.ts`:

```typescript
import axios from "axios";

// Questo è un valore di esempio. Per ottenere un APP_ID valido:
// 1. Registrarsi su https://dummyapi.io/
// 2. Dopo il login, copiare l'APP_ID dalla dashboard
const APP_ID = "60a9b7b4e7f2c4b7a0a0e7d1"; // Sostituire con il proprio APP_ID

const api = axios.create({
  baseURL: "https://dummyapi.io/data/v1",
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
        <Route path={"/user/:id/edit"} element={/*Componente UserDetailEdit*/} />
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
        <li onClick={() => handleUserClick("1")}>User 1</li>
        {/* ... */}
      </ul>
    </div>
  );
};
```

## 4) **Esercizio pratico: Gestione dei Post**

In questo esercizio metteremo in pratica quanto appreso creando nuovi componenti e configurando il routing:

### Requisiti:

- [ ] Configurare due nuove voci del routing '/post' e '/post/:id' e associare i componenti `PostList` e `PostDetail`
- [ ] Creare un componente `PostList` che visualizzi la lista post ottenuti dalla chiamata API `/post`
- [ ] Creare un componente `PostDetail` che visualizzi i dettagli di un post ottenuti dalla chiamata API `/post/{id}`
- [ ] Stilare sia il componente `PostList` che `PostDetail` utilizzando il CSS in modo da rendere l'applicazione più gradevole

### Suggerimento di implementazione:

Per il componente `PostList`, potete strutturarlo in questo modo:

```typescript
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "./api";

// Definire i tipi per i dati
interface Post {
  id: string;
  title: string;
  // altri campi in base alla struttura dei dati restituiti dall'API
}

interface PostResponse {
  data: Post[];
  // altri campi della risposta API
}

const PostList: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Recuperare i posts all'avvio del componente
    api.get("/post").then((response) => {
      setPosts(response.data.data);
    });
  }, []);

  const handlePostClick = (id: string) => {
    navigate(`/post/${id}`);
  };

  return (
    <div className="post-list">
      <h1>Post List</h1>
      {posts.map((post) => (
        <div key={post.id} onClick={() => handlePostClick(post.id)} className="post-item">
          <h2>{post.title}</h2>
          {/* Altri dettagli del post */}
        </div>
      ))}
    </div>
  );
};

export default PostList;
```

Per questo esercizio non è importante che la grafica sia perfetta, l'importante è che i dati vengano visualizzati e gestiti correttamente.

## 5) **Verifica finale**

Una volta completato l'esercizio, il tuo routing dovrebbe includere tutte queste rotte:

```typescript
const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<UserList />} />
        <Route path={"/user/:id"} element={<UserDetail />} />
        <Route path={"/user/:id/edit"} element={<UserDetailEdit />} />
        <Route path={"/post"} element={<PostList />} />
        <Route path={"/post/:id"} element={<PostDetail />} />
      </Routes>
    </BrowserRouter>
  );
};
```

Per testare la tua applicazione:

1. Verifica che la navigazione tra le diverse pagine funzioni correttamente
2. Controlla che i dati vengano caricati e visualizzati correttamente
3. Assicurati che il CSS applicato renda l'interfaccia utente gradevole e usabile

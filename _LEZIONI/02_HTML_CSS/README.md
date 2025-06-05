# 02 - HTML & CSS

In questo modulo verranno introdotti i concetti base di HTML e CSS, i due linguaggi fondamentali per la creazione di pagine web.

## 1) **HTML**

HTML (HyperText Markup Language) è il linguaggio standard per la creazione e strutturazione dei contenuti di una pagina web.

Struttura base di un documento HTML

```html
<!DOCTYPE html>
<html lang="it">
  <head>
    <title>Titolo pagina</title>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  </head>
  <body>
    <!-- Contenuto della pagina -->
  </body>
</html>
```

### Elementi HTML principali:

- `<h1>` - `<h6>`: Intestazioni / Titoli
- `<p>`: Paragrafo
- `<a href="url">`: Link
- `<img src="url" alt="descrizione">`: Immagine
- `<ul>`, `<ol>`, `<li>`: Liste (non ordinate, ordinate, elementi)
- `<div>`: Contenitore generico
- `<span>`: Contenitore inline generico
- `<header>`, `<footer>`, `<section>`, `<nav>`: Elementi semantici

Link utili:

- HTML Tags > [Cheat Sheet](./_doc/HTML-Cheat-sheet.pdf)
- [MDN Web Docs - HTML](https://developer.mozilla.org/it/docs/Web/HTML)

## 2) **CSS**

CSS (Cascading Style Sheets) è il linguaggio utilizzato per definire lo stile e la presentazione di un documento HTML.

Struttura base di un documento CSS

```css
/* Commento */
selettore {
  proprietà: valore;
}
```

### Selettori principali:

- ID: `#id` - Seleziona un elemento con un ID specifico (deve essere unico nella pagina)
- Class: `.class` - Seleziona tutti gli elementi con una determinata classe
- Tag: `tag` (es. `div`, `header`, `ul`, `li`) - Seleziona tutti gli elementi con quel tag
- Universale: `*` - Seleziona tutti gli elementi
- Attributo: `[attributo=valore]` - Seleziona elementi con un attributo specifico

### Concatenazione dei selettori:

```css
#id.class {
  proprietà: valore;
}

/* Elementi discendenti (qualsiasi livello) */
div p {
  proprietà: valore;
}

/* Elementi figli diretti */
div > p {
  proprietà: valore;
}

/* Elementi adiacenti */
div + p {
  proprietà: valore;
}
```

### Proprietà CSS comuni:

```css
.elemento {
  /* Colori e sfondi */
  color: #333;
  background-color: white;
  background-image: url("immagine.jpg");

  /* Testo */
  font-family: Arial, sans-serif;
  font-size: 16px;
  font-weight: bold;
  text-align: center;

  /* Box model */
  width: 300px;
  height: 200px;
  margin: 10px;
  padding: 20px;
  border: 1px solid black;

  /* Posizionamento */
  position: relative;
  top: 0;
  left: 0;
  z-index: 1;

  /* Visualizzazione */
  display: block;
  visibility: visible;
}
```

### Specificity (Specificità):

La specificità determina quale regola CSS viene applicata quando più regole riguardano lo stesso elemento:

1. Style inline: `<div style="...">`
2. ID: `#header`
3. Classi, attributi e pseudo-classi: `.active`, `[type="text"]`, `:hover`
4. Elementi e pseudo-elementi: `div`, `p`, `::before`

Link utili:

- Selettori CSS > [Cheat Sheet](./_doc/CSS-Cheat-sheet.pdf)
- [MDN Web Docs - CSS](https://developer.mozilla.org/it/docs/Web/CSS)

## 3) **HTML + CSS**

Esistono tre metodi principali per collegare il CSS all'HTML:

### 1. CSS Inline (all'interno dell'attributo style)

```html
<div style="color: blue; font-size: 16px;">Questo è un testo blu</div>
```

**Pro**: Applicazione immediata a un singolo elemento.  
**Contro**: Difficile da mantenere, non riutilizzabile.

### 2. CSS Interno (all'interno del tag style)

```html
<!DOCTYPE html>
<html lang="it">
  <head>
    <title>Titolo pagina</title>
    <style>
      div {
        color: blue;
        font-size: 16px;
      }

      .highlight {
        background-color: yellow;
      }
    </style>
  </head>
  <body>
    <div>Questo è un testo blu</div>
    <div class="highlight">Questo è un testo blu con sfondo giallo</div>
  </body>
</html>
```

**Pro**: Non richiede file esterni, tutte le regole in un unico punto.  
**Contro**: Solo per la pagina corrente, aumenta dimensioni del file HTML.

### 3. CSS Esterno (collegato tramite link)

```html
<!DOCTYPE html>
<html lang="it">
  <head>
    <title>Titolo pagina</title>
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
    <!-- Contenuto della pagina -->
  </body>
</html>
```

File `style.css`:

```css
div {
  color: blue;
  font-size: 16px;
}

.highlight {
  background-color: yellow;
}
```

**Pro**: Separazione di presentazione e contenuto, file CSS riutilizzabile, caching del browser.  
**Contro**: Richiede un file aggiuntivo.

## 4) **Responsive Layout**

Il design responsive permette alle pagine web di adattarsi a diverse dimensioni dello schermo, dall'ampio monitor del desktop allo smartphone.

### Media Queries

Le media queries permettono di applicare stili diversi in base alle caratteristiche del dispositivo:

```css
/* Stile base per tutti i dispositivi */
body {
  font-size: 16px;
}

/* Dispositivi mobile (max 600px) */
@media (max-width: 600px) {
  body {
    font-size: 14px;
  }

  .menu {
    display: none;
  }
}

/* Tablet e dispositivi di medie dimensioni */
@media (min-width: 600px) and (max-width: 1200px) {
  .container {
    width: 90%;
  }
}

/* Solo orientamento orizzontale */
@media (orientation: landscape) {
  /* CSS */
}
```

### **Flexbox**

Flexbox è un modello di layout unidimensionale progettato per organizzare elementi in riga o colonna.

```css
.container {
  display: flex;

  /* Direzione del flusso (row, column, row-reverse, column-reverse) */
  flex-direction: row;

  /* Gestione degli elementi che superano la dimensione del container (nowrap, wrap, wrap-reverse) */
  flex-wrap: wrap;

  /* Shorthand per flex-direction e flex-wrap */
  flex-flow: row wrap;

  /* Allineamento orizzontale (flex-start, flex-end, center, space-between, space-around, space-evenly) */
  justify-content: space-between;

  /* Allineamento verticale (flex-start, flex-end, center, stretch, baseline) */
  align-items: center;

  /* Allineamento delle righe quando ci sono più linee (flex-start, flex-end, center, stretch, space-between, space-around) */
  align-content: stretch;
}

/* Proprietà per gli elementi figli */
.item {
  /* Fattore di crescita rispetto agli altri elementi */
  flex-grow: 1;

  /* Fattore di riduzione rispetto agli altri elementi */
  flex-shrink: 1;

  /* Dimensione base dell'elemento */
  flex-basis: 200px;

  /* Shorthand per flex-grow, flex-shrink e flex-basis */
  flex: 1 1 200px;

  /* Allineamento specifico dell'elemento che sovrascrive align-items */
  align-self: center;

  /* Ordine di visualizzazione dell'elemento */
  order: 2;
}
```

### **CSS Grid**

Grid è un sistema di layout bidimensionale che permette di creare griglie complesse.

```css
.container {
  display: grid;

  /* Definisce le colonne della griglia */
  grid-template-columns: 200px 1fr 2fr;

  /* Alternativa usando repeat() */
  grid-template-columns: repeat(3, 1fr);

  /* Definisce le righe della griglia */
  grid-template-rows: 100px auto 100px;

  /* Spazio tra le celle */
  grid-gap: 10px;
  /* o in alternativa */
  column-gap: 10px;
  row-gap: 20px;

  /* Allineamento orizzontale degli elementi (start, center, end, stretch) */
  justify-items: stretch;

  /* Allineamento verticale degli elementi (start, center, end, stretch) */
  align-items: center;
}

/* Posizionamento di un elemento specifico nella griglia */
.item {
  /* Specifica inizio e fine di riga e colonna */
  grid-column-start: 1;
  grid-column-end: 3;
  grid-row-start: 1;
  grid-row-end: 2;

  /* Shorthand per start e end */
  grid-column: 1 / 3; /* o anche 1 / span 2 */
  grid-row: 1 / 2;

  /* Allineamento specifico dell'elemento */
  justify-self: center;
  align-self: end;
}
```

## 5) **Best Practices**

- Utilizzare HTML semantico per migliorare l'accessibilità
- Separare HTML (struttura) dal CSS (presentazione)
- Utilizzare classi CSS descrittive e riutilizzabili
- Mantenere una struttura CSS organizzata e commentata
- Testare su diversi dispositivi e browser
- Ottimizzare le immagini e le risorse
- Considerare l'accessibilità (contrasto colori, tag alt per le immagini)

## Risorse utili

- [MDN Web Docs - HTML](https://developer.mozilla.org/it/docs/Web/HTML)
- [MDN Web Docs - CSS](https://developer.mozilla.org/it/docs/Web/CSS)
- [CSS-Tricks - Guida completa a Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
- [CSS-Tricks - Guida completa a Grid](https://css-tricks.com/snippets/css/complete-guide-grid/)
- [Can I Use](https://caniuse.com/) - Compatibilità browser

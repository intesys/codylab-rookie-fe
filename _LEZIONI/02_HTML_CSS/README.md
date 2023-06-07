# 02 - HTML & CSS

## 1) **HTML**

Stuttura base di un documento HTML

```html
<!DOCTYPE html>
<html lang="it">
  <head>
    <title>Titolo pagina</title>
  </head>
  <body>
    <!-- Contenuto della pagina -->
  </body>
</html>
```

Link utili:

- HTML Tags > [Cheat Sheet](./_doc/HTML-Cheat-sheet.pdf)

## 2) **CSS**

Struttura base di un documento CSS

```css
/* Commento */
selettore {
  proprietà: valore;
}
```

Lista dei principali selettori:

- ID: `#id`
- Class: `.class`
- Tag: `tag` (es. `div,header,ul,li`)

Concatenazione dei selettori

```css
#id.class {
  proprietà: valore;
}
```

Link utili:

- Selettori CSS >
  [Cheat Sheet](./_doc/CSS-Cheat-sheet.pdf)

## 3) **HTML + CSS**

Utilizzare il CSS all'interno del proprio documento HTML

```html
<!DOCTYPE html>
<html lang="it">
  <head>
    <title>Titolo pagina</title>
    <style>
      /* CSS */
    </style>
  </head>
  <body>
    <!-- Contenuto della pagina -->
  </body>
</html>
```

Importare un file CSS all'interno del proprio documento HTML

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

## 4) **Responsive Layout**

Utilizzare il CSS per creare un layout responsive

```css
@media (max-width: 600px) {
  /* CSS */
}
```

```css
@media (min-width: 600px and max-width: 1200px) {
  /* CSS */
}
```

### **Flexbox**

Utilizzare il Flexbox per creare un layout responsive

```css
.container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
}
```

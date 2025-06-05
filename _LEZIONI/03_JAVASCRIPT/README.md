# 03 - JAVASCRIPT

## 1) **Tipo di dato**

- MDN - [Data types](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#data_types)
  - Primitive type: Number, String, Boolean, Null, Undefined
  - Non primitive type: Object, Array, Function

## 2) **let e const**

- [MDN - let](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let)
- [MDN - const](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const)

```javascript
let school = "SheCodes";
let fullPackage = "SheCodes Pro";
let projects = 4;
let awesome = true;

let x = 1;

if (x === 1) {
  let x = 2;

  console.log(x);
  // Expected output: 2
}

console.log(x);
// Expected output: 1
```

```javascript
const number = 42;

try {
  number = 99;
} catch (err) {
  console.log(err);
  // Expected output: TypeError: invalid assignment to const `number'
  // (Note: the exact output may be browser-dependent)
}

console.log(number);
// Expected output: 42
```

## 3) **Gli operatori**

- [MDN - Operatori](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators)

```javascript
// Aritmetici
let x = 5;
let y = 2;

console.log(x + y);
// Expected output: 7

console.log(x - y);
// Expected output: 3

console.log(x * y);
// Expected output: 10

console.log(x / y);
// Expected output: 2.5

console.log(x % y);
// Expected output: 1

console.log(x ** y);
// Expected output: 25

// Assegnamento
let x = 5;
let y = 2;

console.log((x += y));
// Expected output: 7

console.log((x -= y));
// Expected output: 5

console.log((x *= y));
// Expected output: 10

console.log((x /= y));
// Expected output: 5

console.log((x %= y));
// Expected output: 1

console.log((x **= y));
// Expected output: 1

// Incremento e decremento

let x = 5;
let y = 2;

console.log(x++);
// Expected output: 5

console.log(x);
// Expected output: 6

console.log(++x);
// Expected output: 7

console.log(x--);
// Expected output: 7

console.log(x);
// Expected output: 6

console.log(--x);
// Expected output: 5

// Comparazione
let x = 5;
let y = 2;

console.log(x == y);
// Expected output: false

console.log(x === y);
// Expected output: false

console.log(x != y);
// Expected output: true

console.log(x !== y);
// Expected output: true

console.log(x > y);
// Expected output: true

console.log(x < y);
// Expected output: false

console.log(x >= y);
// Expected output: true

console.log(x <= y);
// Expected output: false

// Logici
let x = 5;
let y = 2;

console.log(x > 3 && y < 5);
// Expected output: true

console.log(x > 3 || y < 1);
// Expected output: true

console.log(!(x > 3 && y < 5));
// Expected output: false

// Stringhe
let x = "SheCodes";
let y = "Pro";

console.log(x + " " + y);
// Expected output: SheCodes Pro

console.log((x += " " + y));
// Expected output: SheCodes Pro

console.log(x.length);
// Expected output: 11

console.log(x[0]);
// Expected output: S

console.log(x[1]);
// Expected output: h

console.log(`${x} ${y}`);
// Expected output: SheCodes Pro
```

## 4) **Prendere decisioni con if / else**

- [MDN - if...else](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else)

```javascript
let x = 5;
let y = 2;

if (x > y) {
  console.log("x è maggiore di y");
  // Expected output: x è maggiore di y
} else {
  console.log("x è minore di y");
  // Expected output: x è minore di y
}
```

```javascript
let x = 5;
let y = 2;

if (x > y) {
  console.log("x è maggiore di y");
  // Expected output: x è maggiore di y
} else if (x < y) {
  console.log("x è minore di y");
  // Expected output: x è minore di y
} else {
  console.log("x è uguale a y");
  // Expected output: x è uguale a y
}
```

```javascript
let x = 5;
let y = 2;

// ternary operator
x > y ? console.log("x è maggiore di y") : console.log("x è minore o uguale a y");
```

## 5) **Ciclo for**

```javascript
//  for loop
for (let i = 0; i < 5; i++) {
  console.log(i);
  // Expected output: 0 1 2 3 4
}
```

## 6) **Switch**

- [MDN - Switch](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/switch)

```javascript
// switch statement

let day = 2;

switch (day) {
  case 0:
    console.log("Domenica");
    break;
  case 1:
    console.log("Lunedì");
    break;
  case 2:
    console.log("Martedì");
    break;
  case 3:
    console.log("Mercoledì");
    break;
  case 4:
    console.log("Giovedì");
    break;
  case 5:
    console.log("Venerdì");
    break;
  case 6:
    console.log("Sabato");
    break;
  default:
    console.log("Non è un giorno della settimana");
    break;
}
```

## 7) **Array**

- [MDN - Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)

```javascript
// Array statement

let array = ["SheCodes", "Pro", 4, true];

console.log(array);
// Expected output: ["SheCodes", "Pro", 4, true]

console.log(array[0]);
// Expected output: SheCodes

console.log(array[1]);
// Expected output: Pro

console.log(array[2]);
// Expected output: 4

console.log(array[3]);
// Expected output: true

console.log(array.length);
// Expected output: 4

console.log(array[array.length - 1]);
// Expected output: true
```

```javascript
// Array methods

let array = ["SheCodes", "Pro", 4, true];

console.log(array);
// Expected output: ["SheCodes", "Pro", 4, true]

array.push("awesome");

console.log(array);
// Expected output: ["SheCodes", "Pro", 4, true, "awesome"]

array.pop();

console.log(array);
// Expected output: ["SheCodes", "Pro", 4, true]

array.shift();

console.log(array);
// Expected output: ["Pro", 4, true]

array.unshift("SheCodes");

console.log(array);
// Expected output: ["SheCodes", "Pro", 4, true]

array.splice(1, 1);

console.log(array);
// Expected output: ["SheCodes", 4, true]

array.splice(1, 0, "Pro");

console.log(array);
// Expected output: ["SheCodes", "Pro", 4, true]

array.map((item, index) => console.log(index, item));

// Expected output:
// 0 SheCodes
// 1 Pro
// 2 4
// 3 true

array.forEach((item, index) => console.log(index, item));

// Expected output:
// 0 SheCodes
// 1 Pro
// 2 4
// 3 true

array.filter((item, index) => item === "Pro");

// Expected output: ["Pro"]
```

## 8) **Object**

Gli oggetti in JavaScript sono contenitori per valori identificati da chiavi, permettendo di organizzare dati correlati.

- [MDN - Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)

```javascript
// Object statement

const person = {
  firstName: "Jane",
  lastName: "Doe",
  age: 30,
  eyeColor: "blue",
  orderIds: [1, 2, 3],
  fullName: function () {
    return `${this.firstName} ${this.lastName}`;
  },
};
```

```javascript
// Object methods

const person = {
  firstName: "Jane",
  lastName: "Doe",
  age: 30,
  eyeColor: "blue",
  orderIds: [1, 2, 3],
  fullName: function () {
    return `${this.firstName} ${this.lastName}`;
  },
};

console.log(person);

// Expected output:
// {
//   firstName: "Jane",
//   lastName: "Doe",
//   age: 30,
//   eyeColor: "blue",
//   orderIds: [1, 2, 3],
//   fullName: function () {
//     return `${this.firstName} ${this.lastName}`;
//   },
// }

console.log(person.firstName);
// Expected output: Jane

console.log(person.lastName);
// Expected output: Doe

console.log(person.age);
// Expected output: 30

console.log(person.eyeColor);
// Expected output: blue

console.log(person.orderIds);
// Expected output: [1, 2, 3]

console.log(person.fullName());
// Expected output: Jane Doe

console.log(person["firstName"]);
// Expected output: Jane
```

## 9) **JSON**

JavaScript Object Notation (JSON) è un formato di scambio dati leggero e indipendente dal linguaggio.

```javascript
// Conversione da oggetto JavaScript a stringa JSON
const person = {
  firstName: "Jane",
  lastName: "Doe",
  age: 30,
};

const jsonString = JSON.stringify(person);
console.log(jsonString);
// Expected output: {"firstName":"Jane","lastName":"Doe","age":30}

// Conversione da stringa JSON a oggetto JavaScript
const jsonObj = JSON.parse(jsonString);
console.log(jsonObj.firstName);
// Expected output: Jane
```

## 10) **Funzioni**

Le funzioni sono blocchi di codice riutilizzabili che eseguono un'operazione specifica e possono essere richiamate quando necessario.

- [MDN - Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)

```javascript
// Function statement
function sum(a, b) {
  return a + b;
}

console.log(sum(1, 2));
// Expected output: 3
```

```javascript
// Function expression
const sum = function (a, b) {
  return a + b;
};

console.log(sum(1, 2));
// Expected output: 3
```

```javascript
// Arrow function
const sum = (a, b) => {
  return a + b;
};

console.log(sum(1, 2));
// Expected output: 3
```

# BONUS - TYPESCRIPT

## 1) **Introduzione a TypeScript**

TypeScript è un linguaggio di programmazione open source sviluppato da Microsoft. È un super-set di JavaScript, ovvero un linguaggio che estende JavaScript aggiungendo tipizzazione statica e altre funzionalità avanzate. Questo permette di trovare errori durante la fase di sviluppo, prima dell'esecuzione del codice.

**Principali vantaggi di TypeScript:**

- Rilevamento degli errori in fase di compilazione
- Migliore supporto IDE (completamento automatico, suggerimenti)
- Codice più manutenibile e documentato
- Refactoring più sicuro

## 2) **Installazione e compilazione**

```bash
# Installazione
npm install -g typescript

# Compilazione
tsc nome_file.ts
```

## 3) **Variabili tipizzate**

```typescript
// Variabili con tipo esplicito
let x: number = 5;
let y: number = 2;

console.log(x + y);
// Expected output: 7

// esempio di errore
console.log(x + " " + y);
// Expected output: error TS2362: The left-hand side of an arithmetic operation must be of type 'any', 'number', 'bigint' or an enum type.
```

```typescript
// Altri esempi di variabili tipizzate
let school: string = "Coding Bootcamp";
let fullPackage: string = "Full Stack Course";
let projects: number = 4;
let awesome: boolean = true;
let array: string[] = ["HTML", "CSS", "JavaScript"];
```

## 4) **Funzioni tipizzate**

```typescript
// Funzione con parametri e valore di ritorno tipizzati
function sum(a: number, b: number): number {
  return a + b;
}

console.log(sum(1, 2));
// Expected output: 3

// esempio di errore
console.log(sum("1", "2"));
// Expected output: error TS2345: Argument of type '"1"' is not assignable to parameter of type 'number'.
```

## 5) **Types e Interfaces**

In TypeScript, i types e le interfaces sono strumenti per definire la forma degli oggetti. La differenza principale è che un'interfaccia può essere estesa dopo la sua definizione, mentre un type è immutabile una volta definito.

### 5.1) **Definizione base**

```typescript
// Definizione di un Type
type Course = {
  name: string;
  duration: number;
  isActive?: boolean; // Proprietà opzionale
};

// Definizione di un'Interface
interface Student {
  name: string;
  age: number;
  courses?: string[]; // Proprietà opzionale
}

// Utilizzo
let webDevelopment: Course = {
  name: "Web Development",
  duration: 12,
  isActive: true,
};

let student: Student = {
  name: "Alice",
  age: 25,
  courses: ["HTML", "CSS", "JavaScript"],
};
```

### 5.2) **Estensione**

```typescript
// Estensione di Interface
interface BasicCourse {
  name: string;
  duration: number;
}

// L'interfaccia AdvancedCourse eredita tutte le proprietà di BasicCourse
interface AdvancedCourse extends BasicCourse {
  advanced: boolean;
  topics: string[];
}

// Estensione di Type
type BasicCourseType = {
  name: string;
  duration: number;
};

// Il tipo AdvancedCourseType combina le proprietà di BasicCourseType con nuove proprietà
type AdvancedCourseType = BasicCourseType & {
  advanced: boolean;
  topics: string[];
};
```

### 5.3) **Utility Types**

TypeScript fornisce diversi utility types per trasformare i tipi:

```typescript
// Omit - Rimuove proprietà specifiche
interface FullCourse {
  name: string;
  duration: number;
  advanced: boolean;
  price: number;
}

// Crea un tipo che omette 'price'
interface ShortCourse extends Omit<FullCourse, "price"> {
  // Ha name, duration, advanced ma non price
}

// Pick - Seleziona solo alcune proprietà
interface CoursePreview extends Pick<FullCourse, "name" | "duration"> {
  // Contiene solo name e duration
}

// Partial - Rende tutte le proprietà opzionali
interface CourseUpdate extends Partial<FullCourse> {
  // Tutte le proprietà diventano opzionali
}
```

## 6) **Enum**

Gli enum permettono di definire un insieme di costanti con nome:

```typescript
// Definizione di un enum
enum CourseCategory {
  WebDevelopment = "Web Development",
  MobileDevelopment = "Mobile Development",
  DataScience = "Data Science",
}

console.log(CourseCategory.WebDevelopment);
// Expected output: Web Development
```

## 7) **Confronto JavaScript vs TypeScript**

Ecco alcuni esempi di codice JavaScript e le loro controparti in TypeScript:

| JavaScript                             | TypeScript                                                                     |
| -------------------------------------- | ------------------------------------------------------------------------------ | ------ | ------------------------------- |
| `function sum(a, b) { return a + b; }` | `function sum(a: number, b: number): number { return a + b; }`                 |
| `const person = { name: "Alice" };`    | `interface Person { name: string; } const person: Person = { name: "Alice" };` |
| `let items = [1, "two", true];`        | `let items: (number                                                            | string | boolean)[] = [1, "two", true];` |

## 8) **Risorse utili**

- [TypeScript - Basic Types](https://www.typescriptlang.org/docs/handbook/basic-types.html)
- [TypeScript Playground](https://www.typescriptlang.org/play) - Per testare il codice TypeScript online
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html) - Documentazione completa
- [JavaScript to TypeScript](https://www.typescriptlang.org/docs/handbook/migrating-from-javascript.html) - Guida alla migrazione

## 9) **Esercizi pratici**

### Esercizio 1 - JavaScript

Crea una funzione che accetti un array di numeri e restituisca la somma di tutti gli elementi.

### Esercizio 2 - TypeScript

Crea un'interfaccia `Product` con le proprietà: name (string), price (number), inStock (boolean).
Quindi crea una funzione tipizzata che accetti un array di `Product` e restituisca solo i prodotti in stock.

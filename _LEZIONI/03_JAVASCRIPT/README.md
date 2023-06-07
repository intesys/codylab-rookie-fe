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

console.log((x *= y));

console.log((x /= y));

console.log((x %= y));

console.log((x **= y));

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
// Expected output: falsE

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

copnsole.log(`${x} ${y}`);
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
x > y
  ? console.log("x è maggiore di y")
  : console.log("x è minore o uguale a y");
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

<!--  -->

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

## 10) **Funzioni**

<!-- Function statement -->

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

Typescript è un linguaggio di programmazione open source sviluppato da Microsoft. È un super-set di Javascript, ovvero un linguaggio che estende Javascript aggiungendo nuove funzionalità.

## **Installazione**

```bash
npm install -g typescript
```

## **Compilazione**

```bash
tsc nome_file.ts
```

## **Variabili**

```typescript
// Variabili
let x: number = 5;
let y: number = 2;

console.log(x + y);

// Expected output: 7

// esempio di errore

console.log(x + " " + y);

// Expected output: error TS2362: The left-hand side of an arithmetic operation must be of type 'any', 'number', 'bigint' or an enum type.
```

```typescript
// Variabili

let school: string = "SheCodes";
let fullPackage: string = "SheCodes Pro";

let projects: number = 4;

let awesome: boolean = true;

let array: string[] = ["SheCodes", "Pro", "awesome"];
```

```typescript
// Funzioni

function sum(a: number, b: number): number {
  return a + b;
}

console.log(sum(1, 2));

// Expected output: 3

// esempio di errore

console.log(sum("1", "2"));

// Expected output: error TS2345: Argument of type '"1"' is not assignable to parameter of type 'number'.
```

```typescript
// Types or Interfaces

// NB: Type aliases and interfaces are very similar, and in many cases you can choose between them freely. Almost all features of an interface are available in type, the key distinction is that a type cannot be re-opened to add new properties vs an interface which is always extendable.

type School = {
  name: string;
  package: string;
  projects?: number;
  awesome?: boolean;
};

interface School {
  name: string;
  package: string;
  projects?: number;
  awesome?: boolean;
}

let sheCodes: School = {
  name: "SheCodes",
  package: "SheCodes Pro",
  projects: 4,
  awesome: true,
};

// inteface - type extends

interface School {
  name: string;
  package: string;
  projects: number;
  awesome: boolean;
}

interface SheCodes extends School {
  students: number;
}

type School = {
  name: string;
  package: string;
  projects?: number;
  awesome?: boolean;
};

type SheCodes = School & {
  students: number;
};

// Interface - type omit

interface School {
  name: string;
  package: string;
  projects: number;
  awesome: boolean;
}

interface SheCodes extends Omit<School, "projects"> {
  students: number;
}

type School = {
  name: string;
  package: string;
  projects: number;
  awesome: boolean;
};

type SheCodes = Omit<School, "projects"> & {
  students: number;
};

// Interface - type pick

interface School {
  name: string;
  package: string;
  projects: number;
  awesome: boolean;
}

interface SheCodes extends Pick<School, "name" | "package"> {}

type School = {
  name: string;
  package: string;
  projects: number;
  awesome: boolean;
};

type SheCodes = Pick<School, "name" | "package"> & {};

// interface - type partial

interface School {
  name: string;
  package: string;
  projects: number;
  awesome: boolean;
}

interface SheCodes extends Partial<School> {}

type School = {
  name: string;
  package: string;
  projects: number;
  awesome: boolean;
};

type SheCodes = Partial<School> & {};
```

```typescript
// enum

enum School {
  SheCodes = "SheCodes",
  SheCodesPro = "SheCodes Pro",
}

console.log(School.SheCodes);
```

- [Typescript - Basic Types](https://www.typescriptlang.org/docs/handbook/basic-types.html)

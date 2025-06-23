// Soluzioni esercizi lezione 03 - JavaScript e TypeScript

// Esercizio 1 - Tipi di dato e variabili
let nome: string = "Mario";
let eta: number = 25;
console.log(nome);
console.log(eta);

// Esercizio 2 - Operatori
let a: number = 10;
let b: number = 5;
console.log(a + b); // Somma
console.log(a * b); // Moltiplicazione

// Esercizio 3 - Array
let frutti: string[] = ["mela", "banana", "arancia"];
console.log(frutti[0]); // Primo elemento
console.log(frutti[frutti.length - 1]); // Ultimo elemento

// Esercizio 4 - Metodi degli array
frutti.push("kiwi");
console.log(frutti); // Dopo aggiunta
frutti.shift();
console.log(frutti); // Dopo rimozione primo elemento

// Esercizio 5 - Oggetti
interface Studente {
  nome: string;
  cognome: string;
  eta: number;
}
let studente: Studente = {
  nome: "Luca",
  cognome: "Rossi",
  eta: 20,
};
console.log(studente.nome + " " + studente.cognome);

// Esercizio 6 - Interfacce e Funzioni
interface Product {
  name: string;
  price: number;
  inStock: boolean;
}

function getProductsInStock(products: Product[]): Product[] {
  return products.filter((product) => product.inStock);
}

// Esempio d'uso:
const prodotti: Product[] = [
  { name: "Penna", price: 1.5, inStock: true },
  { name: "Quaderno", price: 3, inStock: false },
  { name: "Matita", price: 0.5, inStock: true },
];
console.log(getProductsInStock(prodotti));

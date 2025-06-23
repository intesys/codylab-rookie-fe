// Questo è un commento in JavaScript riga singola
/* 
    Questo è un commento in JavaScript multi riga 
*/
/* 

Esercizio 1

1) Creare una costante che contiene una lista di strighe
2) Intercettare la div che contiene la lista dei box
3) Creare un ciclo for che cicla la lista di stringhe
4) Per ogni stringa creare un box con il contenuto della stringa appendendolo alla div che contiente la lista dei box

*/

console.log("Hello World");

// Esercizio 1 - Tipi di dato e variabili
let nome = "Mario";
let eta = 30;
console.log("Nome:", nome);
console.log("Età:", eta);

// Esercizio 2 - Operatori
let numero1 = 5;
let numero2 = 10;
let somma = numero1 + numero2;
let prodotto = numero1 * numero2;
console.log("Somma:", somma);
console.log("Prodotto:", prodotto);

// Esercizio 3 - Array
let frutti = ["Mela", "Banana", "Arancia"];
console.log("Primo frutto:", frutti[0]);
console.log("Ultimo frutto:", frutti[frutti.length - 1]);

// Esercizio 4 - Metodi degli array
frutti.push("Kiwi");
console.log("Array dopo push:", frutti);

frutti.shift();
console.log("Array dopo shift:", frutti);

// Esercizio 5 - Oggetti
let studente = {
  nome: "Luca",
  cognome: "Rossi",
  eta: 22
};
console.log("Nome completo dello studente:", studente.nome + " " + studente.cognome);

// Esercizio 6 - Interfacce e Funzioni
interface Product {
  name: string;
  price: number;
  inStock: boolean;
}


function filtraProdottiInStock(prodotti:Product[]):Product[] {
  return prodotti.filter(prodotto => prodotto.inStock);
}
// Esempio di utilizzo della funzione
let prodotti:Product[] = [
  { name: "Laptop", price: 1200, inStock: true },
  { name: "Mouse", price: 20, inStock: false },
  { name: "Monitor", price: 300, inStock: true }
];

let prodottiDisponibili = filtraProdottiInStock(prodotti);
console.log("Prodotti in stock:", prodottiDisponibili);




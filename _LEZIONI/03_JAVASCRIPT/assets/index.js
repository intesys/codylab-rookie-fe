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



//es1
let nome = "Elia";
let eta = 18;
console.log(nome, eta);

// Es 2 
let a = 7;
let b = 8;
console.log(a + b); 
console.log(a * b); 

// Es 3
let frutti = ["mela", "banana", "arancia"];
console.log(frutti[0]); 
console.log(frutti[frutti.length - 1]); 
// Es 4
frutti.push("mele");
console.log(frutti); 
frutti.shift();
console.log(frutti); 

// Es 5
let studente = {
  nome: "Elia",
  cognome: "Tosi",
  eta: 18
};
console.log(studente.nome + " " + studente.cognome);

// Es 6
let products = [
  { name: "Penna", price: 1.5, inStock: true },
  { name: "Quaderno", price: 2.0, inStock: false },
  { name: "Matita", price: 0.5, inStock: true }
];

function getProductsInStock(arr) {
  return arr.filter(product => product.inStock);
}

console.log(getProductsInStock(products));

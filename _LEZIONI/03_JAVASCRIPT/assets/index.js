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


// console.log("Hello World");
// window.addEventListener("DOMContentLoaded", () => {

//   const paroleMagiche = [
//     "noooooo",
//     "il",
//     "js",
//     "nooooooooo",
//     "ooooooooo"
//   ];


//   const contenitoreBox = document.querySelector(".box-list");


//   for (let i = 0; i < paroleMagiche.length; i++) {

//     const box = document.createElement("div");
//     box.className = "box";
    
//     const span = document.createElement("span");
//     span.textContent = paroleMagiche[i];

//     box.appendChild(span);
//     contenitoreBox.appendChild(box);
//   }
// });

//------------------------------


window.addEventListener("DOMContentLoaded", () => {


  // Esercizio 1
  const nome = "Mario";
  const eta = 18;
  console.log("Esercizio 1:");
  console.log("Nome:", nome);
  console.log("Età:", eta);
  console.log("\n");

  // Esercizio 2
  const num1 = 5;
  const num2 = 3;
  const somma = num1 + num2;
  const prodotto = num1 * num2;
  console.log("Esercizio 2:");
  console.log("Somma:", somma);
  console.log("Moltiplicazione:", prodotto);
  console.log("\n");

  // Esercizio 3
  const frutti = ["Mela", "Banana", "Kiwi"];
  console.log("Esercizio 3:");
  console.log("Primo frutto:", frutti[0]);
  console.log("Ultimo frutto:", frutti[frutti.length - 1]);
  console.log(frutti.length);
  console.log("\n");

  // Esercizio 4
  frutti.push("Mango");
  console.log("Esercizio 4:");
  console.log("Dopo aggiunta:", frutti);
  frutti.shift();
  console.log("Dopo rimozione del primo:", frutti);
  console.log("\n");

  //esercizio 5ù

  const studente = {
    nome: "Luca",
    cognome: "Rossi",
    eta: 17
  };
  console.log("Esercizio 5:");
  console.log("Nome completo:", studente.nome + " " + studente.cognome);
  console.log("\n");


  // Esercizio 6
  function filtraProdottiDisponibili(prodotti) {
    return prodotti.filter(p => p.inStock === true);
  }
  const prodotti = [
    { name: "Mouse", price: 20, inStock: true },
    { name: "Tastiera", price: 50, inStock: false },
    { name: "Monitor", price: 200, inStock: true }
  ];
  const disponibili = filtraProdottiDisponibili(prodotti);
  console.log("Esercizio 6:");
  console.log("Prodotti disponibili:", disponibili);
});


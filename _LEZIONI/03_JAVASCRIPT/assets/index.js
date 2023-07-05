// Questo è un commento in JavaScript riga singola
/* 
    Questo è un commento in JavaScript multi riga 
*/

/*
Esercizio 1

1) Creare una costante che contiene una lista di stringhe (n che vogliamo noi (meglio multiplo di 3))
2) Intercettare la div che contiene la lista dei box
3) Creare un ciclo for che cicla la lista di stringhe
4) Per ogni stringa creare un box con il contenuto della stringa appendendolo alla div che contiene la lista dei box
*/

const lista = ["a", "b", "c", "d", "e", "f", "g", "h"];

const posizione = document.getElementsByClassName("box-list")[0];
// creo box
for(let j=0; j<lista.length; j++){
    let i=0;
    // creo div sotto box-list
    i=document.createElement("div");
    // ci aggiungo l'array
    posizione.appendChild(i);
    // do class box ad ogni div
    i.classList.add('box');

    // aggiungo testo dentro box
    let textStringBox = document.createTextNode(lista[j]);
    // scrivo testo
    i.appendChild(textStringBox);
    i++;
}


/*
versione migliore

const lista = ["a", "b", "c", "d", "e", "f", "g", "h"];
const posizione = document.getElementsByClassName("box-list")[0];

lista.map((item)=>{
    posizione.innerHTML += `<div class="box"><span>${item}</span></div>`
})
*/
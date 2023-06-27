/*

Esercizio 1

1) Creare una costante che contiene una lista di strighe
2) Intercettare la div che contiene la lista dei box
3) Creare un ciclo for che cicla la lista di stringhe
4) Per ogni stringa creare un box con il contenuto della stringa appendendolo alla div che contiente la lista dei box

 */


const stringhe = 

[
    "Uno","Due","Tre","Quattro","Cinque","Sei","Sette","Otto","Nove"
];

const box = document.getElementsByClassName("box-list")[0];

stringhe.map((item) => {

    box.innerHTML += `<div class="box"><span>${item}</span></div>`

});


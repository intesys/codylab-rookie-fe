// Questo è un commento in JavaScript riga singola
/* 
    Esercizio 1

1) Creare una costante che contiene una lista di strighe

2) Intercettare la div che contiene la lista dei box

3) Creare un ciclo for che cicla la lista di stringhe

4) Per ogni stringa creare un box con il contenuto della stringa appendendolo alla div che contiente la lista dei box
*/

const pippobaudo = ["1","2","3","4","5","6"];
for (let i = 0; i < pippobaudo.length; i++) {
    document.getElementsByClassName("box-list")[0].innerHTML += `<div class="box" style="background-color: green;"><span> ${pippobaudo[i]} </span></div>`;
}

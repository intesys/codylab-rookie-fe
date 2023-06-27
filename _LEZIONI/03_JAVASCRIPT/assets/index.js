// Questo è un commento in JavaScript riga singola
/* 
    Questo è un commento in JavaScript multi riga 
*/

const pippobaudo = ["1","2","3","4","5","6"];

const boxList = document.getElementsByClassName("box-list")[0];

for (let i = 0; i < pippobaudo.length; i++) {
    boxList.innerHTML += `<div class="box" style="background-color: green;"><span> ${pippobaudo[i]} </span></div>`;
}

/*

Esercizio 1


 

1) Creare una costante che contiene una lista di strighe

2) Intercettare la div che contiene la lista dei box

3) Creare un ciclo for che cicla la lista di stringhe

4) Per ogni stringa creare un box con il contenuto della stringa appendendolo alla div che contiente la lista dei box

 

*/

const stringhe = ["jala brat", "relja popovic", "vlada matovic", "djordje carkic", "rie", "buba coreli"];

const boxList = document.getElementsByClassName("box-list")[0];

for (let i=0; i<stringhe.length; i++){
    const stringa = stringhe[i];
    const box = document.createElement("div");
    box.textContent = stringa;
    box.classList.add("box");
    boxList.appendChild(box);
}

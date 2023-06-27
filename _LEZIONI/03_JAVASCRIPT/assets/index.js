// Questo è un commento in JavaScript riga singola
/* 
    Questo è un commento in JavaScript multi riga 
*/

//creare una costante che contiene

const stringhe = ["Totti", "Modric", "Ronaldo", "Son", "Messi", "Lukaku"];
const boxList = document.getElementsByClassName("box-list")[0];
for (let i=0; i<stringhe.length; i++){
    const stringa = stringhe[i];
    const box = document.createElement("div");
    box.textContent = stringa;
    i%2==0
        ?box.style.backgroundColor="red"
        :box.style.backgroundColor="#ffd1dc";
    
    box.classList.add("box");
    boxList.appendChild(box);
}
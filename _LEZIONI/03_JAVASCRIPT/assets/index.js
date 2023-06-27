const stringhe = ["Stringa 1", "Stringa 2", "Stringa 3", "Stringa 4", "Stringa 5", "Stringa 6"];

const boxList = document.getElementsByClassName("box-list")[0];

for (let i=0; i<stringhe.length; i++){
    const stringa = stringhe[i];
    const box = document.createElement("div");
    box.textContent = stringa;
    box.classList.add("box");
    boxList.appendChild(box);
}


console.log("Hello World");

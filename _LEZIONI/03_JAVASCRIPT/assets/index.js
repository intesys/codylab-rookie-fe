/*es 1
let nome = "Damiano"
let eta = 18
console.log(nome, eta)*/

/*es 2
let x = 15
let y = 2
console.log(x+y, x*y)*/

/*es 3
let frutti = ["Mela", "Ananas", "Banana"]
console.log(frutti[0], frutti[2])*/

/*es 4
let frutti = ["Mela", "Ananas", "Banana"]
frutti.push("Ciliegie")
console.log(frutti)
frutti.shift()
console.log(frutti)*/

/*es 5
const studente = {
    nome: "Damiano",
    cognome: "Piscitelli",
    eta: 18
}
console.log(studente.nome, studente.cognome)*/

/*es 6
interface Product{
    name: String;
    price: Number;
    inStock: Boolean;
}

function getAvailableProducts(products: Product[]): Product[] {
  return products.filter(product => product.inStock);
}
const inventory: Product[] = [
  { name: "Laptop", price: 1200, inStock: true },
  { name: "Mouse", price: 25, inStock: false },
  { name: "Keyboard", price: 75, inStock: true },
];

const available = getAvailableProducts(inventory);
console.log(available);
*/
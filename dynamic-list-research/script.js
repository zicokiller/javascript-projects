/* 
1- Appeler les data
2- Formater les data
3- Trier les data par ordre alphabétique
4- Afficher les data
5- Filtrer les data via l'input
 */

const searchInput = document.querySelector("#search");
const searchResult = document.querySelector(".table-results"); //pour display les users data

// 1/2- Appeler les data (API) + Formater au format json()
let dataArray;

async function getUsers() {
  const res = await fetch("https://randomuser.me/api/?nat=fr&results=50");

  const { results } = await res.json();

  dataArray = orderList(results); // contient la liste ordonnée
  createUserList(dataArray); //  va injecter les éléments à partir de dataArray
}
getUsers();

// 3- Trier et return les data par ordre alphabétique
function orderList(data) {
  const orderedData = data.sort((a, b) => {
    if (a.name.last.toLowerCase() < b.name.last.toLowerCase()) {
      return -1;
    }
    if (a.name.last.toLowerCase() > b.name.last.toLowerCase()) {
      return 1;
    }
    return 0;
  });
  return orderedData;
}

// 4- Afficher les data (liste des éléments à injecter ds le DOM)
function createUserList(usersList) {
  usersList.forEach((user) => {
    const listItem = document.createElement("div");
    listItem.setAttribute("class", "table-item"); // crée la classe table-item
    listItem.innerHTML = `
        <div class="container-img">
        <img src= ${user.picture.medium}>
        <p class="name">${user.name.last} ${user.name.first}</p>
        </div>
        <p class="email">${user.email}</p>
        <p class="phone">${user.phone}</p>
        `;
    searchResult.appendChild(listItem);
  });
}

// 5- Filtrer les users
searchInput.addEventListener("input", filterData);

function filterData(e) {
  searchResult.innerHTML = ""; // vide la liste en début de recherche (input)

  const searchString = e.target.value.toLowerCase().replace(/\s/g, ""); // je set ma recherche ds une constante, replace delete les espaces

  // Je filtre le tout ds un array depuis dataArray
  const filteredArr = dataArray.filter(
    (el) =>
      // si ce que je tape ds l'input se trouve ds le nom ou prénom alors je l'inclue ds filteredArr
      el.name.first.toLowerCase().includes(searchString) ||
      el.name.last.toLowerCase().includes(searchString) ||
      // si je tape nom + prénom ou prénom + nom
      `${el.name.first + el.name.last}`.toLowerCase().replace(/\s/g, "").includes(searchString) ||
      `${el.name.last + el.name.first}`.toLowerCase().replace(/\s/g, "").includes(searchString)

  );
  createUserList(filteredArr); // recrée une new liste depuis filteredArr
}

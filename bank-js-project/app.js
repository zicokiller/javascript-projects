// //---------------------------------------------------------------------------
// // Constants
// // ---------------------------------------------------------------------------

/* définition de 2 constantes : 'storageKey' et 'serverUrl' pour stocker
 nos data ds le 'localStorage' et call l'API */
const serverUrl = "http://localhost:5000/api";
const storageKey = "savedAccount";

// // ---------------------------------------------------------------------------
// // Router
// // ---------------------------------------------------------------------------

/* on implémente un objet pour mapper nos 2 routes ('login, 'dashboard)
   init: updateDashboard veut dire que chaque x que la page 'dashboard' est affichée,
   la fonction updateDahboard() est appelée pour mettre la page à jour */
const routes = {
  "/login": { templateId: "login" },
  "/dashboard": { templateId: "dashboard", init: refresh },
};

/* 3 étapes : 1- on instancie le template avec l'id "templateId"
              2- on affiche son contenu à l'intérieur de notre app avec 'const view'
              3- "cloneNode(true)" notez que le true est impératif
                 pour afficher l'ensemble du template appelé */

function updateRoute(templateId) {
  const path = window.location.pathname;
  const route = routes[path];
  if (!route) {
    return navigate("dashboard");
  }
  const template = document.getElementById(route.templateId);
  const view = template.content.cloneNode(true);
  const app = document.getElementById("app");
  app.innerHTML = "";
  app.appendChild(view);

  /* permet de dire : si une route (ds const routes = {}) à la prop 'init', tu l'exécutes
    chaque x que la route est appelée, ici c une fonction, en l'occurence 'updateDashboard()' */
  if (typeof route.init === "function") {
    route.init();
  }
}

/* fonction pour naviguer ds notre app */
function navigate(path) {
  window.history.pushState({}, path, path);
  updateRoute();
}

/* fonction qui récupère l'url qd le lien est clické */
function onLinkClick(event) {
  event.preventDefault();
  navigate(event.target.href);
}

// ---------------------------------------------------------------------------
// API interactions
// ---------------------------------------------------------------------------

async function sendRequest(api, method, body) {
  try {
    const response = await fetch(serverUrl + api, {
      method: method || "GET",
      headers: body ? { "Content-Type": "application/json" } : undefined,
      body,
    });
    return await response.json();
  } catch (error) {
    return { error: error.message || "Unknown error" };
  }
}

async function getAccount(user) {
  return sendRequest("/accounts/" + encodeURIComponent(user));
}

async function createAccount(account) {
  return sendRequest("/accounts", "POST", account);
}

async function createTransaction(user, transaction) {
  return sendRequest(
    "/accounts/" + user + "/transactions",
    "POST",
    transaction
  );
}

// // ---------------------------------------------------------------------------
// // Global state
// // ---------------------------------------------------------------------------

/* ici, on centralise ttes les data de l'app ds un objet 'state' */
let state = Object.freeze({
  account: null,
});

/* Avec cette fonction, on crée un new objet 'state' et copions les data du
   précédent 'state' en utilisant le spread operator, puis on remplace les 
   props de l'objet en utilisant les brackets  '[property]:newData'. 'Object.freeze()
   rend l'objet 'state' immutable */

function updateState(property, newData) {
  state = Object.freeze({
    ...state,
    [property]: newData,
  });
  localStorage.setItem(storageKey, JSON.stringify(state.account));
}

// // ---------------------------------------------------------------------------
// // Login/register
// // ---------------------------------------------------------------------------

async function login() {
  const loginForm = document.getElementById("loginForm");
  const user = loginForm.user.value;
  const data = await getAccount(user);

  if (data.error) {
    return updateElement("loginError", data.error);
  }
  updateState("account", data);
  navigate("/dashboard");
}

async function register() {
  const registerForm = document.getElementById("registerForm");
  const formData = new FormData(registerForm); // on fetch la data du form
  const data = Object.fromEntries(formData); // on la convertie en un objet
  const jsonData = JSON.stringify(data); // on la passe au format JSON
  const result = await createAccount(jsonData);

  if (result.error) {
    return console.log("An error occured:", result.error);
  }
  console.log("Account created!", result);
  updateState("account", result);
  navigate("/dashboard");
}

// // ---------------------------------------------------------------------------
// // Dashboard
// // ---------------------------------------------------------------------------

/* Cette méthode 'updateAccountData()' check que le user est correctement loggé
   et recharge les data de 'account' depuis le serveur 

  Puis, elle appelle la fonction 'updateState()' qui va permettre
  de recharger les new data de 'account' chaque x que le dashboard
  est chargé évitant d'avoir à se 'logout' puis se 'login' pour pouvoir récupérer les data */

async function updateAccountData() {
  const account = state.account;
  if (!account) {
    return logout();
  }

  const data = await getAccount(account.user);
  if (data.error) {
    return logout();
  }

  updateState("account", data);
}

/* ici, on update les data 'account' et on met à jour
  le HTML du dashboard, impératif d'appeler cette fonction qd la route
  du dashboard est chargée */
async function refresh() {
  await updateAccountData();
  updateDashboard();
}

function updateDashboard() {
  const account = state.account;
  if (!account) {
    return logout();
  }
  updateElement("description", account.description);
  updateElement("balance", account.balance.toFixed(2));
  updateElement("currency", account.currency);

/* code pour remplir la table row chaque x que le dashboard est appelé
  (date, object, amount) : la méthode 'createDocumentFragment()' crée un nouveau 
  fragment de DOM qui sera ensuite rattaché à notre table HTML */
  const transactionsRows = document.createDocumentFragment();
  for (const transaction of account.transactions) {
    const transactionRow = createTransactionRow(transaction);
    transactionsRows.appendChild(transactionRow);
  }
  updateElement("transactions", transactionsRows);
}

/* fonction qui utilise le template id= 'transaction' pour créer
  des rows ds la table (date, object, amount), qui seront remplis avec le contenu 
  de l'array transactions data */
function createTransactionRow(transaction) {
  const template = document.getElementById("transaction");
  const transactionRow = template.content.cloneNode(true);
  const tr = transactionRow.querySelector("tr");

  tr.children[0].textContent = transaction.date;
  tr.children[1].textContent = transaction.object;
  tr.children[2].textContent = transaction.amount.toFixed(2);
  tr.children[3].textContent = transaction.object;
  tr.children[4].textContent = transaction.object;

  return transactionRow;
}

// display transaction modal
function addTransaction() {
  const dialog = document.getElementById("transactionDialog");
  dialog.classList.add("show");

  // Reset form
  const transactionForm = document.getElementById("transactionForm");
  transactionForm.reset();

  // Set date to today
  transactionForm.date.valueAsDate = new Date();
}

async function confirmTransaction() {
  const dialog = document.getElementById("transactionDialog");
  dialog.classList.remove("show");

  const transactionForm = document.getElementById("transactionForm");

  const formData = new FormData(transactionForm);
  const jsonData = JSON.stringify(Object.fromEntries(formData));
  const data = await createTransaction(state.account.user, jsonData);

  if (data.error) {
    return updateElement("transactionError", data.error);
  }

  // Update local state with new transaction
  const newAccount = {
    ...state.account,
    balance: state.account.balance + data.amount,
    transactions: [...state.account.transactions, data],
  };
  updateState("account", newAccount);

  // Update display
  updateDashboard();
}

async function cancelTransaction() {
  const dialog = document.getElementById("transactionDialog");
  dialog.classList.remove("show");
}

function logout() {
  updateState("account", null);
  navigate("/login");
}

// // ---------------------------------------------------------------------------
// // Utils
// // ---------------------------------------------------------------------------

/* fonction qui update le html */
function updateElement(id, textOrNode) {
  const element = document.getElementById(id);
  element.textContent = ""; /* supprime tous les 'children' (remise à zéro) */
  /* ensuite, la méthode 'append()' permet de rattacher chaque 'text' ou 'DOM nodes'
     à un élément parent */
  element.append(textOrNode);
}

// // ---------------------------------------------------------------------------
// // Init
// // ---------------------------------------------------------------------------

/* la fonction 'init()' va récupérer les data stockées ds le
  'localStorage' chaque x que l'app est chargée et les update
  si le 'state' a changé */
function init() {
  const savedAccount = localStorage.getItem(storageKey);
  if (savedAccount) {
    updateState("account", JSON.parse(savedAccount));
  }
/* window.onpopstate va s'assurer que la template affichée
     est bien mise à jour qd l'historique du browser change,
     elle call simplement la fonction "updateRoute() */
  window.onpopstate = () => updateRoute();
  updateRoute();
}

init();

const APIURL = "https://api.github.com/users/";

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

getUser("zicokiller");
// Je fetch le user via l'input
async function getUser(username) {
  try {
    const resp = await fetch(APIURL + username);
    const respData = await resp.json();
// Je crée une card avec les user data
    createUserCard(respData);
  } catch (error) {
    console.log(error);
  }

  getRepos(username);
}
// Je fetch les Repos du user
async function getRepos(username) {
  try {
    const resp = await fetch(APIURL + username + "/repos");
    const respData = await resp.json();
    console.log(respData);
    addReposToCard(respData);
  } catch (error) {
    console.log(error);
  }
}
// Je crée une card template string
function createUserCard(user) {
  const cardHTML = `
        <div class="card">
            <div>
                <img class="avatar" src="${user.avatar_url}" alt="${user.name}"
            </div>
            <div class="user-info">
                <h2>${user.name}</h2>
                <p>${user.bio}</p>

                    <ul class="info">
                        <li><strong>Followers</strong>${user.followers}</li>
                        <li><strong>Following</strong>${user.following}</li>
                        <li><strong>Repos</strong>${user.public_repos}</li>
                    </ul>
                    <h4>Repos : </h4>
                    <div class="repos" id="repos"></div>
            </div>
        </div>
    `;
  main.innerHTML = cardHTML;
}

// Permet d'ajouter ds la user card tous les repos en créant des balises 'a'
function addReposToCard(repos) {
  const reposEl = document.getElementById("repos");
  repos.slice(0).forEach((repo) => {
    const repoEl = document.createElement("a");

    repoEl.classList.add("repo");

    repoEl.href = repo.html_url;
    repoEl.target = "_blank";
    repoEl.innerText = repo.name;

    reposEl.appendChild(repoEl);
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const user = search.value;

  if (user) {
    getUser(user);

    search.value = "";
  }
});

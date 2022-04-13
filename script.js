const searchWrapper = document.querySelector(".search-input");
const inputBox = document.querySelector("input");
const myrepos = document.querySelector(".myrepos");

function getRepo() {
  let value = inputBox.value;

  if (value == "") {
    searchWrapper.innerHTML = "";
    return;
  }
  let data = fetch(
    `https://api.github.com/search/repositories?q=${value}&per_page=5`
  )
    .then((response) => {
      return response.json();
    })
    .then((response) => templateItems(response.items));
}

function templateItems(items) {
  searchWrapper.innerHTML = "";
  const fragment = document.createDocumentFragment();
  items.forEach((element) => {
    const card = document.createElement("div");
    card.classList.add("card");
    const article = document.createElement("a");
    article.classList.add("card-text");
    article.textContent = element.name;
    article.addEventListener("click", () => {
      const onerepo = document.createElement("div");
      onerepo.classList.add("onerepo");
      const name = document.createElement("p");
      name.classList.add("card-text");
      name.textContent = `Name: ${element.name}`;
      const owner = document.createElement("p");
      owner.classList.add("card-text");
      owner.textContent = `Owner: ${element.owner.login}`;
      const stars = document.createElement("p");
      stars.classList.add("card-text");
      stars.textContent = `Stars: ${element.stargazers_count}`;
      const deleteRepo = document.createElement("a");
      deleteRepo.classList.add("close_repo");
      const image = document.createElement("img");
      image.src = "svg.svg";
      deleteRepo.appendChild(image);
      onerepo.appendChild(name);
      onerepo.appendChild(owner);
      onerepo.appendChild(stars);
      onerepo.appendChild(deleteRepo);
      myrepos.appendChild(onerepo);
      inputBox.value = "";
      deleteRepo.addEventListener("click", deletePost);
      searchWrapper.innerHTML = "";
    });
    card.appendChild(article);
    fragment.appendChild(card);
  });
  searchWrapper.appendChild(fragment);
}

const deletePost = (event) => {
  event.target.parentElement.parentElement.remove();
};

const debounce = (fn, debounceTime) => {
  let inDebounce;
  return function () {
    const context = this;
    const args = arguments;
    clearTimeout(inDebounce);
    inDebounce = setTimeout(() => fn.apply(context, args), debounceTime);
  };
};

inputBox.addEventListener("keyup", debounce(getRepo, 400));

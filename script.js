// Charger les données à partir du fichier JSON
let data;
fetch('data.json')
  .then(response => response.json())
  .then(jsonData => {
    data = jsonData;
  });

// Référence aux éléments HTML
let searchForm = document.getElementById("search-form");
let searchInput = document.getElementById("search-input");
let searchSuggestions = document.getElementById("search-suggestions");

window.addEventListener("onLoad", function(event) {
    searchInput = "";
});

let suggestions=[];

// Gérer l'événement de saisie de la barre de recherche
searchInput.addEventListener("input", function() {
  // Réinitialiser les suggestions
  searchSuggestions.innerHTML = "";

  // Récupérer la saisie de l'utilisateur
  let searchText = searchInput.value;

  // Trouver les entrées qui correspondent à la saisie de l'utilisateur
  suggestions = data.filter(function(item) {
    return item.name.toLowerCase().indexOf(searchText.toLowerCase()) !== -1;
  });

  // Afficher les 3 premières suggestions
  for (let i = 0; i < suggestions.length && i < 3; i++) {
    searchSuggestions.innerHTML += "<a href='#'>" + suggestions[i].name + "</a>";
  }

  // Afficher ou masquer les suggestions
  if (searchText.length > 0) {
    searchSuggestions.style.display = "block";
  } else {
    searchSuggestions.style.display = "none";
  }
});

// Gérer l'événement de soumission du formulaire
searchForm.addEventListener("submit", function(event) {
  event.preventDefault();
  if (searchInput.value.length !== 0) {

    if (suggestions.length > 0) {
        window.location.href = suggestions[0].link;
    }
    else{
        console.log(searchInput.value.toLowerCase());
        suggestions = data.filter(function(item) {
            return item.name.toLowerCase().indexOf(searchInput.value.toLowerCase()) !== -1;
        });
        window.location.href = suggestions[0].link;
    }
  }
});

// Gérer l'événement de clic sur une suggestion
searchSuggestions.addEventListener("click", function(event) {
  let target = event.target;
  if (target.tagName === "A") {
    searchInput.value = target.textContent;
    searchSuggestions.innerHTML = "";
    searchSuggestions.style.display = "none";
  }
});
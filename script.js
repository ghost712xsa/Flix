function continueWatching(movieElement) {
  const continuarAssistindoContainer = document.getElementById('continuar-assistindo-container');


  const filmesNaLista = continuarAssistindoContainer.querySelectorAll('.movie');
  const filmeJaNaLista = Array.from(filmesNaLista).find(filme => filme.src === movieElement.src);

  if (filmeJaNaLista) {
    return; // Sai da função se o filme já estiver na lista
  }


  const movieClone = movieElement.cloneNode(true);
  movieClone.removeAttribute('onclick'); // Remove o evento onclick do clone

  continuarAssistindoContainer.appendChild(movieClone);


  salvarFilmesLocalStorage();
}


function salvarFilmesLocalStorage() {
  const continuarAssistindoContainer = document.getElementById('continuar-assistindo-container');
  const filmes = continuarAssistindoContainer.querySelectorAll('.movie');

  let filmesArray = [];


  filmes.forEach(filme => {
    filmesArray.push(filme.src);
  });

  localStorage.setItem('filmesContinuarAssistindo', JSON.stringify(filmesArray));
}


function carregarFilmesLocalStorage() {
  const filmesContinuarAssistindo = JSON.parse(localStorage.getItem('filmesContinuarAssistindo'));

  if (filmesContinuarAssistindo) {
    const continuarAssistindoContainer = document.getElementById('continuar-assistindo-container');

    filmesContinuarAssistindo.forEach(filme => {
      const movieElement = document.createElement('img');
      movieElement.src = filme;
      movieElement.alt = 'Movie';
      movieElement.classList.add('movie');
      movieElement.onclick = function() {
        continueWatching(this);
      };

      continuarAssistindoContainer.appendChild(movieElement);
    });
  }
}

// Função para limpar a lista de continuar assistindo
function limparContinuarAssistindo() {
  const continuarAssistindoContainer = document.getElementById('continuar-assistindo-container');
  continuarAssistindoContainer.innerHTML = '';

  // Limpa também o localStorage
  localStorage.removeItem('filmesContinuarAssistindo');
}

// Ao carregar a página, verifica e carrega os filmes salvos no localStorage
document.addEventListener('DOMContentLoaded', () => {
  carregarFilmesLocalStorage();
});

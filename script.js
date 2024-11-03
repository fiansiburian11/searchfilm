const searchButton = document.querySelector(".search-button");
searchButton.addEventListener("click", async function () {
  try {
    const inputKeyword = document.querySelector(".input-keyword");
    const movies = await getMovies(inputKeyword.value);
    updateUI(movies);
  } catch (err) {
    alert(err.message); // Menampilkan pesan error yang lebih informatif
  }
});

async function getMovies(keyword) {
  const response = await fetch("https://www.omdbapi.com/?apikey=d467a538&s=" + keyword);

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const data = await response.json(); // Memperbaiki pengetikan dari 'reponse' ke 'response'

  if (data.Response === "False") {
    throw new Error(data.Error);
  }

  return data.Search;
}

function updateUI(movies) {
  let cards = "";
  movies.forEach((m) => (cards += showCards(m))); // Memperbaiki pengetikan dari 'showcards' ke 'showCards'
  const movieContainer = document.querySelector(".movie-container");
  movieContainer.innerHTML = cards; // Memperbaiki pengetikan dari 'moviecontaier' ke 'movieContainer'
}

// Event binding
document.addEventListener("click", async function (e) {
  if (e.target.classList.contains("modal-detail-button")) {
    const imdbId = e.target.dataset.imdbid; // Memperbaiki pengetikan dari 'imdbid' ke 'imdbId'
    const movieDetail = await getMovieDetail(imdbId); // Memperbaiki pengetikan dari 'getmovieDetail' ke 'getMovieDetail'
    updateUIDetail(movieDetail);
  }
});

async function getMovieDetail(imdbId) {
  const response = await fetch("https://www.omdbapi.com/?apikey=d467a538&i=" + imdbId);
  const data = await response.json(); // Memperbaiki pengetikan dari 'm' ke 'data'
  return data;
}

function updateUIDetail(m) {
  const movieDetail = showMovieDetail(m); // Memperbaiki pengetikan dari 'showmovieDetail' ke 'showMovieDetail'
  const modalBody = document.querySelector(".modal-body");
  modalBody.innerHTML = movieDetail;
}

function showCards(m) {
  return `<div class="col-md-4 my-3">
          <div class="card">
            <img src="${m.Poster}" class="card-img-top" />
            <div class="card-body">
              <h5 class="card-title">${m.Title}</h5>
              <h6 class="card-subtitle mb-2 text-muted">${m.Year}</h6>
              <a href="#" class="btn btn-primary modal-detail-button" data-toggle="modal" data-target="#movieDetailModal" data-imdbid="${m.imdbID}">Show Details</a>
            </div>
          </div>
        </div>`;
}

function showMovieDetail(m) {
  // Memperbaiki pengetikan dari 'showmovieDetail' ke 'showMovieDetail'
  return `<div class="container-fluid">   
              <div class="row">
                <div class="col-md-3">
                  <img src="${m.Poster}" class="img-fluid" />
                </div>
                <div class="col-md">
                  <ul class="list-group">
                    <li class="list-group-item"><h4>${m.Title} (${m.Year})</h4></li>
                    <li class="list-group-item"><strong>Director: </strong> ${m.Director}</li>
                    <li class="list-group-item"><strong>Actors: </strong> ${m.Actors}</li>
                    <li class="list-group-item"><strong>Writers: </strong> ${m.Writer}</li>
                    <li class="list-group-item"><strong>Plot: </strong> <br /> ${m.Plot}</li>
                  </ul>
                </div>
              </div>
            </div>`;
}

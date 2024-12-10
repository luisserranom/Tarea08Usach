const API_URL = "https://pokeapi.co/api/v2/pokemon/";

(async function loadPokemons() {
  try {
    const response = await axios.get(API_URL, { params: { limit: 20 } });
    const pokemons = response.data.results;

    const container = document.getElementById("pokemon-container");
    for (const pokemon of pokemons) {
      const details = await axios.get(pokemon.url);
      const imageUrl = details.data.sprites.front_default;

      const card = `
        <div class="col-md-3">
          <div class="card">
            <img src="${imageUrl}" class="card-img-top" alt="${pokemon.name}">
            <div class="card-body text-center">
              <h5 class="card-title">${pokemon.name}</h5>
            </div>
          </div>
        </div>
      `;
      container.innerHTML += card;
    }
  } catch (error) {
    console.error("Error al cargar los Pokémon:", error);
    const container = document.getElementById("pokemon-container");
    container.innerHTML = `<p class="text-danger text-center">Error al cargar los Pokémon.</p>`;
  }
})();

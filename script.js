fetch('https://pokeapi.co/api/v2/pokemon?limit=151&offset=0')
  .then(res => {
    return res.json();
  })
  .then(data => {
    const pokemonList = data.results; // Array of Pokémon objects

    const mainElement = document.querySelector('.pokemon_list');

    pokemonList.forEach(pokemon => {
      // Create a card container for each Pokémon
      const pokemonCard = document.createElement('div');
      pokemonCard.classList.add('pokemon-card');

      // Create an image element for the Pokémon picture
      const pokemonImg = document.createElement('img');
      pokemonImg.classList.add('pokemon-img');

      // Get the Pokémon's ID from its URL
      const pokemonId = getPokemonIdFromUrl(pokemon.url);

      // Set the image source to the Pokémon's picture
      pokemonImg.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;
      pokemonImg.alt = pokemon.name;

      // Create a paragraph element for the Pokémon's name
      const pokemonName = document.createElement('p');
      pokemonName.classList.add('pokemon-name');
      pokemonName.textContent = pokemon.name;

      // Append the image and name to the card container
      pokemonCard.appendChild(pokemonImg);
      pokemonCard.appendChild(pokemonName);

      // Append the card container to the main element
      mainElement.appendChild(pokemonCard);
    });
  })
  .catch(error => {
    console.error('Error fetching Pokémon:', error);
  });

// Function to extract Pokémon ID from its URL
function getPokemonIdFromUrl(url) {
  const parts = url.split('/');
  return parts[parts.length - 2];
}



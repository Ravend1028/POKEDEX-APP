document.addEventListener('DOMContentLoaded', function() {
  const searchInput = document.querySelector('.search_input');
  const searchButton = document.querySelector('.search_button');
  const pokemonListContainer = document.querySelector('.pokemon_list');

  function filterPokemonList() {
    const searchTerm = searchInput.value.toLowerCase(); // Convert input to lowercase for case-insensitive comparison
    const pokemonCards = document.querySelectorAll('.pokemon-card');
    let pokemonFound = false; // Flag to check if any Pokémon is found

    pokemonCards.forEach(pokemonCard => {
      const pokemonName = pokemonCard.querySelector('p').textContent.toLowerCase(); // Get the Pokémon name and convert to lowercase

      if (pokemonName.includes(searchTerm) || searchTerm === '') {
        pokemonCard.style.display = 'block'; // Show the Pokémon card if its name includes the search term or if the search term is empty
        pokemonFound = true; // Set the flag to true if a Pokémon is found
      } else {
        pokemonCard.style.display = 'none'; // Hide the Pokémon card if its name doesn't include the search term
      }
    });

    // Display "No Pokémon found" message if no Pokémon is found
    if (!pokemonFound) {
      const noPokemonFoundMessage = document.createElement('p');
      noPokemonFoundMessage.textContent = 'No Pokémon found';
      noPokemonFoundMessage.classList.add('no-pokemon-found');
      
      // Check if the message already exists, if yes, remove it before adding again
      const existingMessage = pokemonListContainer.querySelector('.no-pokemon-found');
      if (existingMessage) {
        existingMessage.remove();
      }
      
      pokemonListContainer.appendChild(noPokemonFoundMessage);
    } else {
      // Remove the "No Pokémon found" message if Pokémon are found
      const existingMessage = pokemonListContainer.querySelector('.no-pokemon-found');
      if (existingMessage) {
        existingMessage.remove();
      }
    }
  }

  searchInput.addEventListener('input', filterPokemonList); // Listen for input events on the search input
  searchButton.addEventListener('click', filterPokemonList); // Listen for click events on the search button
});


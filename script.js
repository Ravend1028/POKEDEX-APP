document.addEventListener('DOMContentLoaded', function() {
  const mainElement = document.querySelector('.pokemon_list');

  function displayPokemonCard(pokemon) {
    const pokemonCard = document.createElement('div');
    pokemonCard.classList.add('pokemon-card');

    const pokemonImg = document.createElement('img');
    pokemonImg.classList.add('pokemon-img');
    pokemonImg.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`;
    pokemonImg.alt = pokemon.name;
    pokemonCard.appendChild(pokemonImg);

    const pokemonName = document.createElement('p');
    pokemonName.textContent = pokemon.name;
    pokemonCard.appendChild(pokemonName);

    pokemonCard.addEventListener('click', () => {
      fetchPokemonData(`https://pokeapi.co/api/v2/pokemon/${pokemon.id}`);
    });

    mainElement.appendChild(pokemonCard);
  }

  function displayPokemonDetails(pokemon) {
    // Create container for Pokémon details
    const detailsContainer = document.createElement('div');
    detailsContainer.classList.add('pokemon-details');
  
    // Create and display Pokémon image
    const pokemonImg = document.createElement('img');
    pokemonImg.classList.add('pokemon-img');
    pokemonImg.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`;
    pokemonImg.alt = pokemon.name;
    detailsContainer.appendChild(pokemonImg);
  
    // Create and display Pokémon name
    const pokemonName = document.createElement('p');
    pokemonName.classList.add('pokemon-name');
    pokemonName.textContent = pokemon.name;
    detailsContainer.appendChild(pokemonName);
  
    // Create and display Pokémon stats
    const statsContainer = document.createElement('div');
    statsContainer.classList.add('pokemon-stats-container');
  
    pokemon.stats.forEach(stat => {
      const statItem = document.createElement('div');
      statItem.classList.add('stat-item');
      statItem.textContent = `${stat.stat.name}: ${stat.base_stat}`;
      statsContainer.appendChild(statItem);
    });
  
    detailsContainer.appendChild(statsContainer);
  
    // Create back button
    const backButton = document.createElement('button');
    backButton.innerHTML = '<i class="fas fa-arrow-left"></i>';
    backButton.classList.add('back-button'); // Add the back button style class
    backButton.addEventListener('click', () => {
      window.location.reload(); // Reload the page to go back to the initial list
    });
    detailsContainer.appendChild(backButton);

    // Clear existing content and append details container
    mainElement.innerHTML = '';
    mainElement.appendChild(detailsContainer);
  }  

  function fetchPokemonData(url) {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        displayPokemonDetails(data);
      })
      .catch(error => {
        console.error('Error fetching Pokémon data:', error);
      });
  }

  fetch('https://pokeapi.co/api/v2/pokemon?limit=151&offset=0')
    .then(response => response.json())
    .then(data => {
      const pokemonList = data.results;
      pokemonList.forEach((pokemon, index) => {
        const pokemonId = index + 1;
        displayPokemonCard({ id: pokemonId, name: pokemon.name });
      });
    })
    .catch(error => {
      console.error('Error fetching Pokémon list:', error);
    });
});
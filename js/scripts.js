
let pokemonRepository = (function () {
    let pokemonList = [
        { name: 'Lapras', pokedexNumber: 31, height: 250, weight: 220, type: ['water', 'ice'] },
        { name: 'Dragonite', pokedexNumber: 149, height: 220, weight: 210, type: ['dragon', 'flying'] },
        { name: 'Azumarill', pokedexNumber: 184, height: 80, weight: 28, type: ['water', 'fairy'] },
        { name: 'Charizard', pokedexNumber: 6, height: 170, weight: 90, type: ['flying', 'fire'] },
        { name: 'Butterfree', pokedexNumber: 12, height: 110, weight: 32, type: ['flying', 'bug'] },
        { name: 'Aron', pokedexNumber: 304, height: 40, weight: 60, type: ['steel', 'rock'] }
    ];

    function add(pokemon) {
        pokemonList.push(pokemon);
    }
    function getAll() {
        return pokemonList;
    }


    function pokemonMinMax() {
        //determines the tallest pokemon
        let biggestPokemonHeight = -Infinity;
        let biggestPokemonName = undefined;
        //determines the heaviest pokemon
        let heaviestPokemonWeight = -Infinity;
        let heaviestPokemonName = undefined;
        //determines the smallest pokemon
        let smallestPokemonHeight = Infinity;
        let smallestPokemonName = undefined;
        //determines the lightest pokemon
        let lightestPokemonWeight = Infinity;
        let lightestPokemonName = undefined;

        pokemonList.forEach(function (pokemon) {
            //determines the tallest pokemon
            if (biggestPokemonHeight < pokemon.height) {
                biggestPokemonHeight = pokemon.height;
                biggestPokemonName = pokemon.name;
            }
            //determines the heaviest pokemon
            if (heaviestPokemonWeight < pokemon.weight) {
                heaviestPokemonWeight = pokemon.weight;
                heaviestPokemonName = pokemon.name;
            }
            //determines the smallest pokemon
            if (smallestPokemonHeight > pokemon.height) {
                smallestPokemonHeight = pokemon.height;
                smallestPokemonName = pokemon.name;
            }
            //determines the lightest pokemon
            if (lightestPokemonWeight > pokemon.weight) {
                lightestPokemonWeight = pokemon.weight;
                lightestPokemonName = pokemon.name;
            }

        });
        let pokemonStatArray = [heaviestPokemonWeight, lightestPokemonWeight, biggestPokemonHeight, smallestPokemonHeight];
        return pokemonStatArray;

    }
    function addListItem(pokemon) {
        let pokemonUl = document.querySelector('.pokemon-list');
        let listItem = document.createElement('li');
        listItem.classList.add('each-pokemon');
        let button = document.createElement('button');
        let pokemonStats = pokemonMinMax();
        button.innerText = pokemon.name;
        
        if (pokemonStats[0] === pokemon.weight) {
            button.append(' (I am the heaviest! I weigh ' + pokemon.weight + 'kg!)');
        }
        if (pokemonStats[1] === pokemon.weight) {
            button.append(' (I am the lightest! I weigh ' + pokemon.weight + 'kg!)');
        }
        if (pokemonStats[2] === pokemon.height) {
            button.append(' (I am the tallest! I am ' + pokemon.height + 'cm tall!)');
        }
        if (pokemonStats[3] === pokemon.height) {
            button.append(' (I am the shortest! I am ' + pokemon.height + 'cm tall!)');
        }
        button.classList.add('pokemon-button');
        listItem.appendChild(button);
        pokemonUl.appendChild(listItem);

    }


    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        pokemonMinMax: pokemonMinMax
    };
})();

pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);

});






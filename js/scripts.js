
let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    function add(pokemon) {
        if (
            typeof pokemon === 'object' &&
            'name' in pokemon &&
            'pokedexNumber' in pokemon &&
            'height' in pokemon &&
            'weight' in pokemon &&
            'type' in pokemon

        ) {
            pokemonList.push(pokemon);
        }
        console.log('Pokemon format incorrect');

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
        let pokemonUl = document.querySelector('.pokemon-list'); //pulls from Unordered list
        let listItem = document.createElement('li'); //creates each LI element
        listItem.classList.add('each-pokemon'); //adds class "each-pokemon" to each LI element
        let button = document.createElement('button'); //creates button for pokemon
        let pokemonStats = pokemonMinMax();//figures out the tallest/shortest/heaviest/lightest pokemon
        button.innerText = pokemon.name;//adds pokemon name to each button

        if (pokemonStats[0] === pokemon.weight) {//if pokemon is special, add on to button text about this
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
        button.classList.add('pokemon-button');//adds class 'pokemon-button' to each button
        listItem.appendChild(button);//adds buttons to LIs
        pokemonUl.appendChild(listItem);//adds LIs to UL

        button.addEventListener('click', function () { //shows all details of a pokemon in console when clicked on
            showDetails(pokemon);
        });

    }

    function showDetails(pokemon) {
        console.log(pokemon);
    }

    function loadList() {
        return fetch(apiUrl).then(function (response) {
            return response.json();
        }).then(function (json) {
            json.results.forEach(function (item) {
                let pokemon = {
                    name: item.name,
                    detailsUrl: item.url
                };
                add(pokemon);
            });
        }).catch(function (e) {
            console.error(e);
        })
    }


    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        pokemonMinMax: pokemonMinMax,
        showDetails: showDetails,
        loadList: loadList
    };
})();

pokemonRepository.loadList().then(function () {
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);

    });
})








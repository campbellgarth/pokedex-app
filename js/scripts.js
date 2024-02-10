
let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    function add(pokemon) {
        if (
            typeof pokemon === 'object' &&
            'name' in pokemon &&
            'detailsUrl' in pokemon
        ){
            pokemonList.push(pokemon);
        }
        
    }
    function getAll() {
        return pokemonList;
    }

    function addListItem(pokemon) {
        let pokemonUl = document.querySelector('.pokemon-list'); //pulls from Unordered list
        let listItem = document.createElement('li'); //creates each LI element
        listItem.classList.add('each-pokemon'); //adds class "each-pokemon" to each LI element
        let button = document.createElement('button'); //creates button for pokemon
        button.innerText = pokemon.name;//adds pokemon name to each button
        button.classList.add('pokemon-button');//adds class 'pokemon-button' to each button
        listItem.appendChild(button);//adds buttons to LIs
        pokemonUl.appendChild(listItem);//adds LIs to UL

        button.addEventListener('click', function () { //shows all details of a pokemon in console when clicked on
            showDetails(pokemon);
        });

    }

    function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
            console.log(pokemon);
        });
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

    function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url).then(function (response) {
            return response.json();
        }).then(function (details) {
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
            item.types = details.types;
        }).catch(function (e) {
            console.error(e);
        });
    }


    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        showDetails: showDetails,
        loadList: loadList,
        loadDetails: loadDetails
    };
})();

pokemonRepository.loadList().then(function () {
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);

    });
})









let pokemonRepository = (function () {
    let pokemonList = [];
    let favoritePokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    function add(pokemon) {
        if (
            typeof pokemon === 'object' &&
            'name' in pokemon &&
            'detailsUrl' in pokemon
        ) {
            pokemonList.push(pokemon);
        }
    }

    function getAll() {
        return pokemonList;
    }
    function getAllFavorites() {
        const favoritesString = localStorage.getItem('myFavoritesString');
        const parsedFavorites = favoritesString ? JSON.parse(favoritesString) : [];
        return parsedFavorites;
    }

    function addFavorites(pokemon) {
        const favorites = JSON.parse(localStorage.getItem('myFavoritesString')) || [];

        // Check if the pokemon with the same name already exists in the favorites list
        const isAlreadyFavorited = favorites.some(fav => fav.name === pokemon.name);

        if (isAlreadyFavorited) {
            alert('This Pokémon is already favorited!');
        } else {
            favorites.push(pokemon);
            localStorage.setItem('myFavoritesString', JSON.stringify(favorites));
            alert('Pokémon added to favorites!');
        }
    }

    function clearFavorites() {

        localStorage.clear();
        alert('Favorites List cleared.');
        location.reload();
    }

    function addListItem(pokemon) {
        let pokemonUnorderedList = $('#pokemon-list'); //pulls from Unordered list
        let listItem = $('<li></li>'); //creates each LI element
        listItem.addClass('each-pokemon'); //adds class "each-pokemon" to each LI element
        listItem.addClass('list-group-item'); //adds class "list-group-item" to each LI element for bootstrap
        let button = document.createElement('button'); //creates button for pokemon
        button.classList.add('btn');
        button.classList.add('btn-light');//adds button classes for bootstrap
        button.innerText = pokemon.name;//adds pokemon name to each button
        button.classList.add('pokemon-button');//adds class 'pokemon-button' to each button
        button.setAttribute('data-toggle', 'modal');
        button.setAttribute('data-target', '#modal-container')
        listItem.append(button);//adds buttons to LIs
        pokemonUnorderedList.append(listItem);//adds LIs to UL

        button.addEventListener('click', function () { //shows all details of a pokemon in console when clicked on
            showDetails(pokemon);
        });
    }

    function addListItemFavorites(pokemon) {
        let pokemonUnorderedList = $('#pokemon-list-favorites'); //pulls from Unordered list
        let listItem = $('<li></li>'); //creates each LI element
        listItem.addClass('each-pokemon'); //adds class "each-pokemon" to each LI element
        listItem.addClass('list-group-item'); //adds class "list-group-item" to each LI element for bootstrap
        let button = document.createElement('button'); //creates button for pokemon
        button.classList.add('btn', 'btn-light');//adds button classes for bootstrap
        button.innerText = pokemon.name;//adds pokemon name to each button
        button.classList.add('pokemon-button');//adds class 'pokemon-button' to each button
        button.setAttribute('data-toggle', 'modal');
        button.setAttribute('data-target', '#modal-container')
        listItem.append(button);//adds buttons to LIs
        pokemonUnorderedList.append(listItem);//adds LIs to UL

        button.addEventListener('click', function () { //shows all details of a pokemon in console when clicked on
            showDetailsFavorites(pokemon);
        });
    }

    function showModal(title, height, weight, image, pokemon) {

        let modalTitle = document.querySelector('.modal-title');
        modalTitle.innerText = '';
        modalTitle.innerText = title;
        modalTitle.classList.add('modal-element');
        let modal = document.querySelector('.modal-body');
        let modalFooter = document.querySelector('.modal-footer');
        modalFooter.innerHTML = '';
        modal.innerText = ''
        let heightElement = document.createElement('p');
        heightElement.innerText = 'height: ' + height;
        heightElement.classList.add('modal-element');
        let weightElement = document.createElement('p');
        weightElement.innerText = 'weight: ' + weight;
        weightElement.classList.add('modal-element');

        //add image
        let imageElement = document.createElement('img');
        imageElement.src = image;
        imageElement.classList.add('modal-element');

        //add favorites button to footer
        let favoritesButton = document.createElement('button');
        favoritesButton.classList.add('btn', 'btn-primary', 'favorite-pokemon');
        favoritesButton.innerText = ('Add to my favorites');

        modal.appendChild(heightElement);
        modal.appendChild(weightElement);
        modal.appendChild(imageElement);
        modalFooter.appendChild(favoritesButton);

        let favoritePokemon = document.querySelector('.favorite-pokemon');
        favoritePokemon.addEventListener('click', function () {
            addFavorites(pokemon);
        }
        )
    }

    function showModalFavorites(title, height, weight, image) {

        let modalTitle = document.querySelector('.modal-title');
        modalTitle.innerText = '';
        modalTitle.innerText = title;
        modalTitle.classList.add('modal-element');
        let modal = document.querySelector('.modal-body');
        modal.innerText = ''
        let heightElement = document.createElement('p');
        heightElement.innerText = 'height: ' + height;
        heightElement.classList.add('modal-element');
        let weightElement = document.createElement('p');
        weightElement.innerText = 'weight: ' + weight;
        weightElement.classList.add('modal-element');

        //add image
        let imageElement = document.createElement('img');
        imageElement.src = image;
        imageElement.classList.add('modal-element');

        let clearPokemon = document.querySelector('.clear-pokemon');
        clearPokemon.addEventListener('click', function () {
            clearFavorites();
        }
        )

        modal.appendChild(heightElement);
        modal.appendChild(weightElement);
        modal.appendChild(imageElement);
    }

    function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
            showModal(pokemon.name, pokemon.height, pokemon.weight, pokemon.imageUrl, pokemon);
        });
    }

    function showDetailsFavorites(pokemon) {
        loadDetails(pokemon).then(function () {
            showModalFavorites(pokemon.name, pokemon.height, pokemon.weight, pokemon.imageUrl);
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

    function loadListFavorites() {
        return fetch(apiUrl).then(function (response) {
            return response.json();
        }).then(function (json) {
            json.results.forEach(function (item) {

                let pokemon = {
                    name: item.name,
                    detailsUrl: item.url
                };
                favoritePokemonList.push(pokemon);

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
            item.weight = details.weight;
        }).catch(function (e) {
            console.error(e);
        });
    }

    return {
        add: add,
        addFavorites: addFavorites,
        getAll: getAll,
        getAllFavorites: getAllFavorites,
        addListItem: addListItem,
        addListItemFavorites: addListItemFavorites,
        showDetails: showDetails,
        showDetailsFavorites: showDetailsFavorites,
        loadList: loadList,
        loadListFavorites: loadListFavorites,
        clearFavorites: clearFavorites,
        loadDetails: loadDetails
    };
})();

pokemonRepository.loadList().then(function () {
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);

    });
})

pokemonRepository.loadListFavorites().then(function () {
    pokemonRepository.getAllFavorites().forEach(function (pokemon) {
        pokemonRepository.addListItemFavorites(pokemon);

    });
})










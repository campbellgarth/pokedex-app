
let pokemonRepository = (function () {
    let pokemonList = [];
    let favoritePokemonList = [];
    let myFavorites = [];
    let myFavoritesParsed = [];
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
        return favoritePokemonList;
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
        button.classList.add('btn');
        button.classList.add('btn-light');//adds button classes for bootstrap
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

    function addFavorites(pokemon) {
        myFavorites.push(pokemon);
        localStorage.setItem('myFavoritesString', JSON.stringify(myFavorites));
        myFavoritesParsed= JSON.parse(localStorage.getItem('myFavoritesString'));
        console.log(myFavoritesParsed);
        alert('Pokemon added to favorites!');
        
    }
    function showModal(title, height, weight, image, pokemon) {

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


        modal.appendChild(heightElement);
        modal.appendChild(weightElement);
        modal.appendChild(imageElement);


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
                if (myFavoritesParsed.indexOf(item.name) !== -1) {
                    
                    

                    let pokemon = {
                        name: item.name,
                        detailsUrl: item.url
                    };
                    favoritePokemonList.push(pokemon);
                }
                else {
                    console.log(myFavorites);
                }
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
    window.addEventListener('keydown', (e) => {
        let modalContainer = document.querySelector('#modal-container');
        if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
            hideModal();
        }
    })

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










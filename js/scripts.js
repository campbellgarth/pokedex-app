
let pokemonRepository = (function () {
    let pokemonList = [];
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

    function addListItem(pokemon) {
        let pokemonUl = document.querySelector('.pokemon-list'); //pulls from Unordered list
        let listItem = document.createElement('li'); //creates each LI element
        listItem.classList.add('each-pokemon'); //adds class "each-pokemon" to each LI element
        listItem.classList.add('list-group-item'); //adds class "list-group-item" to each LI element for bootstrap
        let button = document.createElement('button'); //creates button for pokemon
        button.classList.add('btn');
        button.classList.add('btn-light');//adds button classes for bootstrap
        button.innerText = pokemon.name;//adds pokemon name to each button
        button.classList.add('pokemon-button');//adds class 'pokemon-button' to each button
        button.setAttribute('data-toggle', 'modal');
        button.setAttribute('data-target', '#modal-container')
        listItem.appendChild(button);//adds buttons to LIs
        pokemonUl.appendChild(listItem);//adds LIs to UL

        button.addEventListener('click', function () { //shows all details of a pokemon in console when clicked on
            showDetails(pokemon);
        });
//this is where I started!
    }
     function showModal(title, height, weight, image) {
       
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
            showModal(pokemon.name, pokemon.height, pokemon.weight, pokemon.imageUrl);
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








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
        let button = document.createElement('button'); //creates button for pokemon
        button.innerText = pokemon.name;//adds pokemon name to each button
        button.classList.add('pokemon-button');//adds class 'pokemon-button' to each button
        listItem.appendChild(button);//adds buttons to LIs
        pokemonUl.appendChild(listItem);//adds LIs to UL

        button.addEventListener('click', function () { //shows all details of a pokemon in console when clicked on
            showDetails(pokemon);
        });

    }
    function showModal(title, height, weight, image) {
        let modalContainer = document.querySelector('#modal-container');

        //clear all existing modal content

        modalContainer.innerHTML = '';
        let modal = document.createElement('div');
        modal.classList.add('modal');

        //add new modal content
        let closeButtonElement = document.createElement('button');
        closeButtonElement.classList.add('modal-close');
        closeButtonElement.innerText = 'X';
        //closes modal when clicked
        closeButtonElement.addEventListener('click', hideModal);
        //replaces title and text with dynamic content as called in function parameters
        let titleElement = document.createElement('h1');
        titleElement.innerText = title;
        titleElement.classList.add('modal-element');
        let heightElement = document.createElement('p');
        heightElement.innerText ='height: ' +  height;
        heightElement.classList.add('modal-element');
        let weightElement = document.createElement('p');
        weightElement.innerText ='weight: ' +  weight;
        weightElement.classList.add('modal-element');
        
        //add image
        let imageElement = document.createElement('img');
        imageElement.src = image;
        imageElement.classList.add('pokeImg');
        



        //glue it all together!
        modal.appendChild(closeButtonElement);
        modal.appendChild(titleElement);
        modal.appendChild(heightElement);
        modal.appendChild(weightElement);
        modal.appendChild(imageElement);
        

        modalContainer.appendChild(modal);

        modalContainer.classList.add('is-visible');

        //if clicked outside the modal, modal closes
        modalContainer.addEventListener('click', (e) => {
            let target = e.target;
            if (target === modalContainer) {
                hideModal();
            }
        });
    }

    function hideModal(){
        let modalContainer = document.querySelector('#modal-container');
        modalContainer.classList.remove('is-visible');
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
    window.addEventListener('keydown', (e) =>
    {
      let modalContainer = document.querySelector('#modal-container');
      if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')){
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







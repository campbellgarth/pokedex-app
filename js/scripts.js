let pokemonList = [
    { name: 'Lapras', pokedexNumber: 31, height: 250, weight: 220, type: ['water', 'ice'] },
    { name: 'Dragonite', pokedexNumber: 149, height: 220, weight: 210, type: ['dragon', 'flying'] },
    { name: 'Azumarill', pokedexNumber: 184, height: 80, weight: 28, type: ['water', 'fairy'] },
    { name: 'Charizard', pokedexNumber: 6, height: 170, weight: 90, type: ['flying', 'fire'] },
    { name: 'Butterfree', pokedexNumber: 12, height: 110, weight: 32, type: ['flying', 'bug'] },
    { name: 'Aron', pokedexNumber: 304, height: 40, weight: 60, type: ['steel', 'rock'] }
];


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

pokemonList.forEach(function(pokemon){
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

pokemonList.forEach(function(pokemon){
    document.write('<p style="font-size: 22px; font-weight: 700;">' + pokemon.name + ' (height: ' + pokemon.height + 'cm, weight: ' + pokemon.weight + 'kg)' + '</p>');

    if (heaviestPokemonWeight === pokemon.weight) {
        document.write('<p style="font-size: 18px; color: green; font-weight: 700;">' + 'I am the heaviest! I weigh ' + heaviestPokemonWeight + 'kg!' + '</p>');
    }
    if (lightestPokemonWeight === pokemon.weight) {
        document.write('<p style="font-size: 18px; color: blue; font-weight: 700;">' + 'I am the lightest! I weigh ' + lightestPokemonWeight + 'kg!' + '</p>');
    }

    if (biggestPokemonHeight === pokemon.height) {
        document.write('<p style="font-size: 18px; color: purple; font-weight: 700;">' + 'I am the tallest! I am ' + biggestPokemonHeight + 'cm!' + '</p>');
    }
    if (smallestPokemonHeight === pokemon.height) {
        document.write('<p style="font-size: 18px; color: red; font-weight: 700;">' + 'I am the smallest! I am ' + smallestPokemonHeight + 'cm!' + '</p>');
    }
});






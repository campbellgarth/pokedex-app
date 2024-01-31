let pokemonList = [
    { name: 'Lapras', pokedexNumber: 31, height: 250, weight: 220, type: ['water', 'ice'] },
    { name: 'Dragonite', pokedexNumber: 149, height: 220, weight: 210, type: ['dragon', 'flying'] },
    { name: 'Azumarill', pokedexNumber: 184, height: 80, weight: 28, type: ['water', 'fairy'] },
    { name: 'Charizard', pokedexNumber: 6, height: 170, weight: 90, type: ['flying', 'fire'] },
    { name: 'Butterfree', pokedexNumber: 12, height: 110, weight: 32, type: ['flying', 'bug'] },
    { name: 'Aron', pokedexNumber: 304, height: 40, weight: 60, type: ['steel', 'rock'] }
];


//determines the tallest pokemon
let biggestPokemonHeight = 0;
let biggestPokemonName = undefined;
//determines the heaviest pokemon
let heaviestPokemonWeight = 0;
let heaviestPokemonName = undefined;
//determines the smallest pokemon
let smallestPokemonHeight = 100000;
let smallestPokemonName = undefined;
//determines the lightest pokemon
let lightestPokemonWeight = 100000;
let lightestPokemonName = undefined;

for (let i = 0; i < pokemonList.length; i++) {
    //determines the tallest pokemon
    if (biggestPokemonHeight < pokemonList[i].height) {
        biggestPokemonHeight = pokemonList[i].height;
        biggestPokemonName = pokemonList[i].name;
    }
    //determines the heaviest pokemon
    if (heaviestPokemonWeight < pokemonList[i].weight) {
        heaviestPokemonWeight = pokemonList[i].weight;
        heaviestPokemonName = pokemonList[i].name;
    }
    //determines the smallest pokemon
    if (smallestPokemonHeight > pokemonList[i].height) {
        smallestPokemonHeight = pokemonList[i].height;
        smallestPokemonName = pokemonList[i].name;
    }
    //determines the lightest pokemon
    if (lightestPokemonWeight > pokemonList[i].weight) {
        lightestPokemonWeight = pokemonList[i].weight;
        lightestPokemonName = pokemonList[i].name;
    }
}

//prints all pokemon names and heights/weights. If the pokemon is the tallest/shortest/lightest/heaviest, it states so and its height or weight.
for (let i = 0; i < pokemonList.length; i++) {
    document.write('<p style="font-size: 22px; font-weight: 700;">' + pokemonList[i].name + ' (height: ' + pokemonList[i].height + 'cm, weight: ' + pokemonList[i].weight + 'kg)' + '</p>');

    if (heaviestPokemonWeight === pokemonList[i].weight) {
        document.write('<p style="font-size: 18px; color: green; font-weight: 700;">' + 'I am the heaviest! I weigh ' + heaviestPokemonWeight + 'kg!' + '</p>');
    }
    if (lightestPokemonWeight === pokemonList[i].weight) {
        document.write('<p style="font-size: 18px; color: blue; font-weight: 700;">' + 'I am the lightest! I weigh ' + lightestPokemonWeight + 'kg!' + '</p>');
    }

    if (biggestPokemonHeight === pokemonList[i].height) {
        document.write('<p style="font-size: 18px; color: purple; font-weight: 700;">' + 'I am the tallest! I am ' + biggestPokemonHeight + 'cm!' + '</p>');
    }
    if (smallestPokemonHeight === pokemonList[i].height) {
        document.write('<p style="font-size: 18px; color: red; font-weight: 700;">' + 'I am the smallest! I am ' + smallestPokemonHeight + 'cm!' + '</p>');
    }
}




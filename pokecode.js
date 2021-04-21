import {
    getLastNumber,
    removeChildren
} from '../utils/index.js'
const pokeGrid = document.querySelector('.pokeGrid')
const loadButton = document.querySelector('.loadPokemon')
const fetchButton = document.querySelector('#fetchSelectedPokemon')
const newButton = document.querySelector('#newPokemon')

class Pokemon {
    constructor(name, height, weight, abilities, moves) {
        this.id = 900
        this.name = name
        this.height = height
        this.weight = weight
        this.abilities = abilities
        this.moves = moves
        this.type = types
    }
}
newButton.addEventListener('click', () => {
    let pokeName = prompt("what is the name of your new pokemon?")
    let pokeHeight = prompt("what is the height of your new pokemon?")
    let pokeWeight = prompt("pokemon weight?")
    let newPokemon = new Pokemon(
        pokeName,
        pokeHeight,
        pokeWeight,
        ['eat', 'sleep'],
        ['study', 'game'],
        [{
            type: {
                name: 'normal',
            },
        }, ],
    )
    populatePokeCard(newPokemon)
})

loadButton.addEventListener('click', () => {
    loadPage()
})
fetchButton.addEventListener('click', () => {
    let pokeNameOrId = prompt("enter pokemon id or name:").toLocaleLowerCase()
    console.log(pokeNameOrId)
    getAPIData(`https://pokeapi.co/api/v2/pokemon/${pokeNameOrId}`).then(
        (data) => populatePokeCard(data)
    )
})

async function getAPIData(url) {
    try {
        const response = await fetch(url) // try getting data from the API at the url
        const data = await response.json() // convert the response into json
        return data // return the data from the function to whoever called it
    } catch {
        error
    } {
        //must have been an error.
        console.log(error)
    }
}

function loadPage() {
    getAPIData('https:pokeapi.co/api/v2/pokemon?limit=151').then(
        async (data) => {
            for (const singlePokemon of data.results) {
                await getAPIData(singlePokemon.url).then(
                    (pokeData) => populatePokeCard(pokeData)
                )
            }
        }
    )
}

function populatePokeCard(singlePokemon) {
    removeChildren(singlePokemon)
    let pokeScene = document.createElement('div')
    pokeScene.className = 'scene'
    let pokeCard = document.createElement('div')
    pokeCard.className = 'card'

    pokeCard.addEventListener('click', () => {
        pokeCard.classList.toggle('is-flipped')
    })
    pokeCard.appendChild(populateCardFront(singlePokemon))
    pokeCard.appendChild(populateCardBack(singlePokemon))
    pokeScene.appendChild(pokeCard)
    pokeGrid.appendChild(pokeScene)
}

function populateCardFront(pokemon) {
    let pokeFront = document.createElement('div')
    pokeFront.className = 'card__face card__face--front'
    let frontLabel = document.createElement('p')
    frontLabel.textContent = pokemon.name
    let frontImage = document.createElement('img')
    frontImage.src = getImageFileName(pokemon)

    let pokeType1 = pokemon.types[0].type.name
    if (pokemon.types.length > 1) {
        let pokeType2 = pokemon.types[1].type.name
        pokeFront.style.setProperty('background', 
        `linear-gradient(
            ${getPokeTypeColor(pokeType1)}, 
            ${getPokeTypeColor(pokeType2,)})`,)
    } else {
        pokeFront.style.setProperty('background', getPokeTypeColor(pokeType1))
    }

    pokeFront.appendChild(frontLabel)
    pokeFront.appendChild(frontImage)
    return pokeFront
}

function populateCardBack(pokemon) {
    let pokeBack = document.createElement('div')
    pokeBack.className = 'card__face card__face--back'
    let backLabel = document.createElement('p')
    backLabel.textContent = `Moves: ${pokemon.moves.length}`
    pokeBack.appendChild(backLabel)

    pokemon.types.forEach((pokeType) => {
        let backType = document.createElement('p')
        backType.textContent = `Type: ${pokeType.type.name}`
        pokeBack.appendChild(backType)
    })
    pokemon.abilities.forEach((pokeAbility) => {
        let backAbility = document.createElement('p')
        backAbility.textContent = `Ability: ${pokeAbility.ability.name}`
        pokeBack.appendChild(backAbility)
    })
    return pokeBack
}

function getImageFileName(pokemon) {
    let pokeId
    if (pokemon.id < 10) pokeId = `00${pokemon.id}`
    if (pokemon.id > 9 && pokemon.id < 100) pokeId = `0${pokemon.id}`
    if (pokemon.id > 99 && pokemon.id < 810) pokeId = pokemon.id
    if (pokemon.id === 900) {
        return 'images/pokeball.png'
    }
    return `https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/images/${pokeId}.png`
}

function getPokeTypeColor(pokeType) {
    let color
    switch (pokeType) {
        case 'grass':
            color = '#71C558'
            break;
        case 'fire':
            color = '#EA7A3C'
            break;
        case 'water':
            color = '#539AE2'
            break;
        case 'bug':
            color = '#94BC4A'
            break;
        case 'normal':
            color = '#AAB09F'
            break;
        case 'flying':
            color = '#7DA6DE'
            break;
        case 'ghost':
            color = '#11FAC9'
            break;
        case 'poison':
            color = '#B468B7'
            break;
        case 'electric':
            color = '#E5C531'
            break;
        case 'dark':
            color = '#736C75'
            break;
        case 'dragon':
            color = '#6A7BAF'
            break;
        case 'fairy':
            color = '#E397D1'
            break;
        case 'fighting':
            color = '#CB5F48'
            break;
        case 'ground':
            color = '#CC9F4F'
            break;
        case 'ice':
            color = '#70CBD4'
            break;
        case 'psychic':
            color = '#E5709B'
            break;
        case 'rock':
            color = '#B2A061'
            break;
        case 'steel':
            color = '#89A1B0'
            break;
        default:
            color = '#777'
    }
    return color
}
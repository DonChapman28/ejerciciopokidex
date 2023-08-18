const pokeCard = document.querySelector('[data-card]');
const pokeName = document.querySelector('[data-name]');
const pokeImg = document.querySelector('[data-img]');
const pokeImgContainer = document.querySelector('[data-img-container]');
const pokeId = document.querySelector('[data-id]');
const pokeTypes = document.querySelector('[data-types]');
const pokeStats = document.querySelector('[data-stats]');

const typeColors = {
    electric: '#FFEA70',
    fairy: '#FFC6D9',
    normal: '#f8efe7',
    fire: '#FF675C',
    water: '#0596C7',
    ice: '#8cfff7',
    rock: '#999799',
    flying: '#d6e7e7',
    grass: '#4A9681',
    psychic: '#ff70a4',
    ghost: '#68639d',
    bug: '#A2FAA3',
    poison: '#795663',
    ground: '#D2B074',
    dragon: '#15349a',
    steel: '#1D8A99',
    fighting: '#d38d2f',
    dark: '#2A1A1F',
    default: '#2a2c4d'
};

const buscarPokimoni = event => {
    event.preventDefault();
    const { value } = event.target.pokimoni;
    fetch(`https://pokeapi.co/api/v2/pokemon/${value.toLowerCase()}`)
        .then(data => data.json())
        .then(Response => renderPokimoniData(Response))
        .catch(err => renderNotFound())
}

const renderPokimoniData = data => {
    const sprite = data.sprites.front_default;
    const { stats, types } = data;
    console.log(data)
    
    pokeName.textContent = data.name;
    pokeImg.setAttribute('src', sprite);
    pokeId.textContent = `Nº ${data.id}`;
    setCardColor(types);
    renderPokemonTypes(types);
    renderPokemonStats(stats);
}

const setCardColor = types => {
    const colorOne = typeColors[types[0].type.name];
    const colorTwo = types[1] ? typeColors[types[1].type.name] : typeColors.default;
    pokeImg.style.background = `conic-gradient(${colorTwo} 0deg 45deg, ${colorOne} 0deg 45deg)`;
    pokeImg.style.backgroundSize = '5px 5px';
    
}

const renderPokemonTypes = types => {
    pokeTypes.innerHTML = '';
    types.forEach(type => {
        const typeTextElement = document.createElement("div");
        // typeTextElement.style.color = typeColors[type.type.name];
        typeTextElement.style.backgroundColor = typeColors[type.type.name];
        typeTextElement.textContent = type.type.name;

       
        
        if (["ghost", "poison", "dark","dragon", "default"].includes(type.type.name)) {
            typeTextElement.style.color = "white";
        }

        pokeTypes.appendChild(typeTextElement);
    });
}

const renderPokemonStats = stats => {
    pokeStats.innerHTML = '';
    stats.forEach(stat => {
        const statElement = document.createElement("div");
        const statElementName = document.createElement("div");
        const statElementAmount = document.createElement("div");
        statElementName.textContent = stat.stat.name;
        statElementAmount.textContent = stat.base_stat;
        statElement.appendChild(statElementName);
        statElement.appendChild(statElementAmount);
        pokeStats.appendChild(statElement);
    })
}

const renderNotFound = () => {
    pokeName.textContent = 'No encontrado';
    pokeImg.setAttribute('src', 'poke-shadow.png');
    pokeImg.style.background = '#fff';
    pokeTypes.innerHTML = '';
    pokeStats.innerHTML = '';
    pokeId.textContent = '';
}

const btnSearch = document.getElementById('search')
const searchBar = document.getElementById('search-bar')
const field = document.getElementById('field')
const tbody = document.getElementById('tbody')
const totalWeight = document.getElementById('total-weight')
const alertMsg = document.getElementById('alert')

const fetchPokemon = async id => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`
  const res = await fetch(url)
    .then(res => res.json())
    .then(data => data)

  return res
}

const getTotalWeight = _ => {
  const nodes = Array.from(document.querySelectorAll('.pokemon-weight'))
  const weights = nodes.map(w => w.innerText)
  let total = 0
  
  if (weights.length > 0)
    total = weights.reduce((t, v) => Number(t) + Number(v));
  return parseFloat(total).toFixed(2);
}

const addPokemonToTable = pokemon => {
  const tr = document.createElement('tr')
  const pokeId = document.createElement('td')
  const pokeImage = document.createElement('td')
  const image = document.createElement('img')
  const pokeName = document.createElement('td')
  const pokeWeight = document.createElement('td')
  const removeSelf = document.createElement('td')
  const removeButton = document.createElement('button')

  removeButton.addEventListener('click', (e) => {
    e.target.closest('tr').remove()
    totalWeight.innerText = getTotalWeight()
  })
  removeButton.className = 'button button--error'
  removeButton.innerText = 'X'
  removeSelf.appendChild(removeButton)

  image.setAttribute('src', `https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png`)

  pokeId.innerText = pokemon.id
  pokeName.innerText = pokemon.name
  pokeWeight.innerText = pokemon.weight
  pokeImage.style.maxWidth = '64px'
  pokeImage.appendChild(image)

  pokeName.classList.add('capitalize')
  pokeWeight.classList.add('pokemon-weight')

  tr.appendChild(pokeId)
  tr.appendChild(pokeImage)
  tr.appendChild(pokeName)
  tr.appendChild(pokeWeight)
  tr.appendChild(removeSelf)

  tbody.appendChild(tr)
  totalWeight.innerText = getTotalWeight()
  alertMsg.style.display = 'none'
}

const pokemonDoesntExists = _ => {
  alertMsg.style.display = 'block'
}

btnSearch.addEventListener('click', () => {
  if(searchBar.value) {
    fetchPokemon(searchBar.value)
      .then(data => addPokemonToTable(data))
      .catch(err => pokemonDoesntExists())
    searchBar.classList.remove('input--error')
    field.classList.remove('field--error')
  } else {
    searchBar.classList.add('input--error')
    field.classList.add('field--error')
  }
  
  searchBar.value = ''
})
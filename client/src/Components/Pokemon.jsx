import React, { useState } from "react";
import axios from 'axios'
import style from './Pokemon.module.css'

const Pokemon = () => {
  const [pokemonName, setPokemonName] = useState('') //contiene il nome inserito dall'utente
  const [pokemonData, setPokemonData] = useState(null) //contiene i dati recuperati dall'API
  const [error, setError] = useState('')


  function fetchPokemon() {
    axios.get(`http://localhost:3000/pokemon/${pokemonName.toLowerCase()}`)
      .then((response) => {
        setPokemonData(response.data)
        setError('')
      })
      .catch((err) => {
        setError('Pokemon non trovato')
        setPokemonData(null)
      })
  }

  return (
    <div className={style.container}>
      <h3 className={style.h1Subtitle}>
        Ricerca Pokemon
      </h3>
      <input
        type="text"
        placeholder="Nome del pokemon"
        value={pokemonName}
        onChange={(e) => setPokemonName(e.target.value)}
      />
      <button className={style.btn} onClick={fetchPokemon} > Cerca </button>
      {error && <h3>Pokemon non trovato</h3>}
      {
        pokemonData && (
          <div>
            <h3>{pokemonData.name}</h3>
            <h5>{pokemonData.url}</h5>
            <p>Peso: {pokemonData.weight}</p>
            <img className={style.img} src={pokemonData.sprites.front_default} alt={pokemonData.name} />
          </div>
        )
      }
    </div >
  )
}

export default Pokemon
import { PokemonContext } from "./PokemonContext"
import React, { useState, useEffect } from 'react';

const PokemonProvider = ({children}) => {

  const [offset, setOffset] = useState(0);

  //call 50 pokemons for the API
  const getAllPokemons = async(limit = 50)=>{
    const baseURL = 'https://pokeapi.co/api/v2/'

    const res = await fetch(`${baseURL}pokemon?limit=${limit}&offset=${offset}`)

    const data = await res.json()

    console.log(data)
    //continuar video 29:21
  }

  useEffect(() => {
		getAllPokemons();
	}, []);

  return (
    <div>
      <PokemonContext.Provider value={{
        numero:0
      }}>
        {children}
      </PokemonContext.Provider>
    </div>
  )
}

export default PokemonProvider

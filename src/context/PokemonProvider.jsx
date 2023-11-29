import { PokemonContext } from "./PokemonContext"
import React, { useState, useEffect } from 'react';

const PokemonProvider = ({children}) => {

  const [allPokemons, setAllPokemons] = useState([]);
  const [globalPokemons, setGlobalPokemons] = useState([]);
  const [offset, setOffset] = useState(0);

  // Utilizar CustomHook - useForm
	const { valueSearch, onInputChange, onResetForm } = useForm({
		valueSearch: '',
	});

  // Estados para la aplicación simples
	const [loading, setLoading] = useState(true);
	const [active, setActive] = useState(false);

  //call 50 pokemons for the API
  const getAllPokemons = async(limit = 50)=>{
    const baseURL = 'https://pokeapi.co/api/v2/'

    const res = await fetch(`${baseURL}pokemon?limit=${limit}&offset=${offset}`)

    const data = await res.json()

    const promises = data.results.map(async pokemon => {
			const res = await fetch(pokemon.url);
			const data = await res.json();
			return data;
		});
    const results = await Promise.all(promises);
    setAllPokemons([...allPokemons, ...results]);
    setLoading(false)
  }

  
	//call all pokemons
	const getGlobalPokemons = async () => {
		const baseURL = 'https://pokeapi.co/api/v2/';

		const res = await fetch(
			`${baseURL}pokemon?limit=100000&offset=0`
		);
		const data = await res.json();

		const promises = data.results.map(async pokemon => {
			const res = await fetch(pokemon.url);
			const data = await res.json();
			return data;
		});
		const results = await Promise.all(promises);

		setGlobalPokemons(results);
		setLoading(false);
	};

  // call one pokemon for ID
	const getPokemonByID = async id => {
		const baseURL = 'https://pokeapi.co/api/v2/';

		const res = await fetch(`${baseURL}pokemon/${id}`);
		const data = await res.json();
		return data;
	};

  useEffect(() => {
		getAllPokemons();
	}, []);

  useEffect(() => {
		getGlobalPokemons();
	}, []);

  return (
    <div>
      <PokemonContext.Provider value={{
        valueSearch,
        onInputChange,
        onResetForm,
        allPokemons,
        globalPokemons,
        getPokemonByID
      }}>
        {children}
      </PokemonContext.Provider>
    </div>
  )
}

export default PokemonProvider

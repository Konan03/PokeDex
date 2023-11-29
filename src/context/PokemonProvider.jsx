import { PokemonContext } from "./PokemonContext"

const PokemonProvider = ({children}) => {
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

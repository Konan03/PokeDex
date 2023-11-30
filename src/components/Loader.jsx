import React from 'react'
import { quantum } from 'ldrs'

const Loader = () => {

  quantum.register()

  return (
    <div className="contanier-loader">
      <l-quantum
      size="45"
      speed="1.75" 
      color="black" 
      ></l-quantum>
    </div>
  )
}

export default Loader

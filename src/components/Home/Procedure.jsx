import React from 'react'
import placeproc from "../../assets/placeproc.png"

const Procedure = () => {
  return (
    <div className='flex flex-col items-center justify-center '>
      <h1 className="text-3xl font-bold text-center mb-8 text-black">PROCEDURE</h1>
      <img src={placeproc} alt="placement procedure" />
    </div>
  )
}

export default Procedure

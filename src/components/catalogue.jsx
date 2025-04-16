import React from 'react';
import { temp } from '/sidebar.jsx'


export const catalogue = () => {

  
  return (
    <div className='prods'> {PRODS.map((product) => 
      <Product key={product.id} data = {product}/>)}  
    </div>
  )
}

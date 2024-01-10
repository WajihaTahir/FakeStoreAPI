import React from 'react'

function Cart() {
  return (
    <div className='cartTab'>
      <h1>Shopping Cart</h1>
      <div className='listCart'>

      </div>
      <div className='btn'>
        <button className='close'>Close</button>
        <button className='checkOut'>Check Out</button>
      </div>
    </div>
  )
}

export default Cart
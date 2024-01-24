import React from 'react'

function Container({children}) {
  return (
    <div className='w-full mx-auto px-4 max-w-7xl border border-red-600'>
        {children}
    </div>
  )
}

export default Container
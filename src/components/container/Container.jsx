import React from 'react'

function Container({children}) {
  return (
    <div className='w-full px-4 mx-auto border border-blue-600 max-w-7xl'>
        {children}
    </div>
  )
}

export default Container
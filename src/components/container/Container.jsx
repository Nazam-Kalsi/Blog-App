import React from 'react'

function Container({children}) {
  return (
    <div className='w-full h-fit max-h-full px-4 mx-auto max-w-7xl'>
        {children}
    </div>
  )
}

export default Container
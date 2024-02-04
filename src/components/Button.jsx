import React from 'react'

function Button({
    children,
    type='button',
    bgcolor='bg-blue-600',
    textColor='text-white',
    className='',
    ...props
}) {
  return (
    <button className={`py-2 rounded-lg w-full  ${bgcolor} ${textColor} ${className}`}{...props}>
        {children}
    </button>
  )
}

export default Button
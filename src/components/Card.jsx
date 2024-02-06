import React from 'react'
import  dbService from '../appWrite/bucketService'
import {Link} from 'react-router-dom'

function Card({
    $id,Title,featuredImage
}) {
  return (

    <Link to={`/post/${$id}`}>
      <div className='py-4 px-8  min-w-80 border border-gray-500 rounded-xl hover:bg-black hover:scale-[1.01] transition-all'>
        <div className='mx-auto overflow-hidden bh-64  w-5/6 '>
          <img src={dbService.preview(featuredImage)} alt={Title} className='w-5/6 mx-auto  rounded-xl size-40 '/> 
           {/*we store id of image in db */}
        </div>
        <div className='flex-1'>
        <h2 className='text-xl font-semibold py-2 mb-4'>{Title}</h2>
        </div>
      </div>
      </Link>
  )
}

export default Card
import React from 'react'
import  dbService from '../appWrite/bucketService'
import {Link} from 'react-router-dom'

function Card({
    $id,Title,featuredImage
}) {
  return (

    <Link to={`/post/${$id}`}>
      <div className='py-4 px-28 border border-gray-500 rounded-xl hover:bg-black hover:scale-[1.01] transition-all'>
        <div className=' overflow-hidden rounded-md bh-64 '>
          <img src={dbService.preview(featuredImage)} alt={Title} className='rounded-xl size-40 '/> 
           {/*we store id of image in db */}
        </div>
        <div className='flex-1'>
        <h2 className='text-xl font-semibold text-center py-2 px-4 mb-4'>{Title}</h2>
        </div>
      </div>
      </Link>
  )
}

export default Card
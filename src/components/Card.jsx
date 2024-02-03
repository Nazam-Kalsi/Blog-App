import React from 'react'
import  dbService from '../appWrite/bucketService'
import {Link} from 'react-router-dom'

function Card({
    $id,Title,featuredImage
}) {
  return (

    <Link to={`/post/${$id}`}>
      <div className='p-4 bg-gray-500 rounded-xl'>
        <div className='w-24 overflow-hidden border rounded-md bh-64 md:flex'>
          <img src={dbService.preview(featuredImage)} alt={Title} className='rounded-xl '/> 
           {/*we store id of image in db */}
        </div>
        <h2 className='text-lg font-semibold '>{Title}</h2>
      </div>
      </Link>
  )
}

export default Card
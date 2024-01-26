import React from 'react'
import  dbService from '../appWrite/bucketService'
import {Link} from 'react-router-dom'

function Card({
    $id,title,featuredImage
}) {
  return (

    <Link to={`/post/${$id}`}>
      <div className='p-4 bg-gray-500 rounded-xl'>
        <div className=''>
          <img src={dbService.preview(featuredImage)} alt={title} className='rounded-xl '/>  //we store id of image in db
        </div>
        <h2 className='text-lg font-semibold '>{title}</h2>
      </div>
      </Link>
  )
}

export default Card
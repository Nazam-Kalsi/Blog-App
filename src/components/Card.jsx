import React from 'react'
import  dbService from '../appWrite/bucketService'
import {Link} from 'react-router-dom'

function Card({
    $id,title,featuredImage
}) {
  return (

    <Link to={`/post/${$id}`}>
      <div className='rounded-xl p-4 bg-gray-300'>
        <div className=''>
          <img src={dbService.preview(featuredImage)} alt={title} className='rounded-xl '/>  //we store id of image in db
        </div>
        <h2 className=' font-semibold text-lg'>{title}</h2>
      </div>
      </Link>
  )
}

export default Card
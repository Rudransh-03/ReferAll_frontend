import React from 'react'
import { useParams } from 'react-router-dom'

const ViewRequests = () => {
    const {id} = useParams();
    console.log(id);
  return (
    <div className='mt-32'>ViewRequests</div>
  )
}

export default ViewRequests
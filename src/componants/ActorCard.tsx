import React from 'react'

const ActorCard = ({actor}) => {
  return (
    <div className='flex flex-col justify-center items-center min-w-fit '>
        <img className='w-28' src={`https://image.tmdb.org/t/p/original${actor.profile_path}`} alt={actor.name} />
        <p className='text-sm'>{actor.name.slice(0,13)}</p>
        <p className='text-xs text-gray-600'>{`(${actor.character.slice(0,13)})`}</p>
    </div>
  )
}

export default ActorCard
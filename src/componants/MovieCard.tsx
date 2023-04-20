import Link from 'next/link'
import React from 'react'

interface details {
    id: number
    title: string
    poster_path: string
}

const MovieCard = ({id,title,poster_path}:details) => {
  return (
    <Link
    href={`/Movie/${id}`}
    className="flex flex-col justify-center items-center min-w-fit rounded-md"
    style={{
      boxShadow: "0 0 1px red, 0 0 10px red, 0 0 5px red, 0 0 5px red",
    }}
  >
    <img
      className="w-28 rounded-md shadow-xl hover:shadow-2xl transition duration-300 ease-in-out transform hover:scale-110"
      src={`https://image.tmdb.org/t/p/original${poster_path}`}
      alt={title}
      
    />
    {/* <h1 className='font-Roboto text-sm font-light '>{title.substring(0,20)}</h1> */}
  </Link>
  )
}

export default MovieCard
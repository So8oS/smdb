import axios from 'axios'
import React, { useEffect } from 'react'
import MovieCard from './MovieCard'

interface Movie {
    id: number
    title: string
    poster_path: string
    release_date: string
}



const List = ({ type }: { type: string }) => {
    const [movies, setMovies] = React.useState([])
    useEffect(() => {
        // axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}`)
        axios.get(`https://api.themoviedb.org/3/movie/${type}?api_key=70d7f1c2e02011774ccb989c4e9584c3`)
        
        .then((res) => {
            setMovies(res.data.results)
        })
        .catch((err) => {
          console.log(err)
        })
    }, [type])

    // axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=70d7f1c2e02011774ccb989c4e9584c3`)
    // .then((res) => {
    //     console.log(res.data.results)
    // })


  return (
    <div className='flex flex-col justify-center items-center mt-7 '>
        <h1 className='font-bold text-3xl font-Lobster self-start ' >{type.charAt(0).toUpperCase() + type.replace('_',' ').slice(1)}</h1>
        
        <div className='mt-10 flex  overflow-x-scroll gap-3 p-2'>
            {movies.map((movie:Movie) => {
                return (
                    <MovieCard  key={movie.id} id={movie.id} title={movie.title} poster_path={movie.poster_path}  />
                )
            })}
            
        </div>
    </div>
  )
}

export default List
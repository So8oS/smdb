import axios from 'axios'
import React, { useEffect } from 'react'
import MovieCard from './MovieCard'

interface Movie {
    id: number
    title: string
    poster_path: string
    release_date: string
}

interface ListProps {
    movies: Movie[]
    type : string
}

// export const getStaticProps = async () => {
//     const res = await axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.API_KEY}`)
//     const movies = res.data.results
//     return {
//         props: {
//             movies
//         }
//     }
// }

const List = ({ movies,type }: ListProps ) => {
    // const [movies, setMovies] = React.useState([])
    // useEffect(() => {
    //     axios.get(`https://api.themoviedb.org/3/movie/${type}?api_key=${process.env.API_KEY}`)        
    //     .then((res) => {
    //         setMovies(res.data.results)
    //     })
    //     .catch((err) => {
    //       console.log(err)
    //     })
    // }, [type])
    console.log(movies)

    return (
        <div className='flex flex-col justify-center items-center mt-7 p-2'>
            <h1 className='font-bold text-3xl font-Lobster self-start ' >{type}</h1>
            
            <div className='mt-5 flex  overflow-x-scroll gap-3 p-2'>
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

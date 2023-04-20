import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
  release_date: string;
  genres: [];
  vote_average: number;
  vote_count: number;
  production_companies: [];
  production_countries: [];
  spoken_languages: [];
  runtime: number;
  budget: number;
  revenue: number;
  status: string;
  tagline: string;
  imdb_id: string;
  backdrop_path: string;
}



const MovieDetail = () => {
  const [movie, setMovie] = React.useState({} as Movie)
  const router = useRouter()
  const movieId = router.query.MovieId

  
   

    useEffect(() => {
      axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=70d7f1c2e02011774ccb989c4e9584c3`)
      .then((res) => {
          setMovie(res.data)
          console.log(movie.genres)
      })
      .catch((err) => {
        console.log(err)
      })
    }, [])


  return (
    <div className='flex flex-col'>
      
          <img className='w-full '
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} alt={movie.title} />
          <h1>{movie.title}</h1>
          <p>{movie.overview}</p>
          <p>{movie.release_date}</p>
          <p>{movie.vote_average}</p>
          <p>{movie.vote_count}</p>
          <p>{movie.runtime}</p>
          <p>{movie.budget}</p>
          <p>{movie.revenue}</p>
          <p>{movie.status}</p>
          <p>{movie.tagline}</p>
          <div>
            {/* {movie.genres.map((genre) => {
              return (
                <div>{genre}</div>
              )
            })} */}
          </div>
        </div>
    

    
  )
}

export default MovieDetail
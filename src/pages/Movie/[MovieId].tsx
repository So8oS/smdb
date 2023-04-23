import axios from 'axios';
import Link from 'next/link';
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

interface Genre {
  id: number;
  name: string;
}
interface Actor {
  id: number;
  name: string;
  profile_path: string;
  character: string;
}


const MovieDetail = () => {
  const [movie, setMovie] = React.useState({} as Movie)
  const [actors, setActors] = React.useState([] as Actor[])
  const router = useRouter()
  const movieId = router.query.MovieId



  
   

    useEffect(() => {
      axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=70d7f1c2e02011774ccb989c4e9584c3`)
      .then((res) => {
          setMovie(res.data)
      })
      axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=70d7f1c2e02011774ccb989c4e9584c3`)
      .then((res) => {
        setActors(res.data.cast)
      })
      .catch((err) => {
        console.log(err)
      })
    }, [])

    

  return (
    <div className='flex flex-col'>
        <img className='w-full 'src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} alt={movie.title} />
        
        <div className='px-2'>
          <h1 className=' text-3xl font-bold'>{movie.title}</h1>
          <div className="flex flex-col">
            <div className="flex gap-2 items-center ">
              <p className='font-semibold border px-[2px] border-gray-700'>{movie?.release_date?.slice(0,4)}</p>
              <p>{`${movie.runtime} mins`}</p>
              <div className='flex gap-1'>
                {movie.genres?.map((genre:Genre) => { return (<p key={genre?.id}>{genre?.name}</p>)}).slice(0,2)}
              </div>
            </div>

            <div className='flex gap-1 text-sm px-[2px]'>
              {movie.production_companies?.map((company:Genre) => { return (<p key={company?.id}>{company?.name}</p>)}).slice(0,3)}
            </div>

          </div>


          
        <div className='border-b-2 border-red-700 w-fit mt-3'>
          <p className='italic'>{movie.tagline}</p>
        </div>
        

        
        <p className='mt-1'>{movie.overview}</p>
      </div>

        <div className='flex flex-col gap-2 px-2 mt-5 '>
          <h1 className='text-2xl font-bold'>Actors</h1>
          <div className="flex overflow-scroll gap-3 rounded-md hover:border border-gray-400 ">
            {
              actors.map((actor:Actor) => {
                return (
                  <Link href={`/Actor/${actor.id}`} className='flex flex-col justify-center items-center min-w-fit '>
                    <img className='w-28' src={`https://image.tmdb.org/t/p/original${actor.profile_path}`} alt={actor.name} />
                    <p className='text-sm'>{actor.name.slice(0,13)}</p>
                    <p className='text-xs text-gray-600'>{`(${actor.character.slice(0,13)})`}</p>
                  </Link>
                )
              }).slice(0,10)
            }
          </div>
      </div>
    </div>
  )
}

export default MovieDetail
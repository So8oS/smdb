import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

interface show {
    id: number;
    name: string;
    backdrop_path: string;
    overview: string;
    first_air_date: string;
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
    
}

interface Actor {
  id: number;
  name: string;
  profile_path: string;
  character: string;
}

interface TvDetailProps {
  tv: show;
  actors: Actor[];
}

interface genre {
  id: number;
  name: string;
}

interface company {
  id: number;
  name: string;
}

const TvDetail = () => {
  const [tv, setTv] = React.useState({} as show)
  const [actors, setActors] = React.useState([] as Actor[])
  const router = useRouter()
  const tvId = router.query.TvId

  useEffect(() => {
    axios.get(`https://api.themoviedb.org/3/tv/${tvId}?api_key=70d7f1c2e02011774ccb989c4e9584c3`)
    .then((res) => {
        setTv(res.data)
    })
    axios.get(`https://api.themoviedb.org/3/tv/${tvId}/credits?api_key=70d7f1c2e02011774ccb989c4e9584c3`)
      .then((res) => {
        setActors(res.data.cast)
      })
    .catch((err) => {
      console.log(err)
    })
  }, [])
  

    


    return (
      <div className='flex flex-col'>
        <img
          className='w-full'
          src={`https://image.tmdb.org/t/p/original${tv.backdrop_path}`}
          alt={tv.name}
        />
  
        <div className='px-2'>
          <h1 className=' text-3xl font-bold'>{tv.name}</h1>
          <div className='flex flex-col'>
            <div className='flex gap-2 items-center '>
              <p className='font-semibold border px-[2px] border-gray-700'>
                {tv?.first_air_date?.slice(0, 4)}
              </p>
              {/* <p>{`${tv.runtime} mins`}</p> */}
              <div className='flex gap-1'>
                {tv.genres?.map((genre:genre) => {
                  return <p key={genre?.id}>{genre?.name}</p>;
                })}
              </div>
            </div>
  
            <div className='flex gap-2 text-sm px-[2px]'>
              {tv.production_companies?.map((company:company) => {
                return <p key={company?.id}>{company?.name.slice(0,12)}</p>;
              }).slice(0,2)}
            </div>
          </div>
  
          <div className='border-b-2 border-red-700 w-fit mt-3'>
            <p className='italic'>{tv.tagline}</p>
          </div>
  
          <p className='mt-1'>{tv.overview}</p>
        </div>
  
        <div className='flex flex-col gap-2 px-2 mt-5'>
          <h1 className='text-2xl font-bold'>Cast</h1>
          <div className='flex overflow-scroll gap-3 rounded-md hover:border border-gray-400 '>
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
    );
  };
  
  export default TvDetail;
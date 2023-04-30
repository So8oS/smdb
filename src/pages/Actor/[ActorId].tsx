import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import MovieCard from '@/componants/MovieCard';
import Link from 'next/link';


interface Credit {
    id: number;
    name: string;
    profile_path: string;
    birthday: string;
    place_of_birth: string;
    biography: string;
    deathday: string;
}

interface creditsMoive {
  id: number;
  title: string;

}

const CreditDetails = () => {
  const [credit, setCredit] = useState( {} as Credit);
  const router = useRouter()
  const creditId = router.query.ActorId
  const [readMore, setReadMore] = React.useState({num: 250,text: 'Show More'})
  const [movieCredits, setMovieCredits] = useState([] as any[])

  
  console.log(creditId)

  useEffect(() => {
    axios.get(`https://api.themoviedb.org/3/person/${creditId}?api_key=${process.env.API_KEY}`)
      .then((res) => {
        setCredit(res.data)
      })
      axios.get(`https://api.themoviedb.org/3/person/${creditId}/movie_credits?api_key=${process.env.API_KEY}`)
      .then((res) => {
        setMovieCredits(res.data.cast)
        console.log(res.data.cast)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  const bio = credit.biography || '';

  
  if (!credit) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center mt-10 ">
            <img
            className="w-72 rounded-lg shadow-xl"
            src={`https://image.tmdb.org/t/p/original${credit.profile_path}`}
            alt={credit.name}
          />
    
      <div className="px-4 py-6 w-full">
        <h1 className="text-4xl font-bold mb-2">{credit.name}</h1>
        <div className="flex flex-col mb-6">
          <div className="flex items-center gap-4">
            <p className="border px-2 py-1 rounded font-medium">{credit.birthday}</p>
            {credit.place_of_birth && (
              <p>{credit.place_of_birth}</p>
            )}
            {credit.deathday && (
              <p>Passed Away {credit.deathday}</p>
            )}
          </div>
            <div className="mt-4">
              <h2 className="text-2xl font-bold mb-2">Biography</h2>
              <p>{`${bio.slice(0,readMore.num)}...`}
                <button className="text-blue-500" onClick={() => { 
                    if(readMore.num === 200){
                    setReadMore({num: bio.length, text: 'Show Less'})}
                    else{setReadMore({num: 200, text: 'Show More'})}}}
                    >{readMore.text}</button></p>
            </div>
        </div>
      <div className='flex flex-col gap-2  mt-5'>
          <h1 className='text-2xl font-bold'>Movies</h1>
          <div className='flex overflow-scroll gap-3  rounded-md hover:border border-gray-400 '>
          {
              movieCredits.map((movie) => {
                return (
                  <Link key={movie.id} href={`/Movie/${movie.id}`} className='flex flex-col justify-center items-center  min-w-fit gap-1  '>
                    
                    {movie.backdrop_path ? (
                    <img className='w-56' src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} alt={movie.name} />
                    ) : (
                    <div className='flex w-56 h-32 justify-center items-center bg-gray-600'>
                      <h1>{movie.title}</h1>
                      </div>
                    )}

                    
                    <p className='text-sm'>{movie.title}</p>
                    <p className='text-xs text-gray-600'>{`(${movie.character.slice(0,13)})`}</p>
                  </Link>
                )
              }).slice(0,10)
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreditDetails;

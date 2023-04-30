import React, { useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { AiFillStar } from 'react-icons/ai';
import PageWrapper from '@/componants/PageWrapper';


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
  video: boolean;
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

interface Review {
  id: number;
  author: string;
  content: string;
  author_details: {
    username: string;
    rating: number;
    avatar_path: string;
  };


}

const MovieDetail = () => {
  const [movie, setMovie] = React.useState({} as Movie)
  const [actors, setActors] = React.useState([] as Actor[])
  const router = useRouter()
  const movieId = router.query.MovieId
  const [video, setVideo] = React.useState("")
  const [reviews, setReviews] = React.useState([] as Review[])
  const [readMore, setReadMore] = React.useState({num: 200,text: 'Show More'})
  const [similar, setSimilar] = React.useState([] as Movie[])

    useEffect(() => {
      axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.API_KEY}`)
      .then((res) => {
          setMovie(res.data)
      })
      axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${process.env.API_KEY}`)
      .then((res) => {
        setActors(res.data.cast)
      })
      axios.get(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${process.env.API_KEY}`)
      .then((res) => {
        setVideo(res.data.results[2]?.key || res.data.results[3]?.key)
      })
      axios.get(`https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=${process.env.API_KEY}`)
      .then((res) => {
        setReviews(res.data.results)
      })
      axios.get(`https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=${process.env.API_KEY}`)
      .then((res) => {
        setSimilar(res.data.results)
      })
      .catch((err) => {
        console.log(err)
      })
    }, [movieId])

  


  return (
    <div className='flex flex-col'>

        <PageWrapper>
          <img className='w-full  'src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} alt={movie.title} />
          
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
            {/* Tagline */}
            {/* ============================== */}
          <div className='border-b-2 border-red-700 w-fit mt-3'>
            <p className='italic'>{movie.tagline}</p>
          </div>
          
          
          <p className='mt-1'>{movie.overview}</p>
          {/* Cast */}
          {/* ============================== */}
          <div className='flex flex-col gap-2  mt-5 '>
            <h1 className='text-2xl font-bold'>Cast</h1>
            <div className="flex overflow-scroll gap-3 rounded-md hover:border border-gray-400 ">
              {
                actors.map((actor:Actor) => {
                  return (
                    <Link key={actor.id} href={`/Actor/${actor.id}`} className='flex flex-col justify-center items-center min-w-fit '>
          
                      {actor.profile_path &&
                        <img className='w-28' src={`https://image.tmdb.org/t/p/original${actor.profile_path}`} alt={actor.name} />
                      }
                      <p className='text-sm'>{actor.name.slice(0,13)}</p>
                      <p className='text-xs text-gray-600'>{`(${actor.character.slice(0,13)})`}</p>
                    </Link>
                  )
                })
              }
            </div>
                </div>
                
                {/* Videos */}
                {/* ============================== */}
          
                {
          video? <div className="flex justify-center items-center">
          <iframe className='mt-10 mb-10 
          h-52 w-80 
          md:h-[19rem] md:w-[26rem] 
          lg:h-[30rem] lg:w-[55rem]
          
           shadow-2xl
          
          ' src={`https://www.youtube.com/embed/${video}`} title={`${movie.title} Trailer`}  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
        </div>
          : <p className=''></p>
                }
          
                {/* Reviews */}
                {/* ============================== */}
          { reviews && <div className="flex flex-col">
            <h1 className='text-2xl font-bold '>Reviews</h1>
                  <div className='flex overflow-scroll  gap-2 '>
            {
              reviews?.map((review:Review) => {
                return (
                  <div key={review.id} className='flex flex-col border border-gray-400 p-2 gap-2 mt-3 min-w-fit shadow-2xl'>
                    <div className="flex flex-col">
                      <p className='font-semibold'>{`Author: ${review.author}`}</p>
                      <p className='text-sm flex items-center'>
                        {`Rating: ${review.author_details.rating}`}
                        <AiFillStar className='w-3 ml-[2px] pt-1'/>
                        </p>
                    </div>
                    <p key={review.id}>{review.content.slice(0,readMore.num)}..
                    {
                    review.content.length < 200 ? <span></span> :
                    <button key={review.id} className="text-blue-500" onClick={() => {
                      if(readMore.num === 200){
                        setReadMore({num: review.content.length, text: 'Show Less'})}
                        else{setReadMore({num: 200, text: 'Show More'})}}}
                        >{readMore.text}
                    </button>
                      }
                    </p>
                    <p className='text-xs text-gray-600'>{`Posted by: ${review.author_details.username}`}</p>
                </div>
                )
              })
            }
          
                  </div>
          </div>}
          
          
                {/* Similar */}
                {/* ============================== */}
                <div className="flex flex-col mt-5">
                <h1 className='text-2xl font-bold '>Recomended</h1>
          <div className='flex overflow-scroll gap-3  rounded-md hover:border border-gray-400 p-2 '>
              {
                  similar.map((movie) => {
                    return (
                      <Link  key={movie.id} href={`/Movie/${movie.id}`} as={`/Movie/${movie.id}`} className='flex flex-col justify-center items-center  min-w-fit gap-1  '>
          
                        {movie.backdrop_path ? (
                        <img className='w-56' src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} alt={movie.title} />
                        ) : (
                        <div className='flex w-56 h-32 justify-center items-center bg-gray-600'>
                          <h1>{movie.title}</h1>
                          </div>
                        )}
          
                        <p className='text-sm'>{movie.title}</p>
                        {/* <p className='text-xs text-gray-600'>{`(${movie.character.slice(0,13)})`}</p> */}
                      </Link>
                    )
                  })
                }
              </div>
                </div>
                </div>
        </PageWrapper>

    </div>
  )
}

export default MovieDetail
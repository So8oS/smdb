import React, { useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { AiFillStar } from 'react-icons/ai';

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

interface genre {
  id: number;
  name: string;
}

interface company {
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

const TvDetail = () => {
  const [tv, setTv] = React.useState({} as show)
  const [actors, setActors] = React.useState([] as Actor[])
  const router = useRouter()
  const tvId = router.query.TvId
  const [video, setVideo] = React.useState("")
  const [reviews, setReviews] = React.useState([] as Review[])
  const [readMore, setReadMore] = React.useState({num: 200,text: 'Show More'})
  const [similar, setSimilar] = React.useState([] as show[])

  useEffect(() => {
    axios.get(`https://api.themoviedb.org/3/tv/${tvId}?api_key=${process.env.API_KEY}`)
    .then((res) => {
        setTv(res.data)
    })
    axios.get(`https://api.themoviedb.org/3/tv/${tvId}/credits?api_key=${process.env.API_KEY}`)
      .then((res) => {
        setActors(res.data.cast)
      })
      axios.get(`https://api.themoviedb.org/3/tv/${tvId}/videos?api_key=${process.env.API_KEY}`)
      .then((res) => {
        setVideo(res.data.results[2]?.key || res.data.results[3]?.key)
      })
      axios.get(`https://api.themoviedb.org/3/tv/${tvId}/reviews?api_key=${process.env.API_KEY}`)
      .then((res) => {
          setReviews(res.data.results)
      })
      axios.get(`https://api.themoviedb.org/3/tv/${tvId}/recommendations?api_key=${process.env.API_KEY}`)
      .then((res) => {
          setSimilar(res.data.results)
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
  
        <div className='px-2 flex flex-col'>
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

          
          
      {/* Cast */}
      {/* ============================== */}

      <div className='flex flex-col gap-2 mt-5 '>
        <h1 className='text-2xl font-bold'>Cast</h1>
        <div className='flex overflow-scroll gap-3 rounded-md hover:border border-gray-400 '>
        {
            actors.map((actor) => {
              return (
                <Link key={actor.id} href={`/Actor/${actor.id}`} className='flex flex-col justify-center items-center min-w-fit '>
                  <img className='w-28' src={`https://image.tmdb.org/t/p/original${actor.profile_path}`} alt={actor.name} />
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
        video? <iframe className='mt-10 mb-10 h-64 w-full p-2 ' src={`https://www.youtube.com/embed/${video}`} title={`${tv.name} Trailer`}  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
        : <p className=''></p>
      }

      {/* Reviews */}
      {/* ============================== */}

        { reviews && <div className="flex flex-col mt-5">
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
                similar.map((tv) => {
                  return (
                    <Link  key={tv.id} href={`/tv/${tv.id}`} as={`/Movie/${tv.id}`} className='flex flex-col justify-center items-center  min-w-fit gap-1  '>
        
                      {tv.backdrop_path ? (
                      <img className='w-56' src={`https://image.tmdb.org/t/p/original${tv.backdrop_path}`} alt={tv.name} />
                      ) : (
                      <div className='flex w-56 h-32 justify-center items-center bg-gray-600'>
                        <h1>{tv.name}</h1>
                        </div>
                      )}
        
                      <p className='text-sm'>{tv.name}</p>
                      {/* <p className='text-xs text-gray-600'>{`(${movie.character.slice(0,13)})`}</p> */}
                    </Link>
                  )
                })
              }
            </div>
      </div>





        </div>
  
      </div>
    );
  };
  
  export default TvDetail;
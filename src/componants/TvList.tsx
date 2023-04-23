import axios from 'axios'
import React, { useEffect } from 'react'
import TvCard from './TvCard'

interface Tv {
    id: number
    name: string
    poster_path: string
}



const TvList = ({ type }: { type: string }) => {
    const [tv, setTv] = React.useState([])
    useEffect(() => {
        axios.get(`https://api.themoviedb.org/3/tv/${type}?api_key=70d7f1c2e02011774ccb989c4e9584c3`)
        
        .then((res) => {
            setTv(res.data.results)
        })
        .catch((err) => {
          console.log(err)
        })
    }, [type])

   

  return (
    <div className='flex flex-col justify-center items-center mt-7 p-2'>
        <h1 className='font-bold text-3xl font-Lobster self-start ' >{type.charAt(0).toUpperCase() + type.replace('_',' ').slice(1)}</h1>
        
        <div className='mt-5 flex  overflow-x-scroll gap-3 p-2'>
            {tv.map((tv:Tv) => {
                return (
                    <TvCard key={tv.id} id={tv.id} title={tv.name} poster_path={tv.poster_path}  />
                )
            })}
        </div>
    
    </div>
  )
}

export default TvList
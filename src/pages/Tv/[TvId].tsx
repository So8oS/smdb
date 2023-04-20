import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

interface show {
    id: number;
    name: string;
    backdrop_path: string;
    

}



const TvDetail = () => {
  const [tv, setTv] = React.useState({} as show)
  const router = useRouter()
  const tvId = router.query.TvId

  
    axios.get(`https://api.themoviedb.org/3/tv/${tvId}?api_key=70d7f1c2e02011774ccb989c4e9584c3`)
    .then((res) => {
        setTv(res.data)
    })
    .catch((err) => {
      console.log(err)
    })
    // console.log(tvId)


  return (
    <div className='flex flex-col'>
      <h1>uug</h1>
          {/* <div>{tvId}</div> */}
          <img className='w-56 rounded-2xl'
          src={`https://image.tmdb.org/t/p/original${tv.backdrop_path}`} alt={tv.name} />
          <p>{tv.name}</p>
        </div>
    

    
  )
}

export default TvDetail
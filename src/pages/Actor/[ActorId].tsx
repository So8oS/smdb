import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';


interface Credit {
    id: number;
    name: string;
    profile_path: string;
    birthday: string;
    place_of_birth: string;
    biography: string;
}

const CreditDetails = () => {
  const [credit, setCredit] = useState( {} as Credit);
  const router = useRouter()
  const creditId = router.query.ActorId
  const [readMore, setReadMore] = React.useState({num: 250,text: 'Show More'})


  console.log(creditId)

  useEffect(() => {
    axios.get(`https://api.themoviedb.org/3/person/${creditId}?api_key=70d7f1c2e02011774ccb989c4e9584c3`)
      .then((res) => {
        setCredit(res.data)
        console.log(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [creditId])

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
      </div>
    </div>
  );
};

export default CreditDetails;

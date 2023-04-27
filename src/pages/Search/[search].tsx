import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { BsSearch } from 'react-icons/bs';

interface searchResult {
  id: number;
  title: string;
  poster_path: string;
  profile_path: string;
  name: string;
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
  media_type: string;
}

const SearchPage = () => {
  const [searchResult, setSearchResult] = useState<searchResult[]>([]);
  const [search, setSearch] = useState<string>('avengers');

  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/search/multi?api_key=${process.env.API_KEY}&query=${search}`)
      .then((res) => {
        setSearchResult(res.data.results);
      });
  }, [search]);

  return (
    <div className="flex flex-col justify-center items-center p-2 gap-5">
      <div className="flex items-center h-8 w-full rounded-lg focus-within:shadow-lg bg-white gap-2 px-3">
        <BsSearch className="text-[#D1D5DB] w-6 h-6" />
        <input
          className="h-full w-full outline-none text-sm text-gray-700 pr-2"
          type="text"
          id="search"
          placeholder="Search"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="w-full h-full bg-[#1B1E2C] flex flex-col overflow-scroll shadow-lg">
        {searchResult.map((result: searchResult) => (
          <Link
            href={
              result.media_type === 'movie'
                ? `/Movie/${result.id}`
                : result.media_type === 'tv'
                ? `/Tv/${result.id}`
                : result.media_type === 'person'
                ? `/Actor/${result.id}`
                : '/'
            }
            key={result.id}
            className="flex items-center gap-3 text-center border-b border-white">
           {result.poster_path ?
             <img className="w-20 h-full" src={`https://image.tmdb.org/t/p/w500/${result.poster_path || result.profile_path}`} />
             : <div className="w-20 h-full py-2" >{result.title || result.name}</div>
            }
           
            <h1 className="">{result.title || result.name}</h1>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
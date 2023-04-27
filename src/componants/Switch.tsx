import React, { useEffect } from 'react'
import { MdLocalMovies } from 'react-icons/md'
import { RiMovie2Fill } from 'react-icons/ri'
import Link from 'next/link'
import axios from 'axios'
import { FaSearch } from 'react-icons/fa'
import { BsSearch } from 'react-icons/bs'


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
}


const Switch = () => {
const [search, setSearch] = React.useState('')
const [searchResult, setSearchResult] = React.useState([])
const [open, setOpen] = React.useState(false)




useEffect(() => {
axios.get(`https://api.themoviedb.org/3/search/multi?api_key=${process.env.API_KEY}&query=${search}`)
.then((res) => {
    console.log(res.data.results)
    setSearchResult(res.data.results)

})
}, [search])

  return (
    <div className='p-2 font-medium fixed bottom-0  flex justify-center items-center w-full gap-10 text-sm border-t  rounded-lg border-gray-600  bg-[#1B1E2C] '>
        {/* <Link href={'/'}  className=' w-12 flex flex-col justify-center items-center gap-1 hover:bg-gray-500  border-gray-200'>
            <AiFillHome className='w-8 h-6'/>
            <h1>Home</h1>
        </Link> */}
        
        <h1 className='font-Lobster text-3xl shadow-2xl text-[#F5F5F5] cursor-pointer'
        onClick={
            () => {
              window.location.href = '/' 
            }}
        >SMDB</h1>

        <Link href={'/'}  className=' w-12  flex flex-col justify-center items-center gap-1 hover:bg-gray-700   border-gray-200 rounded-md'>
            <RiMovie2Fill className='w-8 h-6'/>
            <h1>Movies</h1>
        </Link>

        <Link href={'/Tv'}  className=' w-12 flex flex-col justify-center items-center gap-1 hover:bg-gray-700   border-gray-200 rounded-md'>
            <MdLocalMovies className='w-8 h-6'/>
            <h1>Tv</h1>
        </Link>

        <Link href={'/Search/Search'}  className=' w-12 flex flex-col justify-center items-center gap-1 hover:bg-gray-700   border-gray-200 rounded-md'>
            <FaSearch className='w-8 h-6'/>
            <h1>Search</h1>
        </Link>

        

        
        {/* <div className="  flex items-center max-w-lg h-8 rounded-lg focus-within:shadow-lg bg-white overflow-hidden gap-2 px-3"
        
        >
            <BsSearch className='text-[#D1D5DB] w-6 h-6'/>
            <input
            className=" h-full w-full outline-none text-sm text-gray-700 pr-2"
            type="text"
            id="search"
            placeholder="Search"
            onChange={(e) => setSearch(e.target.value)}
            /> 
        </div>

       { searchResult.length > 0  && 
        <div className='absolute bottom-[4.2rem] w-80 h-96 bg-[#1B1E2C] flex flex-col overflow-scroll
                        rounded-lg shadow-lg border border-gray-600 
        '>
            {
                searchResult.map((result:searchResult) => {
                    return (
                    <Link href={`/Movie/${result.id}`} key={result.id}
                     className='flex items-center gap-3 text-center border-b border-white '>
                        <img className='w-20 h-full' src={`https://image.tmdb.org/t/p/w500/${result.poster_path || result.profile_path }`} />
                            <h1 className=''>{result.title || result.name}</h1>
                    </Link>
                    )
                })
            }
        </div>
        } */}
    </div> 
  )
}

export default Switch
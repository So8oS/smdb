import React from "react";
import List from "@/componants/List";
import axios from "axios";
import PageWrapper from "@/componants/PageWrapper";

export const getStaticProps = async () => {
  const topRatedRes = await axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.API_KEY}`)
  const topRatedMovies = topRatedRes.data.results
  
  const nowPlayingRes = await axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.API_KEY}`)
  const nowPlayingMovies = nowPlayingRes.data.results
  
  const popularRes = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}`)
  const popularMovies = popularRes.data.results
  
  const upcomingRes = await axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.API_KEY}`)
  const upcomingMovies = upcomingRes.data.results
  
  return {
      props: {
          topRatedMovies,
          nowPlayingMovies,
          popularMovies,
          upcomingMovies
      }
  }
}

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
  




export default function Home({topRatedMovies, nowPlayingMovies, popularMovies, upcomingMovies}: {topRatedMovies: Movie[], nowPlayingMovies: Movie[], popularMovies: Movie[], upcomingMovies: Movie[]}) {

  return (
    <div className=' overflow-hidden flex flex-col justify-center items-center'>
      <PageWrapper>
        {topRatedMovies.length === 0 || nowPlayingMovies.length === 0 || popularMovies.length === 0 || upcomingMovies.length === 0 ? (
          <div className="flex flex-col items-center justify-center w-full h-full">
            <div className="animate-pulse rounded-lg bg-gray-200 h-16 w-72 my-4"></div>
            <div className="animate-pulse rounded-lg bg-gray-200 h-96 w-72 my-4"></div>
            <div className="animate-pulse rounded-lg bg-gray-200 h-16 w-72 my-4"></div>
          </div>
        ) : (
          <>
            <List movies={topRatedMovies} type={"Top rated"} />
            <List movies={nowPlayingMovies} type={"Now Playing"} />
            <List movies={popularMovies} type={"Populer"} />
            <div className="mb-10">
              <List movies={upcomingMovies} type={"Upcoming"} />
            </div>
          </>
        )}
      </PageWrapper>
    </div>
  );
};




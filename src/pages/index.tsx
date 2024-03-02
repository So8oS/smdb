import React, { useEffect, useState } from "react";
import List from "@/componants/List";
import axios from "axios";
import PageWrapper from "@/componants/PageWrapper";
import Skeleton from "react-loading-skeleton";

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

const Home = () => {
  const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState<Movie[]>([]);
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const [upcomingMovies, setUpcomingMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const topRatedRes = await axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.API_KEY}`);
        setTopRatedMovies(topRatedRes.data.results);

        const nowPlayingRes = await axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.API_KEY}`);
        setNowPlayingMovies(nowPlayingRes.data.results);

        const popularRes = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}`);
        setPopularMovies(popularRes.data.results);

        const upcomingRes = await axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.API_KEY}`);
        setUpcomingMovies(upcomingRes.data.results);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);

  const lists = [
    { movies: topRatedMovies, type: "Top rated" },
    { movies: nowPlayingMovies, type: "Now Playing" },
    { movies: popularMovies, type: "Popular" },
    { movies: upcomingMovies, type: "Upcoming" },
  ];

  return (
    <div className="overflow-hidden flex flex-col ">
      {lists.map((list, index) => (
        <List key={index} loading={loading} movies={list.movies} type={list.type} />
      ))}
    </div>
  );
};
export default Home;

const ListSkeleton = () => {
  return (
    <div className="flex flex-col  mt-7 p-2">
      <div className="font-bold text-3xl w-24  font-Lobster self-start ">{<Skeleton />}</div>

      <div className="mt-5 flex  hover:overflow-x-scroll gap-3 p-2">
        {Array.from({ length: 10 }).map((_, index) => {
          return (
            <div
              className="flex flex-col justify-center items-center min-w-fit rounded-md"
              style={{
                boxShadow: "0 0 1px red, 0 0 10px red, 0 0 5px red, 0 0 5px red",
              }}
            >
              <Skeleton width={150} height={200} className="w-28 rounded-md shadow-xl hover:shadow-2xl transition duration-300 ease-in-out transform hover:scale-110" />
            </div>
          );
        })}
      </div>
    </div>
  );
};

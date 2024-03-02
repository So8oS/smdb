import React from "react";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
}

interface ListProps {
  movies: Movie[];
  type: string;
  loading: boolean;
}

const List = ({ movies, type }: ListProps) => {
  const [imageLoded, setImageLoded] = React.useState(false);
  return (
    <div className="flex flex-col  mt-7 p-2">
      <h1 className="font-bold text-3xl font-Lobster self-start ">{type}</h1>

      <div className="mt-5 flex overflow-x-scroll md:overflow-x-hidden md:hover:overflow-x-scroll gap-3 p-2">
        {movies.map((movie: Movie) => {
          return (
            <Link
              href={`/Movie/${movie.id}`}
              className="flex flex-col justify-center items-center min-w-fit rounded-md   "
              style={{
                boxShadow: "0 0 1px red, 0 0 10px red, 0 0 5px red, 0 0 5px red",
              }}
            >
              {!imageLoded && <Skeleton width={112} height={160} className={`w-28 rounded-md h-40  `} />}
              <img
                onLoad={() => setImageLoded(true)}
                className={`w-28 h-40 rounded-md shadow-xl hover:shadow-2xl transition  ${imageLoded ? "block" : "hidden"}  duration-300 ease-in-out transform hover:scale-110`}
                src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                alt={movie.title}
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default List;

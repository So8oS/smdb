import axios from "axios";
import React, { useEffect } from "react";
import Link from "next/link";

interface Tv {
  id: number;
  name: string;
  poster_path: string;
}

const TvList = ({ type }: { type: string }) => {
  const [tv, setTv] = React.useState([]);
  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/tv/${type}?api_key=${process.env.API_KEY}`)

      .then((res) => {
        setTv(res.data.results);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [type]);

  return (
    <div className="flex flex-col justify-center items-center mt-7 p-2">
      <h1 className="font-bold text-3xl font-Lobster self-start ">{type.charAt(0).toUpperCase() + type.replace("_", " ").slice(1)}</h1>

      <div className="mt-5 flex  overflow-x-scroll md:overflow-x-hidden md:hover:overflow-x-scroll gap-3 p-2">
        {tv.map((tv: Tv) => {
          return (
            <Link
              href={`/Tv/${tv.id}`}
              className="flex flex-col justify-center items-center min-w-fit rounded-md"
              style={{
                boxShadow: "0 0 1px red, 0 0 10px red, 0 0 1px red, 0 0 1px red",
              }}
            >
              <img
                className="w-28 rounded-md shadow-xl hover:shadow-2xl transition duration-300 ease-in-out transform hover:scale-110"
                src={`https://image.tmdb.org/t/p/original${tv.poster_path}`}
                alt={tv.name}
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default TvList;

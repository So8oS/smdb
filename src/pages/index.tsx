import React from "react";
import List from "@/componants/List";

export default function Home() {

  return (
    <div className='flex flex-col justify-center items-center' >
     <List type="top_rated"/>
     <List type="now_playing"/>
     <List type="popular" />
     <div className="mb-10">
      <List type="upcoming"/>
     </div>
    </div>
  )
}

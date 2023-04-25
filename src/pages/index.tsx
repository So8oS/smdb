import React from "react";
import List from "@/componants/List";
import Navbar from "@/componants/Navbar";
import Typewriter from "typewriter-effect";





export default function Home() {
 


  return (
    <div className='flex flex-col justify-center items-center' >
     {/* <Navbar /> */}
     <List type="top_rated"/>
     <List type="now_playing"/>
     <List type="popular" />
     <div className="mb-10">
      <List type="upcoming"/>
     </div>
    </div>
  )
}

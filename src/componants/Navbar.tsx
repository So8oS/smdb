import Link from 'next/link'
import React from 'react'


const Navbar = () => {
  return (
    <div className='flex justify-between items-center w-full h-24 px-8 '>
        <h1  className='text-4xl font-Lobster'
         onClick={
          () => {
            window.location.href = '/' 
          }}
        >SMDB</h1>
        <div className='flex gap-2 ' >
          <Link href="/Tv"  className='text-3xl font-Lobster '>TV</Link>
          <Link href="/"  className='text-3xl font-Lobster '>Movie</Link>
        </div>
        
    </div>
  )
}

export default Navbar
import TvList from '@/componants/TvList'
import React from 'react'

const TvPage = () => {
  return (
    <div 
    className='flex flex-col justify-center items-center gap-10 ' >
     <TvList type="top_rated"/>
     <TvList type="on_the_air"/>
     <TvList type="popular" />
     <div className="mb-16">
     <TvList type="airing_today"/>
     </div>
    </div>
  )
}

export default TvPage
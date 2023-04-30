import TvList from '@/componants/TvList'
import React from 'react'
import PageWrapper from '@/componants/PageWrapper'
const TvPage = () => {
  return (
    <div className='flex flex-col justify-center items-center' >
     <PageWrapper>
       <TvList type="top_rated"/>
       {/* <TvList type="on_the_air"/> */}
       <TvList type="popular" />
       <div className="mb-16">
       <TvList type="airing_today"/>
       </div>
     </PageWrapper>
    </div>
  )
}

export default TvPage
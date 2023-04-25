import React, { useEffect } from 'react'
import Navbar from '@/componants/Navbar'
import Switch from '@/componants/Switch'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Typewriter from 'typewriter-effect'
// import AOS from 'aos';
import 'aos/dist/aos.css';


export default function App({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = React.useState(false);
  
  useEffect(() => {
  setTimeout(() => {
    setLoading(true);
    // AOS.init({once: true});
  }, 2300);
}, []);

return (
  <>
    {!loading ?(
      <div className="flex justify-center items-center h-screen bg-[#1B1E2C] text-white font-bold text-5xl">
        <Typewriter options={{ strings: ['SMDB'],autoStart: true, }}/>
      </div>
    ) : (
      <div className=''>
        <Component {...pageProps} />
        <Switch />
      </div>)}
  </>
      )
} 

// if(!loading){
//   return (
//   <div className="flex justify-center items-center h-screen
//   bg-[#1B1E2C]
//   text-white
//   font-bold
//   text-5xl

  
//   ">
//   <Typewriter  
//       options={{
//         strings: ['SMDB'],
//         autoStart: true,

//       }}/>
//   </div>)
// }
// else{ 
//  return <div className='flex flex-col min-h-screen'

  
  
//  >
//     <Component  {...pageProps} />
//     <Switch/>
//   </div>
// }
// }

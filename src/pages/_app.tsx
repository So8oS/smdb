import React, { useEffect } from 'react'
import Switch from '@/componants/Switch'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Typewriter from 'typewriter-effect'

import {motion, AnimatePresence} from 'framer-motion'

export default function App({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
  setTimeout(() => {
    setLoading(true);
  }, 2300);
}, []);

return (
  <>
    {!loading ?(
      <div className="flex justify-center items-center h-screen bg-[#1B1E2C] text-white font-bold text-5xl">
        <Typewriter options={{ strings: ['SMDB'],autoStart: true, }}/>
      </div> 
    ) : (
      <>
        <AnimatePresence>
          <motion.div
          initial={{opacity: 0, y: 15}}
          animate={{opacity: 1, y: 0}}
          exit={{opacity: 0, y: 15}}
          transition={{delay: 1}}
          >
        
                <Component {...pageProps} />
        
          </motion.div>
        </AnimatePresence>
          <Switch />
      </>
      )}
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

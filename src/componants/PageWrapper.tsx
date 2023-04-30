import React from 'react'
import {motion, AnimatePresence} from 'framer-motion'


const PageWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
    <AnimatePresence>
    <motion.div
        //   initial={{ opacity: 0, x: 100, width: '100%', overflow: 'hidden' }}
        //   animate={{ opacity: 1, x: 0 }}
        //   exit={{ opacity: 0, x: -100 }}
        //   transition={{ ease: "easeInOut", duration: 0.5 }}
        //   style={{
        //     position: 'absolute',
        //     top: 0,
        //     left: 0,
        //     right: 0,
        //     bottom: 0,
        //     width: '100%',
        //     height: '100%',
        //   }}
        >
           {children}
        </motion.div>
    </AnimatePresence>
    </>
  )
}

export default PageWrapper
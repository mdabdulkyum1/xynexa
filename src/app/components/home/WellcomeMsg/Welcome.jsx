"use client"
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

const Welcome = () => {

    const [open, setOpen] = React.useState(true);

   

    useEffect(() => {
        const timer = setTimeout(() => {
            setOpen(false);
        }, 5000);

         

        return () => clearTimeout(timer);
    }
        , []);





    return (
        <>
            {
                open && (
                    <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center w-full h-screen  bg-black/40 backdrop-blur-sm">
                        <motion.div
              initial={{ opacity: 0, y: -100, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1, ease: "easeInOut" }}
              className="bg-cover bg-center rounded-lg shadow-lg p-6 w-[300px] md:w-[400px] lg:w-1/2 h-[200px] md:h-[300px] lg:h-[450px] mx-auto bg-white"
              style={{
                
                backgroundImage: 'url("https://cdn.vectorstock.com/i/500p/61/20/eid-mubarak-with-mosque-greeting-card-vector-56066120.jpg")'
              }}
            >
              
            </motion.div>

                    </div>
                )
            }
        </>
    );
};

export default Welcome;

'use client'
import { useRouter } from 'next/navigation';
import React from 'react'
import { FaArrowCircleRight } from "react-icons/fa";

const HomePage = () => {
  const r = useRouter()
  
  const handleNav = () => {
    r.push('/create')
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen'>
      <main className='p-5'>
        <div className='text-8xl md:text-9xl pb-5 gap-10 flex items-center'>
          <p>GenQr</p>  <FaArrowCircleRight onClick={handleNav} className='hidden md:block cursor-pointer' />
        </div>
        <p className='text-5xl md:text-6xl'>
          A free and open-source QR code generator.
        </p>
        <FaArrowCircleRight onClick={handleNav} className='md:hidden block text-8xl mt-10 cursor-pointer' />
      </main>
    </div>
  )
}

export default HomePage
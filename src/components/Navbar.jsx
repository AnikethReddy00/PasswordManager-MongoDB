import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-slate-800 text-white flex justify-between items-center px-10 h-[6vh] sticky top-0'>
        <div className="logo font-bold text-3xl">
            <span className='text-green-500'>&lt;</span>
            Pass
            <span className=' text-green-500'>OP/&gt;</span>
            
        </div>
      <button className='text-white bg-green-700 my-2 px-6 rounded-xl flex items-center gap-2'>
        <img className=' invert w-10 p-1' src="/icons/github.svg" alt="dddf" />
        <p className='font-bold'>Github</p>
      </button>
    </nav>
  )
}

export default Navbar

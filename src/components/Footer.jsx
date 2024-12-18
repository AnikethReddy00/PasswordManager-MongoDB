import React from 'react'

const Footer = () => {
  return (
    <div className='bg-slate-800 text-white flex flex-col items-center gap-2 sticky bottom-0'>
      <div className="logo font-bold text-3xl">
            <span className='text-green-500'>&lt;</span>
            Pass
            <span className=' text-green-500'>OP/&gt;</span>
            
        </div>
        <div>
            <p>Created By Aniketh Reddy</p>
        </div>
    </div>
  )
}

export default Footer

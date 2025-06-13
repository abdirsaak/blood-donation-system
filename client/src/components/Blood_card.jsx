import React from 'react'

function Blood_card({ title, description1, description2, description3, image }) {
  return (
    <div className='bg-[#E11F8F] shadow-md rounded-lg p-6 max-w-sm mx-auto my-4
    
    '>
      <img src={image} alt={title} />
    <h2 className='text-xl text-center font-semibold mb-2 my-10'>{title}</h2>
    <p className='text-gray-700 mb-4'>{description1}</p>
    <p className='text-gray-700 mb-4'>{description2}</p>
    <p className='text-gray-700 mb-4'>{description3}</p>
    </div>
  )
}

export default Blood_card

import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function NotFound() {
  const navigate = useNavigate()

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#0B0F17]">
      <div className="w-[550px] h-[350px] rounded-3xl bg-[#0B0F17]/50 border border-gray-800 shadow-lg backdrop-blur-md text-center pt-8">
        <h1 className="text-[10rem] font-extrabold text-green-400 -mb-4">
          404
        </h1>
        <h2 className="text-white mb-3 text-2xl font-bold">
          Oops, Page Not Found
        </h2>
        <p className="text-gray-300 font-medium mx-4 mb-6">
          Page that you're looking for isn't found
        </p>
        <button 
          onClick={() => navigate('/')}
          className="mt-4 px-6 py-3 rounded-lg border-none bg-green-500 text-white font-bold cursor-pointer transition-all duration-300 hover:bg-green-400"
        >
          Go Back
        </button>
      </div>
    </div>
  )
}

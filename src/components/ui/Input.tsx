import React from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string
}

export const Input: React.FC<InputProps> = ({ className = '', ...props }) => {
  return (
    <input
      className={`
        flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm 
        placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 
        focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50
        ${className}
      `}
      {...props}
    />
  )
}

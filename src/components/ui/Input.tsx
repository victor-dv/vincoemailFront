import React from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string
  label?: string
}

export const Input: React.FC<InputProps> = ({ className = '',label, ...props }) => {
  return (
    <div className='space-y-1'>
        {label && <label className='block text-sm font-medium text-gray-700'>{label}</label>}
      <input
        className={`
        flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm 
        placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 
        focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50
        ${className}
      `}
        {...props}
      />
    </div>

  )
}

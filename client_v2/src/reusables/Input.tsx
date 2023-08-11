import React from 'react'

type Props = {
  label: string,
  labelClassName?: string,
  containerClassName?: string,
  type?: 'text' | 'date' | 'number' | 'email' | 'password',
  inputClassName?: string,
  value: string | number,
  handleChange: Function,
  required?: boolean
  id?: string
}

function Input(
  { 
    label, 
    labelClassName, 
    containerClassName, 
    type = 'text',
    inputClassName,
    value,
    handleChange,
    required = false,
    id
  }: Props
) 
{
  return (
    <div className={`${containerClassName} flex flex-col`}>
      <label 
        htmlFor={id} 
        className={`${labelClassName} text-left text-gray-800 font-light`}
      >
        { label }
        <span 
          className={`${required ? '' : 'hidden'} text-red-500`}
          title={`${label} is required`}
        > *</span>
      </label>
      <input 
        type={type} 
        name="" 
        id={id} 
        className={`${inputClassName} border rounded-md border-indigo-200 focus:border-indigo-700 h-8`} 
        value={value}
        onChange={(e) => handleChange(e)}
      />
    </div>
  )
}

export default Input
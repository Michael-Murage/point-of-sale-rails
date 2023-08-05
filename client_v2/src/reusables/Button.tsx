import React from 'react'

type Props = {
  type?: 'button' | 'submit',
  handleClick?: Function,
  handleSubmit?: Function,
  containerClassName?: string,
  buttonClassName?: string,
  value?: string,
}

function Button({ 
  type = 'button', 
  handleClick = (() => {}), 
  handleSubmit = (() => {}), 
  buttonClassName, 
  containerClassName, 
  value = 'SUBMIT' 
}: Props) {
  return (
    <div className={`${containerClassName} `}>
      <input 
        type={type} 
        value={value}
        className={`${buttonClassName} `}
        onClick={(e) => handleClick(e)}
        onSubmit={(e) => handleSubmit(e)}
      />
    </div>
  )
}

export default Button
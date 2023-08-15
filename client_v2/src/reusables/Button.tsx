import React from 'react'

type Props = {
  type?: 'button' | 'submit' | 'reset' | undefined,
  handleClick?: Function,
  handleSubmit?: Function,
  containerClassName?: string,
  buttonClassName?: string,
  value?: string,
  style?: Object
}

function Button({ 
  type, 
  handleClick = (() => {}), 
  handleSubmit = (() => {}), 
  buttonClassName, 
  containerClassName, 
  value = 'SUBMIT',
  style = {}
}: Props) {
  return (
    <div className={`${containerClassName} `}>
      <button 
        type={type} 
        className={`${buttonClassName} `}
        onClick={(e) => handleClick(e)}
        onSubmit={(e) => handleSubmit(e)}
        style={style}
      >
        { value }
      </button>
    </div>
  )
}

export default Button
import React from 'react'

export default function Alert(props){
  const alertStyle = {
    position: 'absolute',
    top: '40px',
    background: 'red',
    color: 'white'
  }
  const alert = props.length > 25 && <p style={alertStyle}>
    Maximum Character: 25
  </p>
  return(
    <div>
      {alert}
    </div>
  )
}

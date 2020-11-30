import React from 'react'

export default function Alert(props){
  let alert
  if(!props.length){
    alert = "Please input food name"
  }else if(props.data === null){
    alert = "There's no food with such name"
  }else{
    alert = null
  }
  return(
    <span className="alert"> 
      {alert}
    </span>
  )
}
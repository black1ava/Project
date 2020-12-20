import React from 'react'

export default function DisplayFoodType(props){
  return(
    <p 
      onClick={() => props.typeClick(props.food.id)}
    >
      {props.food.name}
    </p>
  )
}

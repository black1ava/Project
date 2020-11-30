import React from 'react'

export default function DisplayFoodCategory(props){
  return(
    <div>
      <p 
        onClick={() => props.categoryClick(props.food.id)}
      >
        {props.food.name}
      </p>
    </div>
  )
}
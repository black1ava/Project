import React from 'react'

export default function AssistantDisplayType(props){
  
  const style = {
    textDecorationLine: "underline",
    textDecorationStyle: "double"
  }
  
  return(
    <div>
      <h2 
        onClick={() => props.handleClick(props.food.idMeal)}
        style={style}
      >
        {props.food.strMeal}
      </h2>
      <div>
        <img 
          src={props.food.strMealThumb} 
          alt="Food Img"
        />
      </div>
    </div>
  )
}
import React from 'react'

export default class Display extends React.Component{
  
  state = { 
    Instruction: false,
    Ingredient: false
  }
  
  handleInstruction = () => {
    this.setState({ 
      Instruction: !this.state.Instruction 
    })
  }
  
  handleIngredient = () => {
    this.setState({ 
      Ingredient: !this.state.Ingredient 
    })
  }
  
  render(){
    const showInstruction = this.state.Instruction && <p> 
      {this.props.food.strInstructions}
    </p>
    
    let ingredient = ""
    let measure = ""
    const ingList = []
    
    for(let i = 1; i <= 20; i++){
      ingredient = "strIngredient" + i
      measure = "strMeasure" + i
      
      const list = `${this.props.food[ingredient]} : ${this.props.food[measure]}`
      
      ingList.push(list)
    }
    
   let i = 0
   
   for(; i < 20; i++){
      if(ingList[i].length <= 4){
        break
      }
    }
    
    if(i < 20){
      ingList.splice(i, 20 - i)
    }
    
    const ingredientList = this.state.Ingredient && ingList.map(ingredient => <li>
      {ingredient}
    </li>)
    
    const linkVideo = this.props.food.strYoutube
    
    const video = linkVideo != null && linkVideo.length > 5 &&  <button 
      className="infoLink"
    >
      <a 
        href={this.props.food.strYoutube}
        target="_blank"
        className="link"
      >
        Learn how to cook
      </a>
    </button>
    const link = this.props.food.strSource
    const info = link != null && link.length > 5 && <button
      className="infoLink"
    >
      <a 
        href={link}
        target="_blank"
        className="link"
      >
       More Info
      </a>
    </button>
    
    return(
      <div>
        <h2>{this.props.food.strMeal}</h2>
        <div>
        <h5>
          <span className="info">
            Catagory: {this.props.food.strCategory}/
            Type: {this.props.food.strArea}/
            Tag: {this.props.food.strTags}
          </span>
        </h5>
          <img 
            src={this.props.food.strMealThumb}
            alt="Food Img"
          />
        </div>
        <div>
           <button 
            onClick={this.handleIngredient}
            className="info"
          >
            Ingredients
          </button>
          <button 
            onClick={this.handleInstruction}
            className="info"
          >
            Instruction
          </button>
        </div>
        <div>
          {video}
          {info}
        </div>
        <div>
          <div>
            <ul>
              {ingredientList}
            </ul>
          </div>
        </div>
        <div>
          {showInstruction}
        </div>
      </div>
    )
  }
}

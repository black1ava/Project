import React from 'react'
import DisplayFoodType from './AssistantDisplay/DisplayFoodType'
import DisplayFoodCategory from './AssistantDisplay/DisplayFoodCategory'

export default class Menu extends React.Component{
  state = {
    ShowMenu: false,
    ShowType: false,
    ShowCategory: false,
    FoodType: [],
    FoodCategory: []
  }
  
  showType = () => {
    this.setState({ ShowType: !this.state.ShowType})
  }
  
  showCategory = () => {
    this.setState({ ShowCategory: !this.state.ShowCategory })
  }
  
  handleMenu = () => {
    this.setState({ 
      FoodType: this.props.type,
      FoodCategory: this.props.category,
      ShowMenu: !this.state.ShowMenu
    })
  }
  
  typeClick = id => {
    let foodName
    for(let element of this.state.FoodType){
      if(element.id === id){
        foodName = element.name
      }
    }
    
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${foodName}`)
      .then(response => response.json())
      .then(response => {
        const data = response.meals
        this.props.menuData(data) //send Data to body (parent)
      })
    this.setState({
      ShowMenu: false,
      ShowType: false,
      ShowCategory: false,
    })
  }
  
  categoryClick = id => {
    let name
    for(let element of this.state.FoodCategory){
      if(id === element.id){
        name = element.name
      }
    }
    
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${name}`)
      .then(response => response.json())
      .then(response => {
        const data = response.meals
        this.props.menuData(data)
      })
       
    this.setState({ 
      ShowMenu: false,
      ShowType: false,
      ShowCategory: false,
    })
  }
  
  render(){
    const showFoodType = this.state.ShowType && this.state.FoodType.map(data => <DisplayFoodType 
      food={data}
      typeClick={this.typeClick}
    />)
    
    const showFoodCategory = this.state.ShowCategory && this.state.FoodCategory.map(data => <DisplayFoodCategory 
      food={data}
      categoryClick={this.categoryClick}
    />)
    const showMenu = this.state.ShowMenu && <div className="Menu">
      <div>
        <button 
          onClick={this.showType}
          className="inMenu"
        >
          Food Type
        </button>
        {showFoodType}
      </div>
      <div>
        <button 
          onClick={this.showCategory}
          className="inMenu"
        >
          Food Category
        </button>
        {showFoodCategory}
      </div>
    </div>
    return(
      <div className="button">
        <button 
          onClick={this.handleMenu}
          className="buttonMenu"
        >
          <img 
            className="menuButton"
            src="https://i.ibb.co/pLyPfFP/2320442-200.png"
          />
        </button>
        <div>
          {showMenu}
        </div>
      </div>
    )
  }
}
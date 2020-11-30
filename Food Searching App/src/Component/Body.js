import React from 'react'
import Display from './Display/Display'
import Alert from './Display/Alert'
import Menu from './Display/Menu'
import AssistantDisplayType from './Display/AssistantDisplay/AssistantDisplayType'

export default class Header extends React.Component{
  
  state = {
    FoodName: "",
    FoodData: [],
    Loading: false,
    Length: true,
    Alert: false,
    FoodType: [],
    FoodCategory: [],
    ChildData: null
  }
  
  componentDidMount(){
    fetch("https://www.themealdb.com/api/json/v1/1/list.php?a=list")
      .then(response => response.json())
      .then(response => {
        const type = response.meals.map(data => data.strArea)
        const length = type.length
        const foodType = []
        
        for(let i = 0; i < length; i++){
          foodType.push({
            id: i + 1,
            name: type[i]
          })
        }
        
        this.setState({ FoodType: foodType })
      })
      
      fetch("https://www.themealdb.com/api/json/v1/1/list.php?c=list")
        .then(response => response.json())
        .then(response => {
           const category = response.meals.map(data => data.strCategory)
          const length = category.length
          const foodCategory = []
          
          for(let i = 0; i < length; i++){
            foodCategory.push({
              id: i + 1,
              name: category[i]
            })
          }
          
          this.setState({ FoodCategory: foodCategory })
        })
  }
  
  handleChange = e => {
    const {name, value} = e.target
    this.setState({ [name]: value })
  }
  
  handleSubmit = e => {
    e.preventDefault()
    
    this.setState({ ChildData: null })
    
    if(this.state.FoodName.length){
      
      this.setState({ Loading: true })
      
      if(this.state.FoodName.length === 1){
        const searchByName = fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${this.state.FoodName}`)
        
        const searchByFirstLetter = fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${this.state.FoodName}`)
  
        Promise.all([
          searchByFirstLetter,
          searchByName
        ])
          .then(responses => Promise.all(responses.map(response => response.json())))
          .then(responses => {
            const datas = responses.map(data => data.meals)
            let i
            for(i = 0; i < 2; i++){
              if(datas[i] === null){
                break;
              }
            }
            datas.splice(i, 1)
            const data = []
            
            for(let elements of datas){
              for(let element of elements){
                data.push(element)
              }
            }
            this.setState({ 
              FoodData: data,
              Loading: false,
              Length: true,
            })
          })
          this.setState({ FoodName: "" })
          
      }else{
        
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${this.state.FoodName}`)
           .then(response => response.json())
           .then(response => {
             const data = response.meals
             this.setState({
               FoodData: data,
               Loading: false,
               Length: true,
               FoodName: ""
             })
           })
      }
    }else{
      this.setState({ Length: false })
    }
    this.setState({ Alert: true })
  }
  
  callBack = data => {
    //get data from  menu (child)
    this.setState({ 
      ChildData: data,
      FoodData: [],
      Alert: false,
    })
  }
  
  handleClick = id => {
    this.setState({ Loading: true })
    let name
    for(let element of this.state.ChildData){
      if(element.idMeal === id){
        name = element.strMeal
      }
    }
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
       .then(response => response.json())
       .then(response => {
         const data = response.meals
         this.setState({
           FoodData: data,
           Loading: false,
           Length: true,
           ChildData: null,
           Alert: false
         })
       })
  }
  
  render(){
    let foodName = this.state.Loading && "Loading..."
    const test = this.state.foodData
    
    if(this.state.FoodData !== null){
      foodName = this.state.Loading ? "Loading..." : this.state.FoodData.map(data => <Display 
        food={data}
      />)
    }
    
    const alert = this.state.Alert && <Alert 
          length={this.state.Length}
          data={this.state.FoodData}
      /> 
      
    const menu = <Menu 
      type={this.state.FoodType}
      category={this.state.FoodCategory}
      menuData={this.callBack}
    />
    
    const assiShow = this.state.ChildData !== null && this.state.ChildData.map(
        data => <AssistantDisplayType 
          food={data} 
          handleClick={this.handleClick}
        />
       )
    console.log(this.state.Alert)
    return(
      <div>
        <center>
          <div>
            {menu}
          </div>
          <form onSubmit={this.handleSubmit}>
            <input 
              type="text"
              placeholder="Food Name"
              name="FoodName"
              value={this.state.FoodName}
              onChange={this.handleChange}
            />
            <button style={{
              borderStyle: "none",
              backgroundColor: "transparent",
              position: "relative"
            }}>
              <img 
                src="https://www.linkpicture.com/q/14570.png"
                alt="search"
                style={{
                  maxHeight: "26px",
                  width: "auto"
                }}
              />
            </button>
          </form>
          <div>
            {alert}
            {foodName}
            {assiShow}
          </div>
        </center>
      </div>
    )
  }
}
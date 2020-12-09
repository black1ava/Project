import React from 'react'

import GlobalGraph from './Graph/GlobalGraph'
import List from './List/List'
export default class Body extends React.Component{
  state = { 
    ConfirmedData: null,
    RecoveredData: null,
    DeathsData: null,
    CountriesName: [],
    CountryName: "Global",
    CountryData: ""
  }
  
  componentDidMount(){
    const confirmed = []
    const recovered = []
    const deaths = []
    for(let i = 1; i <= 12; i++){
      const date = i + '-01-2020'
      let totalConfirmed = 0
      let totalRecovered = 0
      let totalDeaths = 0
      fetch(`https://covid19.mathdro.id/api/daily/${date}`)
      .then(response => response.json())
      .then(response => {
        const data = response
        for(let toll of data){
          totalConfirmed += parseInt(toll.confirmed)
          totalRecovered += parseInt(toll.recovered)
          totalDeaths += parseInt(toll.deaths)
        }
        confirmed.push(totalConfirmed)
        recovered.push(totalRecovered)
        deaths.push(totalDeaths)
      })
    }
    
    this.setState({
      ConfirmedData: confirmed,
      RecoveredData: recovered,
      DeathsData: deaths
    })
    fetch("https://covid19.mathdro.id/api/countries")
    .then(response => response.json())
    .then(response => {
      const  countries = response.countries
      const name = countries.map(country => country.name)
      name.unshift("Global")
      this.setState({ CountriesName: name })
    })
  }
  
  handleChange = e => {
    const {name, value} = e.target
    this.setState({ [name]: value} )
  }
  
  render(){
    console.log(this.state.CountriesName)
    const list = this.state.CountriesName.map(element => <List name={element}/>)
    const data = this.state.CountryName === "Global" ? <GlobalGraph 
      confirmed={this.state.ConfirmedData}
      recovered={this.state.RecoveredData}
      deaths={this.state.DeathsData}
    /> : this.state.CountryData
    console.log(this.state.CountryName)
    return(
      <div>
        <div>
          <select
            name="CountryName"
            value={this.state.CountryName}
            onChange={this.handleChange}
          >
            {list}
          </select>
        </div>
        <div>
          {data}
        </div>
      </div>
    )
  }
}
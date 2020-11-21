import React from 'react'

class App extends React.Component{
    constructor(){
        super()
        this.state={
            firstName: "",
            lastName: "",
            age: "",
            gender: "",
            destination: "",
            isVeg: false,
            isKos: false,
            isLac: false
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this. handleSubmit.bind(this)
    }
    handleChange(event){
        const {name, value, type, checked} = event.target
        type === "checkbox" ? this.setState({
            [name]: checked
        }) : this.setState({
            [name]: value
        })
    }
    
    handleSubmit(event){
        event.preventDefault()
         let yourAge = this.state.age > 0 ? this.state.age : null
        let diet = []
        if(this.state.isVeg)
            diet.push("Vegetarian ")
        if(this.state.isKos)
            diet.push("Kosher ")
        if(this.state.isLac)
            diet.push("Lactose_Free ")
        alert(
            'Name: ' + this.state.firstName + ' ' + this.state.lastName +
            '\nAge: ' + yourAge +
            '\nGender: ' + this.state.gender +
            '\nDestination: ' + this.state.destination +
            '\nDiet: ' + diet
        )
    }
    
    render(){
        return(
            <form onSubmit={this.handleSubmit}>
                <input 
                    type="text"
                    placeholder="First Name"
                    name="firstName"
                    value={this.state.firstName}
                    onChange={this.handleChange}
                />
                
                 <input 
                    type="text"
                    placeholder="Last Name"
                    name="lastName"
                    value={this.state.lastName}
                    onChange={this.handleChange}
                />
                
                <input 
                    type="number"
                    placeholder="Age"
                    name="age"
                    value={this.state.age}
                    onChange={this.handleChange}
                />
                <br/>
                <input 
                    type="radio"
                    name="gender"
                    value="Male"
                    checked={this.state.gender === "Male"}
                    onChange={this.handleChange}
                />Male
                <br/>
                <input 
                    type="radio"
                    name="gender"
                    value="Female"
                    checked={this.state.gender === "Female"}
                    onChange={this.handleChange}
                />Female
                <br/>
                <label>
                    Destination: 
                </label>
                <select 
                    name="destination"
                    value={this.state.destination}
                    onChange={this.handleChange}
                >
                    <option value="">
                        ===Choose A Destination===
                    </option>
                    <option value="Thailand">
                        Thailand
                    </option>
                    <option value="Vietnam">
                        Vietnam
                    </option>
                    <option value="Laos">
                        Laos
                    </option>
                </select>
                <br/>
                <label>
                    Dietary: 
                </label>
                <input 
                    type="checkbox"
                    name="isVeg"
                    checked={this.state.isVeg}
                    onChange={this.handleChange}
                />Vegetarian
                 <input 
                    type="checkbox"
                    name="isKos"
                    checked={this.state.isKos}
                    onChange={this.handleChange}
                />Kosher
                 <input 
                    type="checkbox"
                    name="isLac"
                    checked={this.state.isLac}
                    onChange={this.handleChange}
                />Lactose Free
                <button>Submit</button>
                <hr/>
            </form>
        )
    }
}

export default App
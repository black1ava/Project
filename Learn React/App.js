import React from 'react'

class App extends React.Component{
    constructor(){
        super()
        this.state = {
            firstName: "",
            lastName: "",
            textArea: "",
            isFriendly: false,
            favColor: "Red"
        }
        this.handleChange = this.handleChange.bind(this)
    }
    
    handleChange(event){
        const {name, value, type, checked} = event.target
        type === "checkbox" ? this.setState({
            [name]: checked
        }) : this.setState({
            [name]: value
        })
    }
    
    render(){
        return(
            <form>
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
                <textarea 
                    type="text"
                    placeholder="Description"
                    name="textArea"
                    value={this.state.textArea}
                    onChange={this.handleChange}
                />
                <br/>
                <label>
                    <input 
                        type="checkbox"
                        name="isFriendly"
                        checked={this.state.isFriendly}
                        onChange={this.handleChange}
                    />Friendly?
                </label>
                <br/>
                <label>
                    <input 
                        type="radio"
                        name="gender"
                        value="male"
                        checked={this.state.gender === "male"}
                        onChange={this.handleChange}
                    />Male
                    <br/>
                    <input 
                        type="radio"
                        name="gender"
                        value="female"
                        checked={this.state.gender === "female"}
                        onChange={this.handleChange}
                    />Female
                </label>
                <br/>
                <label>
                    Favourite Color: 
                </label>
                <select 
                    name="favColor"
                    value={this.state.favColor}
                    onChange={this.handleChange}
                >
                    <option value="red">
                        Red
                    </option>
                     <option value="green">
                        Green
                    </option>
                    <option value="blue">
                        Blue
                    </option>
                     <option value="pink">
                        Pink
                    </option>
                    <option value="black">
                        Black
                    </option>
                     <option value="purple">
                        Purple
                    </option>
                </select>
                <h3>
                    {this.state.firstName} {this.state.lastName}
                </h3>
                <h4>You are {this.state.gender}</h4>
                <h5>
                    Your favourite color is {this.state.favColor}
                </h5>
            </form>
        )
    }
}

export default App
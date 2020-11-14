import React from 'react'

export default class MemeGenerator extends React.Component{
    constructor(){
        super()
        this.state = {
            topText: "",
            bottomText: "",
            memeUrl: "http://i.imgflip.com/1bij.jpg",
            allMemes: []
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    componentDidMount(){
        fetch("https://api.imgflip.com/get_memes")
            .then(response => response.json())
            .then(response => {
                const {memes} = response.data
                this.setState({
                    allMemes: memes
                })
            })
    }
    handleChange(event){
        const {name, value} = event.target
        this.setState({
            [name]: value
        })
    }
    handleSubmit(event){
        event.preventDefault()
        const randNum = Math.floor(Math.random() * this.state.allMemes.length)
        const meme = this.state.allMemes[randNum].url
        this.setState({
            memeUrl: meme
        })
    }
    render(){
        return(
           <div>
                <center>
                    <form 
                        onSubmit={this.handleSubmit}
                    >
                        <input 
                            type="text"
                            placeholder="top text"
                            name="topText"
                            value={this.state.topText}
                            onChange={this.handleChange}
                        />
                        <input 
                            type="text"
                            placeholder="bottom text"
                            name="bottomText"
                            value={this.state.bottomText}
                            onChange={this.handleChange}
                        />
                        <br/>
                        <button>
                            Generate
                        </button>
                    </form>
                </center>
                <div>
                    <img className="meme" src={this.state.memeUrl}/>
                    <p className="topText">
                        {this.state.topText}
                    </p>
                    <p className="buttomText">
                        {this.state.bottomText}
                    </p>
                </div>
           </div>
        )
    }
}
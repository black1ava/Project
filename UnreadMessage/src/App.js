import React from 'react'

class App extends React.Component{
    constructor(){
        super()
        this.state={
            unreadMessage: [
                "Hey it's me!",
                "Hi there!"
            ]
        }
    }
    render(){
        return this.state.unreadMessage.length > 0 && <div>
            <h3>
                You have {this.state.unreadMessage.length} unread message.
            </h3>
        </div>
    }
}

export default App
import React from 'react'
import data from './Data/Data'
import ShowList from './ShowList/ShowList'
import Alert from './Alert/Alert'

export default class Body extends React.Component{
  state = {
    Data: data,
    Name: "",
    editId: 0
  }
  handleChange = e => {
    const {name, value} = e.target
    this.setState({
      [name]: value
    })
  }
  handleSubmit = e => {
    e.preventDefault()
    const newData = this.state.Data
    const length = newData.length
    const textLength = this.state.Name.length
    if(textLength && textLength <= 25){
      let edit = 0
      for(let list of this.state.Data){
        if(!(list.id - this.state.editId) && list.edit){
          edit++
        }
      }
      if(edit){
        const editData = this.state.Data.map(data => {
          if(!(data.id - this.state.editId)){
            data.name = this.state.Name,
            data.edit = false
          }
          return data
        })
        this.setState({
          Data: editData,
          Name: ""
        })
      }else{
        newData.push({
          name: this.state.Name,
          id: length + 1,
          edit: false
        })
        this.setState({
          Data: newData,
          Name: ""
        })
      }
    }
  }
  handleDelete = id => {
    this.state.Data.splice(id - 1, 1)
    const newData = this.state.Data.map(data => {
      if(data.id > id){
        data.id--
      }
      return data
    })
    this.setState({
      Data: newData
    })
  }
  handleEdit = id => {
    const newData = this.state.Data.map(data => {
      if(id === data.id){
        data.edit = !data.edit
      }else{
        data.edit = false
      }
      return data
    })
    this.setState({
      Data: newData,
      Name: newData[id - 1].name,
      editId: id
    })
  }
  handleCancel = () => {
    const newData = this.state.Data.map(data => {
      if(data.edit){
        data.edit = false
      }
      return data
    })
    this.setState({
      Data: newData,
      Name: ""
    })
  }
  render(){
    const list = this.state.Data.map(data => <ShowList 
      key={data.id}
      data={data}
      handleDelete={this.handleDelete}
      handleEdit={this.handleEdit}
    />)
    let edit = 0
    for(let list of this.state.Data){
      if(list.edit){
        edit++
      }
    }
    const label = edit ? 'Edit' : 'Add'
    console.log(this.state.Data)
    return(
      <div>
        <div>
          <Alert length={this.state.Name.length}/>
        </div>
        <form onSubmit={this.handleSubmit}>
          <input 
            type="text"
            placeholder="Name"
            name="Name"
            value={this.state.Name}
            onChange={this.handleChange}
            className="input"
          />
          <button className="add">
            {label}
          </button>
        </form>
        <div>
          <button 
            onClick={this.handleCancel}
            className="cancel"
          >
            Cancel
          </button>
        </div>
        <div>
          {list}
        </div>
      </div>
    )
  }
}
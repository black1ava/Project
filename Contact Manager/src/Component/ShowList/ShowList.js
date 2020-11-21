import React from 'react'

export default function ShowList(props){
  return(
    <div>
      <p>
        {props.data.name}
        <button
          onClick={() => props.handleDelete(props.data.id)}
          className="delete"
        >
          Delete
        </button>
        <button 
          onClick={() => props.handleEdit(props.data.id)}
          className="edit"
        >
          Edit
        </button>
      </p>
    </div>
  )
}

import { useState } from "react"

export function NewTodoForm({ onSubmit }) {
    
    const [newItem, setNewItem] = useState("")
    function handleSubmit(event) {
        event.preventDefault()
        if (newItem === "") return
        
        onSubmit(newItem)
        setNewItem("")
    
      }
    return (
            <form onSubmit={handleSubmit} className='new-item-form'>
    <div className='form-row'>
      <label>New Iterm</label>
      <input value={newItem} onChange={event => setNewItem(event.target.value)} type='text' id='item'></input>
    </div>
    <button className='btn'>Add</button>
  </form>
    )

}
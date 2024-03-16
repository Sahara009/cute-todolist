import axios from 'axios'
import React, { useState } from 'react'


export default function Input({ onAdd }) {

    const [ inputValue, setInputValue ] = useState('')
   

    const addList = (e) => {
        e.preventDefault()
        if(!inputValue) {
            alert('вы ничего не ввели')
            return
        } else {
            // говорим что нужно добавить новую сущность
            // id будет генирировать сам json сервер
            axios.post('http://localhost:3003/lists', { name : inputValue }).then(({data})=> {
                console.log(data)
            })
        //    onAdd()
            // onAdd({
            //     "id": Math.random() ,
            //     "name": inputValue
            //    })
        }
       setInputValue('')
    }

return (
    <div className="card bg-light" >
        <div className="card-header">Add new task</div>
            <div className="card-body">
                <form id="form">
                    <div className="form-group">
                        <input
                         value={inputValue} 
                         onSubmit={addList}
                         onChange={e => setInputValue(e.target.value)}
                         type="text"
                         className="form-control" 
                         id="taskInput" 
                         placeholder="Text task" 
                         required />
                    </div>
                    <button onClick={addList} type="submit" className="btn btn-primary  btn-lg active">
                    <i className="bi bi-pin-angle-fill"></i>
                    </button>
                </form>
            </div>
    </div>
  )
}

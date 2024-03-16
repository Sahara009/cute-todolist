import React from 'react'
import { useState } from 'react'
import axios from 'axios'

export default function Task({ lists, TaskDone, onEditText }) {

    // удалили из бэкэнд (но не из стэйт)
    const RemoveList = item => {
        if(window.confirm('вы действительно хотите удалить?')) {
            axios.delete('http://localhost:3003/lists/' + item.id).then(()=> {
            })  
        }
    }
   
    const EditText = (item) => {
        const newTitle = window.prompt('новое название', item.name)
        if(!newTitle) {
            alert('вы ничего не ввели')
        } else {
            onEditText(item.id, newTitle)
            axios.patch('http://localhost:3003/lists/' + item.id, {
                name : newTitle
            }).catch(()=> {
                console.log('error')
            })
        }
    }

   

  return (
    <div className="card mb-4">
        <ul id="tasksList" className="list-group list-group-flush">
            {!lists.length && <h2 className='emptyListText'>Список задач пуст (´･ε･｀)</h2>}
            {lists.map((item, index)=> {
                return (
                    <li key={index} className="list-group-item d-flex justify-content-between task-item">
                        <input 
                        className='taskText' 
                        readOnly value={item.name} 
                        
                        />
                        <div className="task-item__buttons">
                        <button 
                        type="button" 
                        data-action="done" 
                        className={`btn-action ${item.selected ?  'selected' : ''}`}
                        
                        onClick={(e) => {
                        e.preventDefault();
                        TaskDone(item.id);
                        }}
                        >
                        <i className="bi bi-check-lg"></i>
                        </button>

                        <button type="button" data-action="delete" className="btn-action" 
                        onClick={() => RemoveList(item)}>
                        <i className="bi bi-trash3"></i>
                        </button>

                        <button 
                        type="button" 
                        data-action="edit" 
                        className="btn-action"
                        onClick={()=>{EditText(item)}}
                        >
                        <i className="bi bi-pen"></i>
                        </button>
                    </div>
            </li>
                )
            })}
        </ul>
        <div id="button-delete-completed" className="button-delete-completed">
            <button>on trash</button>
        </div>
    </div>
  )
}


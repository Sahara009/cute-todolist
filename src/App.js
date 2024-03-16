import React, { useState, useEffect } from 'react';
import './App.css';
import Input from './InputFolder/input';
import Task from './Task/Task';
import axios from 'axios';

function App() {
  const [lists, setLists] = useState(null)

   // когда компанент App отрендорился вызови 1 РАЗ axios
   useEffect(() => {
    axios.get('http://localhost:3003/lists').then(({ data }) => {
      setLists(data)
      })
  }, [lists])

  const onAddList = (obj) => { 
    const newList = [...lists, obj]
    setLists(newList)
  }

  const onEditTaskText = (id, text) => {
    console.log('тест')
  }
  
  const TaskDone = (id) => {
    const task = lists.find(task => task.id === id);

    console.log(task)
    // setLists(task);
  }
  
    
  
 

  return (
   <>
    <div className='wrapper'>
      <div className='container'>
      <div className="display-4 mb-2">ToDo</div>
      <div className="stroke"></div>
        <Input onAdd={onAddList}/>
        {lists && (
           <Task lists={lists}
                onEditText={onEditTaskText}
                TaskDone={TaskDone}
                
           />
        )}
      </div>
    </div>
   </>
  );
}

export default App;

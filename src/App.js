import React from 'react';
import { useState } from "react";
import './App.css';

function App() {
  const [tasks, setTasks] = useState([])
  const [taskText, setTaskText] = useState("")
  const [firstLoad, setFirstLoad] = useState(true)
  function getDataFromLocalStorage() {
    setFirstLoad(false)
    if(localStorage.getItem("tasksStoredData") === null){
      localStorage.setItem("tasksStoredData", JSON.stringify([]))
    }
    setTasks(JSON.parse(localStorage.getItem("tasksStoredData")))
  }
  if(firstLoad){
    getDataFromLocalStorage()
  }
  function handleInputChange(el) {
    setTaskText(el.target.value)
  }
  function addTask() {
    if(taskText.trim() === ""){
      return
    }
    let newUniqueId
    if(tasks.length > 0){
      newUniqueId = tasks[tasks.length-1].id + 1
    }else{
      newUniqueId = 0
    }
    let tempTasks = [...tasks]
    tempTasks.push({
      text: taskText, completed: false, id: newUniqueId
    })
    setTasks(tempTasks)
    setTaskText("")
    localStorage.setItem("tasksStoredData", JSON.stringify(tempTasks))
  }
  function completeTask(taskId) {
    for(let i=0; i<tasks.length; i++){
      if(tasks[i].id === taskId){
        let tempTasks = [...tasks]
        tempTasks[i].completed = !tempTasks[i].completed
        setTasks(tempTasks)
        localStorage.setItem("tasksStoredData", JSON.stringify(tempTasks))
      }
    }
  }
  function deleteTask(taskId) {
    for(let i=0; i<tasks.length; i++){
      if(tasks[i].id === taskId){
        let tempTasks = [...tasks]
        tempTasks.splice(i, 1)
        setTasks(tempTasks)
        localStorage.setItem("tasksStoredData", JSON.stringify(tempTasks))
      }
    }
  }
  return (
    <main>
      <div className="add-task">
        <input type="text" placeholder="Enter a new task here"
          onChange={(e) => handleInputChange(e)} value={taskText}
        />
        <button onClick={addTask}>Add</button>
      </div>
      <section className="tasks-container">
        {tasks.length > 0 ? tasks.map((task, index) => 
        <div key={index}>
          {task.completed ? 
          <div key={index} className="task completed">
            <div>
              <button onClick={() => completeTask(task.id)}></button>
              <span dir='auto'>{task.text}</span>
            </div>
            <button onClick={() => deleteTask(task.id)}>X</button>
          </div> : 
          <div key={index} className="task">
            <div>
              <button onClick={() => completeTask(task.id)}></button>
              <span dir='auto'>{task.text}</span>
            </div>
            <button onClick={() => deleteTask(task.id)}>X</button>
          </div>
          }
        </div>
        ) : null}
      </section>
    </main>
  );
}

export default App;

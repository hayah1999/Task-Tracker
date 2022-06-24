import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from "./components/Header";
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';
import Footer from "./components/Footer";
import About from "./components/About";
function App() {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([])
  //useEffect is used when wanting to put an effect or something to happen when the page load
  useEffect(() => {
    const getTasks = async() => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }
    getTasks()
  }, [])

  // fetch tasks from db.json
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()
    return data
  }

  // fetch a single task from db.json
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json()
    return data
  }

 // Add Task
  const addTask = async (task) => {
    const res = await fetch('http://localhost:5000/tasks', 
      {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(task)
      })
    const data = await res.json()
    // add the new task to the existing tasks
     setTasks([...tasks, data])
    // to create a random id as we are using ui not a db
    // const id = Math.floor(Math.random() * 10000) +1
    // to catch the data from form and add to it an id
    // const newTask = { id, ...task}
    // to update our state and add the new tasks
    // setTasks([...tasks, newTask])
  }

  //Delete a task
  const deleteTask =async (id) => {
  await fetch(`http://localhost:5000/tasks/${id}`, 
  {
    method: 'DELETE'
  })

  //to show only tasks that their id doesn't match the id of the delete function
   setTasks(tasks.filter((task) => task.id !== id))
  }
// toggle reminder
const toggleReminder = async (id) => {
 const taskToggle = await fetchTask(id)
 const updatedTask = {...taskToggle, reminder:!taskToggle.reminder}
 const res = await fetch(`http://localhost:5000/tasks/${id}`, 
 {
   method: 'PUT',
   headers: {
     'content-type': 'application/json'
   },
   body: JSON.stringify(updatedTask)
 })
 const data = await res.json()
 setTasks(tasks.map((task) => task.id === id ? {...task, reminder: data.reminder} : task))
  // if the reminder of that task is true change it to false or vise versa when double clicked
  //setTasks(tasks.map((task) => task.id === id ? {...task, reminder: !task.reminder} : task))
}


  return (
   <Router>
    <div className="container">
      <Header onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask}/>
      <Routes>
      <Route path='/' exact element={
        <>
         {showAddTask && <AddTask onAdd={addTask}/>}
         {tasks.length > 0 ? <Tasks  tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}/> : "No Tasks To Show"}
        </>
      } 
      />  
      <Route path='/about' element={<About />} />
      </Routes>
      <Footer />
     </div>
    </Router>
  );
}

export default App;

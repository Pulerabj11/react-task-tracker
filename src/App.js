/* Main App component.
   Rendered through ReactDOM in index.js

States: showAddTask
        tasks

Functions: useEffect
           fetchTasks
           fetchTask
           addTask
           deleteTask
           toggleReminder
*/

import Header from "./Components/Header"
import Tasks from "./Components/Tasks"
import AddTask from "./Components/AddTask"
import { useState, useEffect } from 'react' //Hooks.  useState to use states.  useEffect is used to create or deal with side effects (JSON server)
                                            //useEffect can be used to make something happen when the page loads


// App is used in index.js
const App = () => {

  //State to control the add button.  Task Input Form will be toggled with the Add button.
  //Add button is within the Header component
  const [showAddTask, setShowAddTask] = useState(false)

  //useState will preserve the state between rerenders
  //We call the state, 'tasks', and name a function to update the state, 'setTasks'.  Then call useState and input the default into the useState() parenthesis.
  //State is immutable.  Must use setTasks to change the state
  //Moved the tasks state into App so that it can be used globally.  Pass them into components as props.
  const [tasks, setTasks] = useState([])

  //Use fetchTasks() to get current list of tasks from server
  //set the state of tasks with setTasks
  useEffect(() => {
    //async because you're calling fetchTasks which returns a promise
    const getTasks = async () => {
      //use await because fetchTasks returns a promise
      const tasksFromServer = await fetchTasks()

      //Set the tasks state
      setTasks(tasksFromServer)
    }

    getTasks()
  }, []) //this is a dependency array.  If the value inside changes, useEffect will run agan

  //Fetch Tasks
  //An aysnc function allows use to write promises based code as if it were synchronous
  //Gets all tasks stored in our json data
  const fetchTasks = async () => {
    //fetch returns a promise, so use await to indicate res is waiting for the result
    const res = await fetch('http://localhost:3000/tasks')
    //Gives us the json data from res
    const data = await res.json()
    
    return data
  }

  //Fetch Task
  //Gets a task from the server based on the given id
  const fetchTask = async (id) => {
    //fetch returns a promise, so use await to indicate res is waiting for the result
    const res = await fetch(`http://localhost:3000/tasks/${id}`)
    //Gives us the json data from res
    const data = await res.json()
    
    return data
  }

  //Add Task
  //Uses fetch/POST to add a task to our json data
  const addTask = async (task) => {
    const res = await fetch('http://localhost:3000/tasks', {
      //POST is an addition to db.json
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(task) //Convert from javacsript object to json string
    })

    //new task we just created
    //.json() takes JSON as input and produces a JavaScript object
    const data = await res.json()

    //update the tasks state
    setTasks([...tasks, data])
  }

  //Delete Task
  //Uses fetch/DELETE to delete a task from our json data given an id
  const deleteTask = async (id) => {
    //fetch the id from local data and add a 2nd object as an argument specifying the method of the request is DELETE
    await fetch(`http://localhost:3000/tasks/${id}`, {
      method: 'DELETE'
    })

    //Filters our a task if the id matches the deleted id
    //Updates the tasks state
    setTasks(
      tasks.filter((task) => 
      task.id !== id)
    )
  }

  //Toggle Reminder
  //Uses fetch/PUT to update the toggle property of a task in our json data, given an id
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id)
    //updatedTask is an event, and has all the same properties as taskToToggle, but change reminder to the opposite.
    const updatedTask = {...taskToToggle, reminder: !taskToToggle.reminder}

    const res = await fetch(`http://localhost:3000/tasks/${id}`, {
      //PUT is an update
      method:'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updatedTask)
    })

    const data = await res.json()

    //For each task, if task.id === id, then spread across all task properties except reminder.  Reminder boolean is flipped.
    setTasks(
      tasks.map((task) => 
        task.id === id ?
        { ...task, reminder: data.reminder} : task)
      )
  }

  return (
    // This is JavaScript Syntax Extension (JSX)
    // This is html, but with some changes like different attribute names and using JavaScript expressions and variables
    <div className="container">
      {/* onAdd triggers when the add button is clicked and toggles the input for adding a new task.  It contains a function that passes a boolean to setShowAddTask.
      showAdd is a boolean to change the Add button text/color*/}
      <Header onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask}/>
      
      {/* if showAddTask is true, then show the AddTask component*/}
      {showAddTask && <AddTask onAdd={addTask}/>}   {/* && is a shorthand ternary if without the else*/}

      {/* Show tasks.  If there are no tasks, show message 'No Tasks To Show'*/}
      {tasks.length > 0 ? (
        <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}/>
        ) : (
        'No Tasks To Show'
      )}
    </div>
  );
}

export default App;

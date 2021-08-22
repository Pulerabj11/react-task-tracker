import Header from "./Components/Header"
import Tasks from "./Components/Tasks"
import AddTask from "./Components/AddTask"
import { useState } from 'react' //useState is a hook


// App is used in index.js
const App = () => {

  //State to control the add button.  Task Input Form will be toggled with the Add button.
  //Add button is within the Header component
  const [showAddTask, setShowAddTask] = useState(false)

  //useState will preserve the state between rerenders
  //We call the state, 'tasks', and name a function to update the state, 'setTasks'.  Then call useState and input the default into the useState() parenthesis.
  //State is immutable.  Must use setTasks to change the state
  //Moved the tasks state into App so that it can be used globally.  Pass them into components as props.
  const [tasks, setTasks] = useState([
    {
        id: 1,
        text: 'Doctors Appointment',
        day: 'Feb 5th at 2:30pm',
        reminder: true,
    },
    {
        id: 2,
        text: 'Meeting at School',
        day: 'Feb 6th at 1:30pm',
        reminder: true,
    },
    {
        id: 3,
        text: 'Food Shopping',
        day: 'Feb 5th at 2:30pm',
        reminder: false,
    }
  ])

  //Add Task
  const addTask = (task) => {
    //Calculate random id 1-10000 (inclusive)
    const id = Math.floor(Math.random() * 10000) + 1

    //Create new task from id and task object passed in
    const newTask = {id, ...task}

    //Update tasks state.  Copy current tasks and add newTask
    setTasks([...tasks, newTask])
  }

  //Delete Task
  const deleteTask = (id) => {
    //filter the setTasks array to update the state
    setTasks(tasks.filter((task) => task.id !== id))
  }

  //Toggle Reminder
  const toggleReminder = (id) => {
    //For each task, if task.id === id, then spread across all task properties except reminder.  Reminder boolean is flipped.
    setTasks(
      tasks.map((task) => 
        task.id === id ?
        { ...task, reminder: !task.reminder} : task)
      )
  }

  return (
    // This is JavaScript Syntax Extension (JSX)
    // This is html, but with some changes like different attribute names and using JavaScript expressions and variables
    <div className="container">
      {/* onAdd is a function that passes boolean to setShowAddTask.  !showAddTask acts as a toggle for the task input form.  showAdd is a boolean to change the Add button text/color*/}
      <Header onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask}/>
      {showAddTask && <AddTask onAdd={addTask}/>}   {/* && is a shorthand ternary if without the else*/}
      {tasks.length > 0 ? (
        <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}/>
        ) : (
        'No Tasks To Show'
      )}
    </div>
  );
}

export default App;

import Task from "./Task"

//Component consists of multiple Tasks.
//tasks prop is passed in.  tasks state is in App.js
const Tasks = ({ tasks, onDelete, onToggle }) => {
    return (
        <>
            {
            //Loop through tasks and output a Task component with the task passed in as a prop.
            }
            {tasks.map((task) => (
                <Task key={task.id} task={task} onDelete={onDelete} onToggle={onToggle}/>
            ))}
        </>
    )
}

export default Tasks

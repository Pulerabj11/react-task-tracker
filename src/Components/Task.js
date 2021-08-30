//Font Awesome from react icons.  Using this for our delete (x) icon.
import { FaTimes } from 'react-icons/fa' //installed from console with 'npm i react-icons'

//Task component populates Tasks component.
//onDelete calls deleteTask in App.js
const Task = ({ task, onDelete, onToggle }) => {
    return (
        //backticks used in className experession called a template literal
        //if task.reminder is true, then reminder is added to className
        <div className={`task ${task.reminder ? 'reminder' : ''}`} onDoubleClick={() => onToggle(task.id)}>
            <h3>
                {task.text}
                {/*FaTimes is a small x used for a delete button on each task*/}
                <FaTimes 
                    style={{color: 'red', cursor: 'pointer'}}
                    onClick={() => onDelete(task.id)}
                />
            </h3>
            <p>{task.day}</p>
        </div>
    )
}

export default Task

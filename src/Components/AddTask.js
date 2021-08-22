import { useState } from 'react'

const AddTask = ({onAdd}) => {
    const [text, setText] = useState('')
    const [day, setDay] = useState('')
    const [reminder, setReminder] = useState(false)

    const onSubmit = (e) => {
        //preventDefault prevents the browser from refreshing
        e.preventDefault()

        //Check if there is text added to the task input
        if (!text) {
            alert('Please add a task')
            return
        }

        //Call onAdd and pass in an object with text, day, and reminder
        onAdd({text, day, reminder})

        //Clear the form
        setText('')
        setDay('')
        setReminder('')
    }

    return (
        //Task Tracker Input Form
        <form className='add-form' onSubmit={onSubmit}>
            {/* Task input */}
            <div className='form-control'>
                <label>Task</label>
                <input 
                    type='text' 
                    placeholder='Add Task' 
                    value={text} 
                    onChange={(e) => setText(e.target.value)}
                />
            </div>

            {/* Day input */}
            <div className='form-control'>
                <label>Day & Time</label>
                <input
                    type='text' 
                    placeholder='Add Day & Time' 
                    value={day} 
                    onChange={(e) => setDay(e.target.value)}
                />
            </div>

            {/* Reminder Checkbox */}
            <div className='form-control form-control-check'>
                <label>Set Reminder</label>
                <input 
                    type='Checkbox'
                    checked={reminder}  //checked is true if reminder is true (default is false) (false is unchecked)
                    value={reminder} 
                    onChange={(e) => setReminder(e.currentTarget.checked)}
                />
            </div>

            {/*submit button*/}
            <input
                type='submit' 
                value='Save Task' 
                className='btn btn-block'
            />
        </form>
    )
}

export default AddTask

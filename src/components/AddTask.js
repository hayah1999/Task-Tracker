import { useState } from "react";
const AddTask = ({ onAdd }) => {
// default for text and day is empty string    
const [text, setText] = useState('')
const [day, setDay] = useState('')
// default is false for the reminder
const [reminder, setReminder] = useState(false)

const onSubmit = (e) => {
    e.preventDefault()

    if(!text){
        alert("Please add task")
        return
    }

    onAdd({ text, day, reminder})

    // to reset the form
    setText('')
    setDay('')
    setReminder(false)
}
  return (
    <form className="add-form" onSubmit={onSubmit}> 
      <div className="form-control">
        <label>Task</label>
        <input type="text" placeholder="Add Task"  value={text} onChange={(e) => setText(e.target.value)}/>
      </div>
      <div className="form-control">
        <label>Day & Time</label>
        <input type="text" placeholder="Add Day & Time" value={day} onChange={(e) => setDay(e.target.value)}/>
      </div>
      <div className="form-control form-control-check">
        <label>Set Reminder</label>
        <input type="checkbox" checked={reminder} value={reminder} onChange={(e) => setReminder(e.currentTarget.checked)}/>
      </div>
      <input type="submit" value="Save Task" className="btn btn-block"/>
    </form>
  );
};

export default AddTask;

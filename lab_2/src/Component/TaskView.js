import {useState} from "react";
import TaskForm from "./TaskForm";

const TaskView = props => {

    const [task, setTask] = useState(props.task);
    const [isEdit, setEdit] = useState(false)

    const save = content => {
        let tmp = Object.assign({}, task);
        tmp.content = content;
        setTask(tmp);
        setEdit(false);
    }

    if (isEdit) return <div className={'taskView'}>
        <TaskForm onSave={(content) => save(content)} onCancel={()=>setEdit(false)} task={task}/>
    </div>

    return <div className={'taskView'}>
        <div className={'flex-row'}>
            <input type={'checkbox'} defaultChecked={task.done} onChange={e => {
                let tmp = Object.assign({}, task);
                tmp.done = !tmp.done;
                setTask(tmp);
            }
            }/>
            <p>{task.content}</p>
        </div>
        <div className={'flex-row'}>
            <button onClick={() => props.onDelete()}>Delete</button>
            <button onClick={()=>setEdit(true)}>Edit</button>
        </div>
</div>
}

export default TaskView
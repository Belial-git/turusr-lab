import {useState} from "react";
import TaskForm from "./TaskForm";

const TaskView = props => {

    const [task, setTask] = useState(props.task);
    const [isEdit, setEdit] = useState(false)

    const save = content => {
        let body = {
            content: content,
        }

        fetch('http://localhost:8000/api/task' + task.id, {
            method: 'put', body: JSON.stringify(body),
        }).then(response => response.json()).then(remoteData => {
            setTask(remoteData.data);
            setEdit(false);
        }).catch(err => console.log('ERROR', err))
    }
    const handleCheck = () => {
        let body = {
            done: !task.done,
        }

        fetch('http://localhost:8000/api/task' + task.id, {
            method: 'put', body: JSON.stringify(body),
        }).then(response => response.json()).then(remoteData => {
            setTask(remoteData.data);
        }).catch(err => console.log('ERROR', err))
    }

    if (isEdit) return <div className={'taskView'}>
        <TaskForm onSave={(content) => save(content)} onCancel={() => setEdit(false)} task={task}/>
    </div>

    return <div className={'taskView'}>
        <div className={'flex-row'}>
            <input type={'checkbox'} defaultChecked={task.done} onChange={e => {
                handleCheck()
            }}/>
            <p>{task.content}</p>
        </div>
        <div className={'flex-row'}>
            <button onClick={() => props.onDelete()}>Delete</button>
            <button onClick={() => setEdit(true)}>Edit</button>
        </div>
    </div>
}

export default TaskView
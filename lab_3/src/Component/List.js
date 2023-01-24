import {useEffect, useState} from "react";
import TaskView from "./TaskView";
import TaskForm from "./TaskForm";
import {logDOM} from "@testing-library/react";

const ListComponent = props => {

    const [List, setList] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8000/api/task', {
            method: 'get',
        }).then(response => response.json()).then(remoteData => {
            setList(remoteData.data)
        }).catch(err=>console.log('ERROR',err))
    }, [])

    const handleDelete = (key) => {
        fetch('http://localhost:8000/api/task'+List[key].id, {
            method: 'delete',
        }).then(response => response.json()).then(remoteData => {
            let tmp = Array.from(List);
            tmp.splice(key, 1);
            setList(tmp);
        }).catch(err=>console.log('ERROR',err))
    }

    const save = (content) => {
        let fd=new FormData();
        fd.append('content',content);

        fetch('http://localhost:8000/api/task', {
            method: 'post',
            body: fd,
        }).then(response => response.json()).then(remoteData => {
            let tmp = Array.from(List);
            tmp.push(remoteData.data);
            setList(tmp);
        }).catch(err=>console.log('ERROR',err))
    }

    return <div className={'list'}>
        <TaskForm onSave={(content) => save(content)}/>
        {List.map((item, key) => {
            return <TaskView key={item.id} task={item} onDelete={() => handleDelete(key)}/>
        })}
    </div>
}

export default ListComponent
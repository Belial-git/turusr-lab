import {useEffect, useState} from "react";
import TaskView from "./TaskView";
import TaskForm from "./TaskForm";

const ListComponent = props =>{

    const [List,setList]=useState([]);

    useEffect(()=>{
        setList([
            {id:1 , content: 'Test 1', done: false},
            {id:2 , content: 'Test 2', done: false},
            {id:3 , content: 'Test 3', done: false},
            {id:4 , content: 'Test 4', done: true},
        ])
    },[])

    const handleDelete=(key)=>{
        let tmp =Array.from(List);
        tmp.splice(key,1);
        setList(tmp);
    }

    const save=(content)=>{
        let tmp =Array.from(List);
        tmp.push({
            id: List.length+1,
            content: content,
            done: false,
        });
        setList(tmp);
    }

    return <div className={'list'}>
        <TaskForm onSave={(content)=>save(content)}/>
        {List.map((item,key)=>{
            return <TaskView key={item.id} task={item} onDelete={()=>handleDelete(key)}/>
        })}
    </div>
}

export default ListComponent
import React,{ useEffect, useState} from 'react';
import {BsFillFileArrowUpFill} from 'react-icons/bs';
import {FallingLines} from 'react-loader-spinner';

const Render = () => {
    const [todos, setTodos] = useState(null);
    const [isLoading, setisLoading] = useState(false);
    const [showScroll, setShowScroll] = useState(false);

    useEffect(()=>{
        const handScroll = (e) => {
            if(e.target.documentElement.scrollTop>0){
                setShowScroll(true);
            } else {
                setShowScroll(false);
            }
        };
        window.addEventListener("scroll",handScroll);
    },[]);

    const fetchTodos = () => {
        setisLoading(true);
        setTimeout(async ()=>{
            const res = await fetch("https://jsonplaceholder.typicode.com/todos");
            const data = await res.json();

            setTodos(data);
            setisLoading(false);
        },4000);
    };

    const handScrollTop = ()=>{
        window.scrollTo({
            top:0,
            behavior: "smooth",
        });
    };




  return (
    <div className="listtodo">
        {todos ? 
        todos.map((d, index)=>
        <div key={index} className="item">
            <p>User: {d.userId}</p>
            <p>Do: {d.title}</p>
            <p>Complete: {d.completed?"Done":"Not done"}</p>
            </div>)
        :
        <button className="button" onClick={fetchTodos}>
            {isLoading?<FallingLines width={"50px"} color={"white"} />:"TodoList"}
        </button>}
        {showScroll && (
            <BsFillFileArrowUpFill className="upTop" onClick={handScrollTop}/>     
        )}
    </div>
  )
}

export default Render
import React,{useState} from 'react'
// react hooks 让函数式组件支持状态
export default function App() {
    const [name,setName]=useState('kerwin') // 初始值 [状态 ， 改变状态的方法]
    const [age,setAge]=useState(100)
    return (
        <div>
            App-{name}-{age}
            <button onClick={()=>{
                setName('乐乐')
                setAge(22)
            }}>改变</button>
        </div>
    )
}

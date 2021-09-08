import React, { useState, useRef } from 'react'

export default function Tolist() {
    const [text, setText] = useState("")
    const [list, setlst] = useState(["111", "222", "333"])
    const mytext = useRef(null)
    const click = (index) => {
       const newlst=[...list]
        newlst.splice(index,1)
        setlst(newlst)
    }
    return (
        <div>
            <input type="text" onChange={(evt) => {
                setText(evt.target.value)
            }} ref={mytext} value={text} />
            {text}
            <button onClick={() => {
                console.log(text);
                setlst([...list, mytext.current.value])
                setText('')
            }}>add</button>
            {
                list.map((el, index) => {
                    return <li key={el}>{el}
                        <button onClick={() => click(index)}>del</button>
                    </li>
                })
            }
        </div>
    )
  
}

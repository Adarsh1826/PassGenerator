import { useCallback, useEffect, useRef, useState } from 'react';
import './App.css';

function App() {
  const [length,setLength] = useState(8)
  const [character,setCharacter] = useState(false)
  const [password,setPassword] = useState("Test")
  const [number,setNumber] = useState(false)
  const passwordRef = useRef(null);

  const passgen = useCallback(()=>{
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvvwxyz"
    let num = "0123456789"
    let char = "!@#$%^&*"
    if(number) str+=num
    if(character) str+=char

    for(let i =1;i<=length;i++){
      let idx = Math.floor(Math.random()*str.length +1)
      pass+=str.charAt(idx)
    }
    setPassword(pass)
  },[length,character,password,setPassword])
  useEffect(()=>{
    passgen()
  },[length,number,character])
  const copyPass = useCallback(()=>{
    window.navigator.clipboard.writeText(password)
  },[password])
  return (
    <>
      <div className="main">
        <div className="in">
          <input
            type="text"
            value={password}
            placeholder="Password"
            readOnly
            ref={passwordRef}
          />
          <button
          onClick={copyPass}
          >Copy</button>
        </div>
        <div className="se">
          <input type="range" min={6} max={100} 
            onChange={(e)=>{setLength(e.target.value)}}
          />
          <label>Length: {length}</label>
          <div className="checkbox-group">
            <input type="checkbox" id="number" 
             onChange={()=>{
              setNumber((prev)=>!prev)
            }}
            />
            <label htmlFor="number">Number</label>
          </div>

          <div className="checkbox-group">
            <input type="checkbox" id="character" 
            onChange={()=>{
              setCharacter((prev)=>!prev)
            }}
            />
            <label htmlFor="character">Character</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

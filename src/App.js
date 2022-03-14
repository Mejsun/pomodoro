import React, { useState, useEffect } from "react";
import './App.css';

function App() {

  const [count, setCount] = useState(0);

  useEffect(() => {
   const timeout = setTimeout(() => {
      setCount(1);
    }, 3000);

   return () => clearTimeout(timeout);
  },[count]);


  return (
    <div className="App">
     
      <span id="timer-label">Session or Break</span>
      <span id="time-left">mm:ss</span>
      <button id="start_stop">start-stop</button>
      <button id="reset">reset</button>


      <h2 id="break-label">Break length</h2>
      <span id="break-length">5</span>
      <button id="break-decrement">-</button>
      <button id="break-increment">+</button>
      
      <h2 id="session-label">Session length</h2>
      <span id="session-length">25</span>
      <button id="session-decrement">-</button>
      <button id="session-increment">+</button>
      
    </div>
  );
}

export default App;

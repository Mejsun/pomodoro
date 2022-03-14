import React, { useState, useEffect } from "react";
import './App.css';

function App() {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [pause, setPause] = useState(false)

  const handleBrIncrement = ()=> {
    if(breakLength >= 0 && breakLength < 60){
    setBreakLength(breakLength+1)
    }
  }
  const handleBrDecrement = ()=> {
    if(breakLength >= 1 && breakLength < 60){
    setBreakLength(breakLength-1)
    }
  }
  const handleSeIncrement = ()=> {
    if(sessionLength >= 0 && sessionLength < 60){
      setSessionLength(sessionLength+1)
    }
  }
  const handleSeDecrement = () => {
    if(sessionLength >= 1 && sessionLength < 60){
    setSessionLength(sessionLength-1)
    }
  }
  const clearAll = () => {
    setBreakLength(5)
    setSessionLength(25)
  }

  const togglePause = () => {
    setPause(!pause)
  }
  useEffect(() => {
    let interval;
    if (pause) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds + 1);
      }, 1000);
    } else if (!pause && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [pause, seconds]);


  const timeLeft = ((sessionLength).toString().padStart(2, '0')+ ':'+ (seconds).toString().padStart(2, '0'))

  return (
    <div className="App">
     
      <span id="timer-label">Session or Break</span>
      <span id="time-left">{timeLeft}</span>
      <button id="start_stop" onClick={togglePause}>start-stop</button>
      <button id="reset" onClick={clearAll}>reset</button>


      <h2 id="break-label">Break length</h2>
      <span id="break-length">{breakLength}</span>
      <button id="break-decrement" onClick={handleBrDecrement}>-</button>
      <button id="break-increment" onClick={handleBrIncrement}>+</button>
      
      <h2 id="session-label">Session length</h2>
      <span id="session-length">{sessionLength}</span>
      <button id="session-decrement" onClick={handleSeDecrement}>-</button>
      <button id="session-increment" onClick={handleSeIncrement}>+</button>
      
    </div>
  );
}

export default App;

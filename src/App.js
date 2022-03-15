import React, { useState, useEffect, useRef } from "react";
import './App.css';

function App() {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(sessionLength);
  const [pause, setPause] = useState(true);
  const [type, setType] = useState("Session");
  const myAudio = useRef();

  const handleBeep = () => {
    myAudio.current.play();
  };

  const handleBrIncrement = () => {
    if (breakLength >= 0 && breakLength < 60) {
      setBreakLength(breakLength + 1);
      if (type === "Break") {
        setMinutes(breakLength + 1);
      }
    }
  };
  const handleBrDecrement = () => {
    if (breakLength > 1 && breakLength < 60) {
      setBreakLength(breakLength - 1);
      if (type === "Break") {
        setMinutes(breakLength - 1);
      }
    }
  };
  const handleSeIncrement = () => {
    if (sessionLength >= 0 && sessionLength < 60) {
      setSessionLength(sessionLength + 1);
      if (type === "Session") {
        setMinutes(sessionLength + 1);
      }
    }
  };
  const handleSeDecrement = () => {
    if (sessionLength > 1 && sessionLength < 60) {
      setSessionLength(sessionLength - 1);
      if (type === "Session") {
        setMinutes(sessionLength - 1);
      }
    }
  };
  const clearAll = () => {
    setBreakLength(5);
    setSessionLength(25);
    setSeconds(0);
    setMinutes(25);
    setType("Session");
    setPause(true);
    myAudio.current.pause();
    myAudio.current.currentTime = 0;
  };
  const togglePause = () => {
    setPause(!pause);
    handleBeep();
  };

  useEffect(() => {
    let interval;
    if (!pause) {
      interval = setTimeout(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        } else if (seconds === 0 && minutes !== 0) {
          setSeconds(60 - 1);
          if (type === "Session") {
            setMinutes(sessionLength => sessionLength  - 1);
            setType("Session");
          } else {
            setMinutes(breakLength => breakLength  - 1);
            setType("Break");
          }
        } else if (seconds === 0 && minutes === 0) {
          handleBeep();
          setSeconds(60 - 1);
          if (type === "Session") {
            setMinutes(breakLength);
            setType("Break");
          } else {
            setMinutes(sessionLength);
            setType("Session");
          }
        }
      }, 200);
    } else if (pause && setMinutes !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [breakLength, pause, seconds, sessionLength, type, minutes]);

  return (
    <div className="App">
      <span id="timer-label">{type}</span>
      <span id="time-left">{`${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`}</span>
      <button id="start_stop" onClick={togglePause}>start-stop</button>
      <button id="reset" onClick={clearAll}>reset</button>

      <audio id="beep" type="audio/mp3" preload="auto" ref={myAudio}
        src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
      />

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

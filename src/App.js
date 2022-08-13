import React from "react";
function App() {

  const STARTING_TIME = 15
  const [text, setText] = React.useState("")
  const [timeRemaining, setTimeRemaining] = React.useState(STARTING_TIME)
  const [started, setStarted]= React.useState(false)
  const [wordsCount, setWordsCount] = React.useState(0)
  const textBoxRef = React.useRef(null)
  function trackText(e) {
    
    console.log(e.target.value)
    setText(e.target.value)
  }
  function calculateWords(str) {
    return str.trim().split(" ").filter(word => word!=="").length
  }



 React.useEffect(() => {
    if(timeRemaining >0 && started){
      setTimeout(() => {
      setTimeRemaining(timeRemaining => timeRemaining-1)
      
    },1000)

    }else if(timeRemaining ===0){
      setStarted(false)
      setWordsCount(calculateWords(text))
      
      
    }
    
  },[timeRemaining,started])

  function start() {
    setStarted(true)
    setTimeRemaining(STARTING_TIME)
    setText("")
    textBoxRef.current.disabled = false
    textBoxRef.current.focus()
  }
  return (
    <div className="App">
     <h1 className="title">How fast do you type?</h1>
     <textarea 
        className="textarea"
        onChange={trackText}
        value={text}
        disabled={!started}
        ref={textBoxRef}/>
     <h4 className="time">Time remaining: {timeRemaining}</h4>
     <button className="btn" onClick={start} disabled={started}>Start</button>
     <h1 className="word--count">Word Count: {wordsCount}</h1>
    </div>
  );
}

export default App;

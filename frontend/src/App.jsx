import { useRef, useState } from "react";
import CodeSnippet from "./components/CodeSnippet";
import Editor from "@monaco-editor/react";
import "./App.css";
import useSnippet from "./hooks/useSnippet";
import Stats from "./components/Stats";
import useTimer from "./hooks/useTimer";
import { postScore } from "./api";
import Leaderboard from "./components/Leaderboard";

function App() {
  const { currentSnippet, loading, nextSnippet } = useSnippet();
  const [userInput, setUserInput] = useState("");
  const inputRef = useRef(null);

  const {
    elapsedTime,
    cpm,
    complete,
    startTime,
    reset,
    startTimer,
    stopTimer,
  } = useTimer(userInput);

  const handleEditorDidMount = (editor, monaco) => {
    inputRef.current = editor;
  };

  const handleInputChange = (value, event) => {
    if (value.length > 0 && !startTime) startTimer();
    else if (value === currentSnippet.text && !complete) {
      stopTimer();
      console.log("done");
      postScore(currentSnippet, elapsedTime, cpm);
    }
    setUserInput(value.replace(/\n/g, "\n"));
  };

  const handleReset = () => {
    reset();
    setUserInput("");
  };

  const newSnippet = () => {
    nextSnippet();
    handleReset();
  };

  return (
    <div className="App">
      <h1>Code Racer</h1>
      <Stats cpm={cpm} elapsedTime={elapsedTime} />
      {!loading && (
        <div className="code-snippet-container">
          <div className="code-item">
            <CodeSnippet snippet={currentSnippet} userInput={userInput} />
          </div>
          <div className="code-item">
            <Editor
              height="100%"
              language={currentSnippet.language}
              theme="vs-dark"
              onChange={handleInputChange}
              onMount={handleEditorDidMount}
              value={userInput}
              options={{
                selectOnLineNumbers: true,
                roundedSelection: false,
                readOnly: false,
                cursorStyle: "line",
                automaticLayout: true,
                wordWrap: "on",
                fontSize: 14,
              }}
            />
          </div>
        </div>
      )}
      <div className="btn-container">
        {complete && <button onClick={handleReset}>Try Again</button>}
        <button onClick={newSnippet}>New Snippet</button>
      </div>
      {!loading && currentSnippet && <Leaderboard snippet={currentSnippet} />}
    </div>
  );
}

export default App;

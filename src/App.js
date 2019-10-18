import React, { useState } from "react";
import "./App.css";

function App() {

  const [counter, setCounter] = useState(0);

  return (
    <div className="App" data-testid="component-app">
      <h1>TDD DEMO - CLICK COUNTER APP</h1>
    </div>
  );
}

export default App;

import "./App.css";

import { useState } from "react";

import reactLogo from "./assets/react.svg";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <div>
        <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
          <img alt="React logo" className="logo react" src={reactLogo} />
        </a>
      </div>
      <div className="card">
      </div>
    </div>
  );
}

export default App;
